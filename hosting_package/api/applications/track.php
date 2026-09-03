<?php
// ==========================================================================
// NDS - Track Application (GET/POST /api/applications/track.php)
// ==========================================================================
require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../config/jwt.php';

set_cors_headers();

// Support both GET query string and POST body
$body            = get_json_body();
$referenceNumber = strtoupper(trim($_GET['ref'] ?? $body['referenceNumber'] ?? ''));
$emailOrPhone    = strtolower(trim($_GET['contact'] ?? $body['emailOrPhone'] ?? ''));

if (!$referenceNumber) {
    json_response(['error' => 'Reference number is required'], 400);
}

try {
    $db = getDB();

    $sql    = 'SELECT a.*, u.full_name, u.email, u.phone
               FROM applications a
               JOIN users u ON a.user_id = u.id
               WHERE a.reference_number = ?';
    $params = [$referenceNumber];

    if ($emailOrPhone) {
        $sql    .= ' AND (LOWER(u.email) = ? OR u.phone = ?)';
        $params[] = $emailOrPhone;
        $params[] = $emailOrPhone;
    }

    $stmt = $db->prepare($sql);
    $stmt->execute($params);
    $app  = $stmt->fetch();

    if (!$app) {
        json_response(['error' => 'Application not found. Please verify details.'], 404);
    }

    $app['documents'] = json_decode($app['documents'] ?? '[]', true) ?? [];

    // Fetch messages/chat logs
    $stmt = $db->prepare('SELECT * FROM messages WHERE application_id = ? ORDER BY created_at ASC');
    $stmt->execute([$app['id']]);
    $messages = $stmt->fetchAll();

    json_response([
        'application' => [
            'referenceNumber' => $app['reference_number'],
            'serviceRequired' => $app['service_required'],
            'status'          => $app['status'],
            'createdAt'       => $app['created_at'],
            'description'     => $app['description'],
            'notes'           => $app['notes'],
            'documents'       => $app['documents']
        ],
        'messages' => $messages
    ]);

} catch (Exception $e) {
    json_response(['error' => 'Internal Server Error', 'details' => $e->getMessage()], 500);
}
