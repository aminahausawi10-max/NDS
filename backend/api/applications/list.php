<?php
// ==========================================================================
// NDS - List User Applications (GET /api/applications/list.php)
// ==========================================================================
require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../config/jwt.php';

set_cors_headers();

$decoded = verify_request_token();
if (!$decoded) {
    json_response(['error' => 'Unauthorized'], 401);
}

try {
    $db = getDB();
    $stmt = $db->prepare('SELECT * FROM applications WHERE user_id = ? ORDER BY created_at DESC');
    $stmt->execute([$decoded['userId']]);
    $apps = $stmt->fetchAll();

    // Decode documents JSON for each app
    foreach ($apps as &$app) {
        $app['documents'] = json_decode($app['documents'] ?? '[]', true) ?? [];
    }

    json_response(['applications' => $apps]);

} catch (Exception $e) {
    json_response(['error' => 'Internal Server Error', 'details' => $e->getMessage()], 500);
}
