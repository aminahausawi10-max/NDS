const db = require('../db');
const { verifyToken } = require('../middleware');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const decoded = verifyToken(req);
  if (!decoded) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const result = await db.query(
      'SELECT * FROM applications WHERE user_id = $1 ORDER BY created_at DESC',
      [decoded.userId]
    );

    return res.status(200).json({
      applications: result.rows
    });

  } catch (err) {
    console.error('List applications error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
