const db = require('../db');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Support both GET query and POST body for flexibility
  const referenceNumber = req.query.ref || req.body.referenceNumber;
  const emailOrPhone = req.query.contact || req.body.emailOrPhone;

  if (!referenceNumber) {
    return res.status(400).json({ error: 'Reference number is required' });
  }

  try {
    let queryText = `
      SELECT a.*, u.full_name, u.email, u.phone 
      FROM applications a
      JOIN users u ON a.user_id = u.id
      WHERE a.reference_number = $1
    `;
    let queryParams = [referenceNumber.toUpperCase().trim()];

    if (emailOrPhone) {
      queryText += ' AND (LOWER(u.email) = $2 OR u.phone = $2)';
      queryParams.push(emailOrPhone.toLowerCase().trim());
    }

    const result = await db.query(queryText, queryParams);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Application not found. Please verify details.' });
    }

    const app = result.rows[0];

    // Fetch messages/chat logs for this application
    const msgResult = await db.query('SELECT * FROM messages WHERE application_id = $1 ORDER BY created_at ASC', [app.id]);

    return res.status(200).json({
      application: {
        referenceNumber: app.reference_number,
        serviceRequired: app.service_required,
        status: app.status,
        createdAt: app.created_at,
        description: app.description,
        notes: app.notes,
        documents: app.documents
      },
      messages: msgResult.rows
    });

  } catch (err) {
    console.error('Tracking query error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
