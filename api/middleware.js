const jwt = require('jsonwebtoken');

function verifyToken(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  const token = authHeader.split(' ')[1];
  try {
    return jwt.verify(token, process.env.JWT_SECRET || 'nds-secret-key-2026');
  } catch (err) {
    return null;
  }
}

module.exports = {
  verifyToken
};
