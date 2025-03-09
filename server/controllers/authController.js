import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { createUser, findUserByEmail, findUserById } from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingEmail = await findUserByEmail(email);
    const existingUsername = await findUserByEmail(username);

    if (existingEmail || existingUsername) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create the user
    const user = await createUser(username, email, hashedPassword);

    // Create a token
    const token = jwt.sign(
      { id: user, username, email },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: '1h',
      }
    );

    res.status(201).json({
      message: 'User Created Successfully!',
      token,
      user: { id: user, username, email },
    });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong!' });
    console.error(error);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await findUserByEmail(email);
    if (!user) {
      if (req.recordLoginAttempt) {
        await req.recordLoginAttempt(false);
      }
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      if (req.recordLoginAttempt) {
        await req.recordLoginAttempt(false);
      }
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate Token
    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1d' }
    );

    if (req.recordLoginAttempt) {
      await req.recordLoginAttempt(true);
    }

    res.status(200).json({
      message: 'Login Successful!',
      token,
      user: { id: user.id, username: user.username, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong!' });
    console.error(error);
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const user = await findUserById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({
      email: user.email,
      username: user.username,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error verifying token' });
  }
};
