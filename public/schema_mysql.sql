-- MySQL/MariaDB Schema for Nigeria Diaspora Services (NDS)
-- Import this file into phpMyAdmin for database nigeri19_diaspora

-- 1. Create Users Table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(30) NOT NULL,
    country VARCHAR(100) NOT NULL,
    state_origin VARCHAR(100),
    password VARCHAR(255) NOT NULL,
    is_admin TINYINT(1) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Create Applications Table
CREATE TABLE IF NOT EXISTS applications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    reference_number VARCHAR(30) UNIQUE NOT NULL,
    user_id INT,
    service_required VARCHAR(100) NOT NULL,
    description TEXT,
    contact_method VARCHAR(50),
    documents TEXT,
    status VARCHAR(50) DEFAULT 'Application Received',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 3. Create Messages Table
CREATE TABLE IF NOT EXISTS messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    application_id INT,
    sender VARCHAR(50) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE CASCADE
);

-- 4. Create Default Admin User Account (Email: admin@nds.com | Password: password123)
INSERT INTO users (full_name, email, phone, country, state_origin, password, is_admin)
VALUES ('NDS Admin', 'admin@nds.com', '+2348057300300', 'Nigeria', 'Abuja', '$2a$10$7/h6QFoojL5zZ.4I92kXfuxvcQNhJZk/znEOxCtIdb..3rxloHv9G', 1)
ON DUPLICATE KEY UPDATE full_name=full_name;
