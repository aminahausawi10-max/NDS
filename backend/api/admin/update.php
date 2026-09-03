<?php
// ==========================================================================
// NDS - Admin Update Application (POST /api/admin/update.php)
// ==========================================================================
require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../config/jwt.php';

set_cors_headers();
require_method('POST');

$decoded = verify_request_token(true);
if (!$decoded) {
    json_response(['error' => 'Forbidden. Admin access required.'], 403);
}

$body          = get_json_body();
$applicationId = intval($body['applicationId'] ?? 0);
$status        = trim($body['status'] ?? '');
$notes         = $body['notes'] ?? null;
$messageText   = trim($body['messageText'] ?? '');

if (!$applicationId) {
    json_response(['error' => 'Application ID is required'], 400);
}

try {
    $db = getDB();

    // Build dynamic update
    $fields = [];
    $params = [];

    if ($status) {
        $fields[] = 'status = ?';
        $params[]  = $status;
    }
    if ($notes !== null) {
        $fields[] = 'notes = ?';
        $params[]  = $notes;
    }

    if (!empty($fields)) {
        $params[] = $applicationId;
        $sql = 'UPDATE applications SET ' . implode(', ', $fields) . ' WHERE id = ?';
        $db->prepare($sql)->execute($params);
    }

    // Insert admin message if provided
    if ($messageText) {
        $db->prepare('INSERT INTO messages (application_id, sender, message) VALUES (?, ?, ?)')
           ->execute([$applicationId, 'admin', $messageText]);
    }

    // Return updated application + messages
    $stmt = $db->prepare('SELECT * FROM applications WHERE id = ?');
    $stmt->execute([$applicationId]);
    $app = $stmt->fetch();
    $app['documents'] = json_decode($app['documents'] ?? '[]', true) ?? [];

    $stmt = $db->prepare('SELECT * FROM messages WHERE application_id = ? ORDER BY created_at ASC');
    $stmt->execute([$applicationId]);
    $messages = $stmt->fetchAll();

    json_response([
        'message'     => 'Application updated successfully',
        'application' => $app,
        'messages'    => $messages
    ]);

} catch (Exception $e) {
    json_response(['error' => 'Internal Server Error', 'details' => $e->getMessage()], 500);
}
