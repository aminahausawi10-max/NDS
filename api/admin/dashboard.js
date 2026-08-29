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
  if (!decoded || !decoded.isAdmin) {
    return res.status(403).json({ error: 'Forbidden. Admin access required.' });
  }

  try {
    // Get all applications
    const appResult = await db.query(`
      SELECT a.*, u.full_name, u.email, u.phone 
      FROM applications a
      JOIN users u ON a.user_id = u.id
      ORDER BY a.created_at DESC
    `);

    // Get statistics
    const statsResult = await db.query(`
      SELECT 
        COUNT(*) as total,
        COUNT(CASE WHEN status = 'Application Received' THEN 1 END) as new_apps,
        COUNT(CASE WHEN status = 'Processing' THEN 1 END) as processing,
        COUNT(CASE WHEN status = 'Completed' THEN 1 END) as completed,
        COUNT(CASE WHEN status = 'Documents Required' THEN 1 END) as action_needed
      FROM applications
    `);

    const usersResult = await db.query(`SELECT COUNT(*) as total_users FROM users WHERE is_admin = FALSE`);

    return res.status(200).json({
      applications: appResult.rows,
      stats: {
        total: parseInt(statsResult.rows[0].total),
        new: parseInt(statsResult.rows[0].new_apps),
        processing: parseInt(statsResult.rows[0].processing),
        completed: parseInt(statsResult.rows[0].completed),
        actionNeeded: parseInt(statsResult.rows[0].action_needed),
        usersCount: parseInt(usersResult.rows[0].total_users)
      }
    });

  } catch (err) {
    console.error('Admin dashboard fetch error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
