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

  const decoded = verifyToken(req);
  if (!decoded) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const { applicationId, messageText } = req.body;

    if (!applicationId || !messageText || messageText.trim() === '') {
      return res.status(400).json({ error: 'Application ID and message text are required' });
    }

    // Verify application belongs to the logged in user
    const appCheck = await db.query(
      'SELECT id FROM applications WHERE id = $1 AND user_id = $2',
      [applicationId, decoded.userId]
    );

    if (appCheck.rows.length === 0) {
      return res.status(403).json({ error: 'Forbidden. You do not own this application.' });
    }

    // Insert message
    await db.query(
      'INSERT INTO messages (application_id, sender, message) VALUES ($1, $2, $3)',
      [applicationId, 'customer', messageText.trim()]
    );

    const msgResult = await db.query(
      'SELECT * FROM messages WHERE application_id = $1 ORDER BY created_at ASC',
      [applicationId]
    );

    return res.status(201).json({
      message: 'Message sent successfully',
      messages: msgResult.rows
    });

  } catch (err) {
    console.error('Customer message submission error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
