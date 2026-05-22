const mysql = require('mysql2/promise');
const config = require('../../../config');

let pool;

const createDatabaseIfMissing = async () => {
  const connection = await mysql.createConnection({
    host: config.db.host,
    port: config.db.port,
    user: config.db.user,
    password: config.db.password,
  });

  await connection.query(
    `CREATE DATABASE IF NOT EXISTS ${mysql.escapeId(config.db.name)}`
  );
  await connection.end();
};

const connectDatabase = async () => {
  if (pool) {
    return pool;
  }

  await createDatabaseIfMissing();

  pool = mysql.createPool({
    host: config.db.host,
    port: config.db.port,
    user: config.db.user,
    password: config.db.password,
    database: config.db.name,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

  const connection = await pool.getConnection();
  connection.release();

  console.log(`MySQL connected to database "${config.db.name}"`);
  return pool;
};

module.exports = connectDatabase;
module.exports.getPool = () => pool;
