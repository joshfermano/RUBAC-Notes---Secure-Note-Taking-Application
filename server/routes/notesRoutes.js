import express from 'express';
import { authUser } from '../middlewares/authMiddleware.js';
import {
  getNotes,
  getSingleNote,
  addNote,
  editNote,
  removeNote,
} from '../controllers/notesController.js';

const router = express.Router();

// Apply auth middleware to all routes
router.use(authUser);

// CRUD operations
router.get('/', getNotes);
router.get('/:id', getSingleNote);
router.post('/', addNote);
router.put('/:id', editNote);
router.delete('/:id', removeNote);

export default router;
