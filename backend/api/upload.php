<?php
// ==========================================================================
// NDS - File Upload to Cloudinary (POST /api/upload.php)
// ==========================================================================
require_once __DIR__ . '/config/cors.php';
require_once __DIR__ . '/config/db.php';
require_once __DIR__ . '/config/jwt.php';

set_cors_headers();
require_method('POST');

$decoded = verify_request_token();
if (!$decoded) {
    json_response(['error' => 'Unauthorized'], 401);
}

$body     = get_json_body();
$fileData = $body['fileData'] ?? '';
$fileName = $body['fileName'] ?? 'doc_' . time();

if (!$fileData) {
    json_response(['error' => 'No file data provided'], 400);
}

// Upload to Cloudinary via REST API
$publicId = preg_replace('/\.[^.]+$/', '', $fileName) . '_' . time();

$postFields = [
    'file'        => $fileData,
    'folder'      => 'nds_documents',
    'public_id'   => $publicId,
    'timestamp'   => time(),
    'api_key'     => CLOUDINARY_API_KEY,
];

// Generate Cloudinary signature
ksort($postFields);
$signStr  = http_build_query(array_filter($postFields, fn($k) => !in_array($k, ['file','api_key']), ARRAY_FILTER_USE_KEY));
$signature = sha1($signStr . CLOUDINARY_API_SECRET);
$postFields['signature'] = $signature;

$ch = curl_init();
curl_setopt_array($ch, [
    CURLOPT_URL            => 'https://api.cloudinary.com/v1_1/' . CLOUDINARY_CLOUD_NAME . '/auto/upload',
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => $postFields,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT        => 60,
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode !== 200) {
    json_response(['error' => 'Upload failed', 'details' => $response], 500);
}

$result = json_decode($response, true);
json_response([
    'message' => 'File uploaded successfully',
    'url'     => $result['secure_url'] ?? ''
]);
