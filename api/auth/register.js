const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { fullName, email, phone, country, stateOrigin, password } = req.body;

    if (!fullName || !email || !phone || !country || !password) {
      return res.status(400).json({ error: 'All fields except state of origin are required' });
    }

    // Check if user exists
    const existing = await db.query('SELECT id FROM users WHERE email = $1', [email.toLowerCase().trim()]);
    if (existing.rows.length > 0) {
      return res.status(400).json({ error: 'Email is already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    const result = await db.query(
      'INSERT INTO users (full_name, email, phone, country, state_origin, password) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, full_name, email, is_admin',
      [fullName, email.toLowerCase().trim(), phone, country, stateOrigin || '', hashedPassword]
    );

    const user = result.rows[0];

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email, isAdmin: user.is_admin },
      process.env.JWT_SECRET || 'nds-secret-key-2026',
      { expiresIn: '7d' }
    );

    return res.status(201).json({
      message: 'Registration successful',
      token,
      user: {
        id: user.id,
        fullName: user.full_name,
        email: user.email,
        isAdmin: user.is_admin
      }
    });

  } catch (err) {
    console.error('Registration error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
