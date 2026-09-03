<?php
// ==========================================================================
// NDS - Database Configuration (MySQL via PDO for cPanel)
// ==========================================================================

define('DB_HOST', 'localhost');
define('DB_NAME', 'your_db_name');    // Replace with your cPanel DB name
define('DB_USER', 'your_db_user');    // Replace with your cPanel DB username
define('DB_PASS', 'your_db_password');// Replace with your cPanel DB password
define('DB_CHARSET', 'utf8mb4');

define('JWT_SECRET', 'nds-secret-key-2026'); // Change to a long random string

define('CLOUDINARY_CLOUD_NAME', 'dpghoiocq');
define('CLOUDINARY_API_KEY', '283943216837512');
define('CLOUDINARY_API_SECRET', 'y_c8wSat2wFRqfuIjFuAwkA1aKE');

function getDB() {
    static $pdo = null;
    if ($pdo === null) {
        $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;
        $options = [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ];
        try {
            $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]);
            exit;
        }
    }
    return $pdo;
}
