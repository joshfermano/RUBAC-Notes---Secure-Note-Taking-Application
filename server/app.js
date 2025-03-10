import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import notesRoutes from './routes/notesRoutes.js';
import errorMiddleware from './middlewares/errorMiddleware.js';

dotenv.config();

const PORT = process.env.PORT || 5500;

const app = express();

app.use(cors());
app.use(express.json());

// Default route
app.get('/', (req, res) => {
  res.json({ message: 'API is running successfully' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);

// Error handling middleware
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
