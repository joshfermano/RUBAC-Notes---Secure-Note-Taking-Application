import pool from '../config/db.js';

export const createUser = async (username, email, password) => {
  try {
    const [result] = await pool.query(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, password]
    );
    return result.insertId;
  } catch (error) {
    console.error(error);
  }
};

export const findUserByEmail = async (email) => {
  try {
    const [result] = await pool.query('SELECT * FROM users WHERE email = ?', [
      email,
    ]);
    return result[0];
  } catch (error) {
    console.error(error);
  }
};

export const findUserById = async (id) => {
  try {
    const [result] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    return result[0];
  } catch (error) {
    console.error(error);
  }
};

export const findUserByUsername = async (username) => {
  try {
    const [result] = await pool.query(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );
    return result[0];
  } catch (error) {
    console.error(error);
  }
};
