-- Database Schema for Nigeria Diaspora Services (NDS)
-- Connect to Neon Console and run the following queries:

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(30) NOT NULL,
    country VARCHAR(100) NOT NULL,
    state_origin VARCHAR(100),
    password VARCHAR(255) NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS applications (
    id SERIAL PRIMARY KEY,
    reference_number VARCHAR(30) UNIQUE NOT NULL,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    service_required VARCHAR(100) NOT NULL,
    description TEXT,
    contact_method VARCHAR(50),
    documents TEXT[], -- Array of Cloudinary file URLs
    status VARCHAR(50) DEFAULT 'Application Received', -- Application Received, Under Review, Documents Required, Processing, Completed, Closed
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    application_id INTEGER REFERENCES applications(id) ON DELETE CASCADE,
    sender VARCHAR(50) NOT NULL, -- 'admin' or 'customer'
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Seed an Admin User
-- Password: password123 (hashed: $2a$10$7/h6QFoojL5zZ.4I92kXfuxvcQNhJZk/znEOxCtIdb..3rxloHv9G)
-- Let's insert a default administrator record
INSERT INTO users (full_name, email, phone, country, state_origin, password, is_admin)
VALUES ('NDS Admin', 'admin@nds.com', '+2348057300300', 'Nigeria', 'Abuja', '$2a$10$7/h6QFoojL5zZ.4I92kXfuxvcQNhJZk/znEOxCtIdb..3rxloHv9G', TRUE)
ON CONFLICT (email) DO NOTHING;
