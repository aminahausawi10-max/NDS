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
    return res.status(450).json({ error: 'Method not allowed' });
  }

  const decoded = verifyToken(req);
  if (!decoded) {
    return res.status(401).json({ error: 'Unauthorized. Please log in.' });
  }

  try {
    const { serviceRequired, description, contactMethod, documents } = req.body;

    if (!serviceRequired) {
      return res.status(400).json({ error: 'Service required is missing' });
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
      [referenceNumber, decoded.userId, serviceRequired, description || '', contactMethod || 'Email', documents || []]
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
