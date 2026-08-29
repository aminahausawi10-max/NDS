const { Pool } = require('pg');
require('dotenv').config();

let pool;

function getPool() {
  if (!pool) {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error('DATABASE_URL environment variable is missing or undefined');
    }
    pool = new Pool({
      connectionString,
      ssl: {
        rejectUnauthorized: false
      }
    });
  }
  return pool;
}

module.exports = {
  query: (text, params) => getPool().query(text, params),
  getPool
};
