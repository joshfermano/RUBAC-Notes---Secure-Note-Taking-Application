import pool from '../config/db.js';

const WINDOW_SIZE_MS = 5 * 60 * 1000; // 5 minutes
const MAX_ATTEMPTS = 3;

const rateLimitMiddleware = async (req, res, next) => {
  const { email } = req.body;
  const ipAddress = req.ip;

  if (!email) {
    return next();
  }

  try {
    // Get number of attempts within the window
    const [attempts] = await pool.query(
      `SELECT COUNT(*) as count FROM login_attempts 
       WHERE (ip_address = ? OR email = ?) 
       AND attempt_time > NOW() - INTERVAL 5 MINUTE`,
      [ipAddress, email]
    );

    if (attempts[0].count >= MAX_ATTEMPTS) {
      return res.status(429).json({
        message: 'Too many login attempts. Please try again after 5 minutes.',
      });
    }

    // Store this attempt
    req.recordLoginAttempt = async (success) => {
      if (!success) {
        await pool.query(
          'INSERT INTO login_attempts (ip_address, email) VALUES (?, ?)',
          [ipAddress, email]
        );
      } else {
        // Clear previous attempts if login is successful
        await pool.query(
          'DELETE FROM login_attempts WHERE ip_address = ? OR email = ?',
          [ipAddress, email]
        );
      }
    };

    next();
  } catch (error) {
    next(error);
  }
};

export default rateLimitMiddleware;
