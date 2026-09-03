<?php
// ==========================================================================
// NDS - Send Customer Message (POST /api/applications/message.php)
// ==========================================================================
require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../config/jwt.php';

set_cors_headers();
require_method('POST');

$decoded = verify_request_token();
if (!$decoded) {
    json_response(['error' => 'Unauthorized'], 401);
}

$body          = get_json_body();
$applicationId = intval($body['applicationId'] ?? 0);
$messageText   = trim($body['messageText'] ?? '');

if (!$applicationId || !$messageText) {
    json_response(['error' => 'Application ID and message text are required'], 400);
}

try {
    $db = getDB();

    // Verify application belongs to logged-in user
    $stmt = $db->prepare('SELECT id FROM applications WHERE id = ? AND user_id = ?');
    $stmt->execute([$applicationId, $decoded['userId']]);
    if (!$stmt->fetch()) {
        json_response(['error' => 'Forbidden. You do not own this application.'], 403);
    }

    // Insert message
    $stmt = $db->prepare('INSERT INTO messages (application_id, sender, message) VALUES (?, ?, ?)');
    $stmt->execute([$applicationId, 'customer', $messageText]);

    // Return all messages for this application
    $stmt = $db->prepare('SELECT * FROM messages WHERE application_id = ? ORDER BY created_at ASC');
    $stmt->execute([$applicationId]);
    $messages = $stmt->fetchAll();

    json_response(['message' => 'Message sent successfully', 'messages' => $messages], 201);

} catch (Exception $e) {
    json_response(['error' => 'Internal Server Error', 'details' => $e->getMessage()], 500);
}
