<?php
// ==========================================================================
// NDS - JWT Helper (Pure PHP, no Composer needed)
// ==========================================================================

function base64url_encode($data) {
    return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
}

function base64url_decode($data) {
    return base64_decode(strtr($data, '-_', '+/') . str_repeat('=', 3 - (3 + strlen($data)) % 4));
}

function jwt_sign($payload, $secret) {
    $header  = base64url_encode(json_encode(['alg' => 'HS256', 'typ' => 'JWT']));
    $payload = base64url_encode(json_encode($payload));
    $sig     = base64url_encode(hash_hmac('sha256', "$header.$payload", $secret, true));
    return "$header.$payload.$sig";
}

function jwt_verify($token, $secret) {
    $parts = explode('.', $token);
    if (count($parts) !== 3) return null;
    [$header, $payload, $sig] = $parts;
    $expected = base64url_encode(hash_hmac('sha256', "$header.$payload", $secret, true));
    if (!hash_equals($expected, $sig)) return null;
    $data = json_decode(base64url_decode($payload), true);
    if (!$data) return null;
    if (isset($data['exp']) && $data['exp'] < time()) return null; // expired
    return $data;
}

function jwt_create($userId, $email, $isAdmin, $secret) {
    return jwt_sign([
        'userId'  => $userId,
        'email'   => $email,
        'isAdmin' => (bool)$isAdmin,
        'iat'     => time(),
        'exp'     => time() + (7 * 24 * 3600) // 7 days
    ], $secret);
}

function get_auth_token() {
    $headers = getallheaders();
    $auth = $headers['Authorization'] ?? $headers['authorization'] ?? '';
    if (str_starts_with($auth, 'Bearer ')) {
        return substr($auth, 7);
    }
    return null;
}

function verify_request_token($require_admin = false) {
    $token = get_auth_token();
    if (!$token) return null;
    $decoded = jwt_verify($token, JWT_SECRET);
    if (!$decoded) return null;
    if ($require_admin && empty($decoded['isAdmin'])) return null;
    return $decoded;
}
