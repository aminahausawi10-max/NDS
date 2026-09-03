<?php
// ==========================================================================
// NDS - CORS & JSON Response Helpers
// ==========================================================================

// List of allowed origins (Vercel frontend + your cPanel domain)
$allowed_origins = [
    'https://nds-gules.vercel.app',       // Vercel production
    'https://www.nds-gules.vercel.app',    // Vercel www
    // Add your cPanel domain below when you get it, e.g.:
    // 'https://yourdomain.com',
    // 'https://www.yourdomain.com',
];

function set_cors_headers() {
    global $allowed_origins;

    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';

    if (in_array($origin, $allowed_origins)) {
        header("Access-Control-Allow-Origin: $origin");
    } else {
        // Allow all during development — restrict after testing
        header('Access-Control-Allow-Origin: *');
    }

    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    header('Content-Type: application/json; charset=utf-8');

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit;
    }
}

function json_response($data, $code = 200) {
    http_response_code($code);
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

function get_json_body() {
    $raw = file_get_contents('php://input');
    return json_decode($raw, true) ?? [];
}

function require_method($method) {
    if ($_SERVER['REQUEST_METHOD'] !== strtoupper($method)) {
        json_response(['error' => 'Method not allowed'], 405);
    }
}

