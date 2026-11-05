<?php
// ==========================================================================
// NDS - Create Application (POST /api/applications/create.php)
// ==========================================================================
require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../config/jwt.php';

set_cors_headers();
require_method('POST');

$decoded = verify_request_token();
$userId  = $decoded ? $userId : null;

$body          = get_json_body();
$fullName      = trim($body['fullName'] ?? 'Diaspora Applicant');
$email         = trim($body['email'] ?? '');
$phone         = trim($body['phone'] ?? '+966566029046');
$serviceRequired = trim($body['serviceRequired'] ?? '');
$description   = trim($body['description'] ?? '');
$contactMethod = trim($body['contactMethod'] ?? 'WhatsApp');
$documents     = json_encode($body['documents'] ?? []);

if (!$userId) {
    $guestEmail = !empty($email) ? strtolower($email) : ('guest_' . time() . '@nds.org');
    $db = getDB();
    $stmt = $db->prepare('SELECT id FROM users WHERE email = ? OR phone = ? LIMIT 1');
    $stmt->execute([$guestEmail, $phone]);
    $existing = $stmt->fetch();
    if ($existing) {
        $userId = $existing['id'];
    } else {
        $stmt = $db->prepare('INSERT INTO users (full_name, email, phone, country, state_origin, password, is_admin) VALUES (?, ?, ?, ?, ?, ?, 0)');
        $stmt->execute([$fullName, $guestEmail, $phone, 'Diaspora', 'Nigeria', 'guest_free']);
        $userId = $db->lastInsertId();
    }
}

if (!$serviceRequired) {
    json_response(['error' => 'Service required is missing'], 400);
}

try {
    $db = getDB();

    // Generate unique reference number
    $referenceNumber = '';
    do {
        $randNum = rand(100000, 999999);
        $referenceNumber = "NDS-2026-$randNum";
        $stmt = $db->prepare('SELECT id FROM applications WHERE reference_number = ?');
        $stmt->execute([$referenceNumber]);
    } while ($stmt->fetch());

    // Insert application
    $stmt = $db->prepare(
        'INSERT INTO applications (reference_number, user_id, service_required, description, contact_method, documents, status)
         VALUES (?, ?, ?, ?, ?, ?, ?)'
    );
    $stmt->execute([
        $referenceNumber,
        $userId,
        $serviceRequired,
        $description,
        $contactMethod,
        $documents,
        'Application Received'
    ]);
    $appId = $db->lastInsertId();

    // Fetch the inserted row
    $stmt = $db->prepare('SELECT * FROM applications WHERE id = ?');
    $stmt->execute([$appId]);
    $app = $stmt->fetch();
    $app['documents'] = json_decode($app['documents'], true) ?? [];

    json_response([
        'message'     => 'Application submitted successfully',
        'application' => $app
    ], 201);

} catch (Exception $e) {
    json_response(['error' => 'Internal Server Error', 'details' => $e->getMessage()], 500);
}
