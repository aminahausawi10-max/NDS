# NDS PHP Backend - cPanel Deployment Guide

## Step 1: Create MySQL Database on cPanel
1. Log into cPanel → MySQL Databases
2. Create new database e.g. `ndsdeploy_db`
3. Create new user e.g. `ndsdeploy_user` with a strong password
4. Add user to database with ALL PRIVILEGES
5. Open phpMyAdmin, select your database, go to SQL tab
6. Paste and run the contents of `schema_mysql.sql`

## Step 2: Configure Database Credentials
Open `backend/api/config/db.php` and update:
```php
define("DB_NAME", "ndsdeploy_db");   // Your cPanel database name
define("DB_USER", "ndsdeploy_user"); // Your cPanel database username
define("DB_PASS", "your_password");  // Your database password
define("JWT_SECRET", "change-this-to-a-random-string-123!");
```

## Step 3: Upload Files to cPanel
Upload the following to your `public_html/` folder:
- `backend/api/`          → `public_html/api/`
- `backend/.htaccess`     → `public_html/.htaccess`
- `public/`               → `public_html/public/`
- `backend/schema_mysql.sql` (just for reference, already run in Step 1)

## Step 4: Update Frontend API URL
In `public/app.js` line ~5, update:
```js
const PHP_API_BASE = 'https://yourdomain.com'; // Your cPanel domain
```

## Step 5: Test Endpoints
Visit these URLs in your browser to test:
- `https://yourdomain.com/api/auth/login.php` → should return 405 (GET not allowed)
- `https://yourdomain.com/api/applications/track.php?ref=NDS-2026-123456`

## Admin Login
- Email: admin@nds.com
- Password: password123

## PHP Requirements (all standard on cPanel)
- PHP 8.0+
- PDO extension (mysql)
- cURL extension (for Cloudinary uploads)
- JSON extension
