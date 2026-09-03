<?php
// ==========================================================================
// NDS - Admin Dashboard (GET /api/admin/dashboard.php)
// ==========================================================================
require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../config/jwt.php';

set_cors_headers();

$decoded = verify_request_token(true); // require admin
if (!$decoded) {
    json_response(['error' => 'Forbidden. Admin access required.'], 403);
}

try {
    $db = getDB();

    // All applications with user info
    $stmt = $db->query('
        SELECT a.*, u.full_name, u.email, u.phone
        FROM applications a
        JOIN users u ON a.user_id = u.id
        ORDER BY a.created_at DESC
    ');
    $apps = $stmt->fetchAll();
    foreach ($apps as &$app) {
        $app['documents'] = json_decode($app['documents'] ?? '[]', true) ?? [];
    }

    // Stats
    $stmt = $db->query("
        SELECT
            COUNT(*) AS total,
            SUM(status = 'Application Received') AS new_apps,
            SUM(status = 'Processing') AS processing,
            SUM(status = 'Completed') AS completed,
            SUM(status = 'Documents Required') AS action_needed
        FROM applications
    ");
    $stats = $stmt->fetch();

    $stmt = $db->query("SELECT COUNT(*) AS total_users FROM users WHERE is_admin = 0");
    $users = $stmt->fetch();

    json_response([
        'applications' => $apps,
        'stats' => [
            'total'       => (int)$stats['total'],
            'new'         => (int)$stats['new_apps'],
            'processing'  => (int)$stats['processing'],
            'completed'   => (int)$stats['completed'],
            'actionNeeded'=> (int)$stats['action_needed'],
            'usersCount'  => (int)$users['total_users']
        ]
    ]);

} catch (Exception $e) {
    json_response(['error' => 'Internal Server Error', 'details' => $e->getMessage()], 500);
}
