import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  })
  .promise();

const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Connected to MySQL Database!');
    connection.release();
  } catch (error) {
    console.error('Failed to connect to MySQL Database:', error);
  }
};

testConnection();

export default pool;
