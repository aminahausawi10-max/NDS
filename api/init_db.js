const { Client } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

async function main() {
  await client.connect();
  const sqlPath = path.join(__dirname, '../schema.sql');
  const sql = fs.readFileSync(sqlPath, 'utf8');
  console.log('Running database schema migration...');
  await client.query(sql);
  console.log('Database tables successfully initialized!');
  await client.end();
}

main().catch(err => {
  console.error('Migration error:', err);
  process.exit(1);
});
