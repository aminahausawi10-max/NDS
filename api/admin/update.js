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
  if (!decoded || !decoded.isAdmin) {
    return res.status(403).json({ error: 'Forbidden. Admin access required.' });
  }

  try {
    const { applicationId, status, notes, messageText } = req.body;

    if (!applicationId) {
      return res.status(400).json({ error: 'Application ID is required' });
    }

    // 1. Update application table
    let updateFields = [];
    let queryParams = [];
    let paramIndex = 1;

    if (status) {
      updateFields.push(`status = $${paramIndex++}`);
      queryParams.push(status);
    }
    if (notes !== undefined) {
      updateFields.push(`notes = $${paramIndex++}`);
      queryParams.push(notes);
    }

    if (updateFields.length > 0) {
      queryParams.push(applicationId);
      const queryText = `
        UPDATE applications 
        SET ${updateFields.join(', ')} 
        WHERE id = $${paramIndex} 
        RETURNING *
      `;
      await db.query(queryText, queryParams);
    }

    // 2. Insert chat message if present
    if (messageText && messageText.trim() !== '') {
      await db.query(
        'INSERT INTO messages (application_id, sender, message) VALUES ($1, $2, $3)',
        [applicationId, 'admin', messageText.trim()]
      );
    }

    // Retrieve full application detail to return
    const appResult = await db.query('SELECT * FROM applications WHERE id = $1', [applicationId]);
    const msgResult = await db.query('SELECT * FROM messages WHERE application_id = $1 ORDER BY created_at ASC', [applicationId]);

    return res.status(200).json({
      message: 'Application updated successfully',
      application: appResult.rows[0],
      messages: msgResult.rows
    });

  } catch (err) {
    console.error('Update application error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
