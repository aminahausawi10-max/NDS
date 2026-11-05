const db = require('../db');
const { verifyToken } = require('../middleware');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Token is optional: sign-in is not required for free applications
  let userId = null;
  const decoded = verifyToken(req);
  if (decoded && decoded.userId) {
    userId = decoded.userId;
  }

  try {
    const { fullName, email, phone, serviceRequired, description, contactMethod, documents } = req.body;

    if (!serviceRequired) {
      return res.status(400).json({ error: 'Service required is missing' });
    }

    // If no userId from auth token, link or create guest user profile
    if (!userId) {
      const applicantEmail = (email && email.trim()) ? email.trim().toLowerCase() : `guest_${Date.now()}@nds.org`;
      const applicantPhone = (phone && phone.trim()) ? phone.trim() : '+966566029046';
      const applicantName = (fullName && fullName.trim()) ? fullName.trim() : 'Diaspora Applicant';

      try {
        const existing = await db.query('SELECT id FROM users WHERE email = $1 OR phone = $2 LIMIT 1', [applicantEmail, applicantPhone]);
        if (existing.rows && existing.rows.length > 0) {
          userId = existing.rows[0].id;
        } else {
          const newUser = await db.query(
            'INSERT INTO users (full_name, email, phone, country, state_origin, password, is_admin) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id',
            [applicantName, applicantEmail, applicantPhone, 'Diaspora', 'Nigeria', 'guest_free', false]
          );
          userId = newUser.rows[0].id;
        }
      } catch (userErr) {
        console.warn('Guest user creation fallback:', userErr);
      }
    }

    // Generate unique reference number (e.g., NDS-2026-123456)
    let isUnique = false;
    let referenceNumber = '';
    while (!isUnique) {
      const randNum = Math.floor(100000 + Math.random() * 900000);
      referenceNumber = `NDS-2026-${randNum}`;
      
      const check = await db.query('SELECT id FROM applications WHERE reference_number = $1', [referenceNumber]);
      if (check.rows.length === 0) {
        isUnique = true;
      }
    }

    // Insert application
    const result = await db.query(
      'INSERT INTO applications (reference_number, user_id, service_required, description, contact_method, documents) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [referenceNumber, userId, serviceRequired, description || '', contactMethod || 'WhatsApp', documents || []]
    );

    return res.status(201).json({
      message: 'Application submitted successfully',
      application: result.rows[0]
    });

  } catch (err) {
    console.error('Application submission error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
