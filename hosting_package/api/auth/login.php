<?php
// ==========================================================================
// NDS - Login Endpoint (POST /api/auth/login.php)
// ==========================================================================
require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../config/jwt.php';

set_cors_headers();
require_method('POST');

$body = get_json_body();
$email    = trim(strtolower($body['email'] ?? ''));
$password = $body['password'] ?? '';

if (!$email || !$password) {
    json_response(['error' => 'Email and password are required'], 400);
}

try {
    $db  = getDB();
    $stmt = $db->prepare('SELECT * FROM users WHERE email = ? LIMIT 1');
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    if (!$user || !password_verify($password, $user['password'])) {
        json_response(['error' => 'Invalid email or password'], 401);
    }

    $token = jwt_create($user['id'], $user['email'], $user['is_admin'], JWT_SECRET);

    json_response([
        'message' => 'Login successful',
        'token'   => $token,
        'user'    => [
            'id'       => $user['id'],
            'fullName' => $user['full_name'],
            'email'    => $user['email'],
            'isAdmin'  => (bool)$user['is_admin']
        ]
    ]);

} catch (Exception $e) {
    json_response(['error' => 'Internal Server Error', 'details' => $e->getMessage()], 500);
}
