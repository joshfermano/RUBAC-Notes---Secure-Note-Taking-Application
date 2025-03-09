import express from 'express';
import {
  register,
  login,
  getCurrentUser,
} from '../controllers/authController.js';
import {
  authUser,
  authRegister,
  authLogin,
} from '../middlewares/authMiddleware.js';
import rateLimitMiddleware from '../middlewares/rateLimitMiddleware.js';

const router = express.Router();

router.post('/register', authRegister, register);
router.post('/login', rateLimitMiddleware, authLogin, login);
router.get('/me', authUser, getCurrentUser);

export default router;
