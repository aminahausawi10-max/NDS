<?php
// ==========================================================================
// NDS - Register Endpoint (POST /api/auth/register.php)
// ==========================================================================
require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../config/jwt.php';

set_cors_headers();
require_method('POST');

$body        = get_json_body();
$fullName    = trim($body['fullName'] ?? '');
$email       = trim(strtolower($body['email'] ?? ''));
$phone       = trim($body['phone'] ?? '');
$country     = trim($body['country'] ?? '');
$stateOrigin = trim($body['stateOrigin'] ?? '');
$password    = $body['password'] ?? '';

if (!$fullName || !$email || !$phone || !$country || !$password) {
    json_response(['error' => 'All fields except state of origin are required'], 400);
}

try {
    $db = getDB();

    // Check if email already registered
    $stmt = $db->prepare('SELECT id FROM users WHERE email = ? LIMIT 1');
    $stmt->execute([$email]);
    if ($stmt->fetch()) {
        json_response(['error' => 'Email is already registered'], 400);
    }

    // Hash password using PHP native bcrypt
    $hashedPassword = password_hash($password, PASSWORD_BCRYPT, ['cost' => 10]);

    // Insert new user
    $stmt = $db->prepare(
        'INSERT INTO users (full_name, email, phone, country, state_origin, password, is_admin)
         VALUES (?, ?, ?, ?, ?, ?, 0)'
    );
    $stmt->execute([$fullName, $email, $phone, $country, $stateOrigin, $hashedPassword]);
    $userId = $db->lastInsertId();

    $token = jwt_create($userId, $email, false, JWT_SECRET);

    json_response([
        'message' => 'Registration successful',
        'token'   => $token,
        'user'    => [
            'id'       => $userId,
            'fullName' => $fullName,
            'email'    => $email,
            'isAdmin'  => false
        ]
    ], 201);

} catch (Exception $e) {
    json_response(['error' => 'Internal Server Error', 'details' => $e->getMessage()], 500);
}
