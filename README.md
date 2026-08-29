# Nigeria Diaspora Services (NDS) - Web Platform

A premium, glassmorphism-themed Single Page Application (SPA) designed to help Nigerians in the diaspora apply for and track document processing assistance (Passports, NIN, BVN, CAC, MOFA, etc.) in Nigeria.

The project is designed to be hosted on **Vercel** with a serverless backend connecting to a **Neon PostgreSQL** database and **Cloudinary** for secure document storage.

---

## Features
- **Glassmorphism Design:** Beautiful visual layout utilizing frosted glass containers and smooth background gradient shifts.
- **Sticky Compass Navigation:** A sticky round navigation action button that floats on scroll to easily guide the user.
- **Password Eye Reveal:** Modern, custom security toggles to show/hide input passwords.
- **Multi-Language Engine:** Instant localization support for **English**, **Hausa**, **Arabic (RTL)**, and **Français**.
- **Application Portal & Tracking:** Customers can upload files (PDFs, pictures), generate an ID (like `NDS-2026-XXXXXX`), check live statuses, and communicate in real-time with the support team.
- **Admin Dashboard:** Full admin management console to inspect customer requests, download verification scans, change application statuses, append internal notes, and send messages to profiles.

---

## Setup & Deployment Instructions

### 1. Database Setup (Neon PostgreSQL)
1. Register a free PostgreSQL instance at [Neon.tech](https://neon.tech/).
2. Open the console, navigate to SQL Editor, paste the contents of [schema.sql](file:///c:/Users/Ameeynerh/Desktop/NDS/schema.sql) and run the queries. This will set up the tables and seed a default admin account.

### 2. Media Hosting (Cloudinary)
1. Sign up for a free account at [Cloudinary.com](https://cloudinary.com/).
2. Obtain your Cloud Name, API Key, and API Secret.

### 3. Local Configuration
Create a `.env` file in the root folder:
```env
DATABASE_URL="your-neon-postgres-connection-string?sslmode=require"
CLOUDINARY_CLOUD_NAME="your-cloudinary-cloud-name"
CLOUDINARY_API_KEY="your-cloudinary-api-key"
CLOUDINARY_API_SECRET="your-cloudinary-api-secret"
JWT_SECRET="nds-secret-key-2026"
```

### 4. Deploy to Vercel
To push this code to Vercel:
1. Make sure you have a GitHub repository created and the files pushed.
2. Go to Vercel Dashboard, import the repository.
3. Under **Environment Variables**, add:
   - `DATABASE_URL`
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`
   - `JWT_SECRET`
4. Deploy the project. Vercel will automatically host the static files in the root folder and configure the Serverless Functions inside the `/api` directory.

---

## Default Administrative Account
- **Username / Email:** `admin@nds.com`
- **Password:** `password123`
