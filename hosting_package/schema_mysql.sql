-- ==========================================================================
-- NDS - MySQL Database Schema for cPanel Hosting
-- Run this in phpMyAdmin or cPanel MySQL console
-- ==========================================================================

CREATE TABLE IF NOT EXISTS `users` (
    `id`           INT AUTO_INCREMENT PRIMARY KEY,
    `full_name`    VARCHAR(100) NOT NULL,
    `email`        VARCHAR(100) UNIQUE NOT NULL,
    `phone`        VARCHAR(30)  NOT NULL,
    `country`      VARCHAR(100) NOT NULL,
    `state_origin` VARCHAR(100) DEFAULT NULL,
    `password`     VARCHAR(255) NOT NULL,
    `is_admin`     TINYINT(1)   NOT NULL DEFAULT 0,
    `created_at`   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `applications` (
    `id`               INT AUTO_INCREMENT PRIMARY KEY,
    `reference_number` VARCHAR(30)  UNIQUE NOT NULL,
    `user_id`          INT          NOT NULL,
    `service_required` VARCHAR(100) NOT NULL,
    `description`      TEXT         DEFAULT NULL,
    `contact_method`   VARCHAR(50)  DEFAULT 'Email',
    `documents`        JSON         DEFAULT NULL,
    `status`           VARCHAR(50)  NOT NULL DEFAULT 'Application Received',
    `notes`            TEXT         DEFAULT NULL,
    `created_at`       DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `messages` (
    `id`             INT AUTO_INCREMENT PRIMARY KEY,
    `application_id` INT          NOT NULL,
    `sender`         VARCHAR(50)  NOT NULL,
    `message`        TEXT         NOT NULL,
    `created_at`     DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`application_id`) REFERENCES `applications`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ==========================================================================
-- Default Admin User
-- Email: admin@nds.com | Password: password123
-- Password hash generated with PHP password_hash($pass, PASSWORD_BCRYPT, ['cost'=>10])
-- ==========================================================================
INSERT IGNORE INTO `users` (`full_name`, `email`, `phone`, `country`, `state_origin`, `password`, `is_admin`)
VALUES (
    'NDS Admin',
    'admin@nds.com',
    '+2348057300300',
    'Nigeria',
    'Abuja',
    '$2y$10$hkrmryU/kGdT9tHLO5HoLevyYTz4P1qzMiE6bBVHHzHt7R7O68R.e',
    1
);
