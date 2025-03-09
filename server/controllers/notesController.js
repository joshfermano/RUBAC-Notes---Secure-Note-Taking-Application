import {
  getAllNotes,
  createNote,
  getNoteById,
  updateNote,
  deleteNote,
} from '../models/Notes.js';

export const getNotes = async (req, res) => {
  try {
    const userId = req.user.id;
    const notes = await getAllNotes(userId);

    if (!notes) {
      return res.status(500).json({ message: 'Failed to fetch notes' });
    }

    res.status(200).json({ notes });
  } catch (error) {
    console.error('Error while getting notes:', error);
    res.status(500).json({ message: 'Something went wrong!' });
  }
};

export const getSingleNote = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const note = await getNoteById(id, userId);

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.status(200).json({ note });
  } catch (error) {
    console.error('Error while getting note:', error);
    res.status(500).json({ message: 'Something went wrong!' });
  }
};

export const addNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    // Check if user is authenticated
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        message: 'Authentication required',
      });
    }

    // Validate input
    if (!title || title.trim() === '') {
      return res.status(400).json({
        message: 'Title is required',
      });
    }

    const userId = req.user.id;
    const note = await createNote(userId, title.trim(), content?.trim());

    if (!note) {
      return res.status(500).json({
        message: 'Failed to create note',
      });
    }

    return res.status(201).json({
      message: 'Note created successfully',
      note: {
        id: note.id,
        title: note.title,
        content: note.content,
        created_at: note.created_at,
      },
    });
  } catch (error) {
    console.error('Error while creating note:', error);
    return res.status(500).json({
      message: error.message || 'Failed to create note',
    });
  }
};

export const editNote = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { title, content } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const note = await getNoteById(id, userId);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    const isUpdated = await updateNote(id, userId, title, content);
    if (!isUpdated) {
      return res.status(500).json({ message: 'Failed to update note' });
    }

    res.status(200).json({
      message: 'Note updated successfully',
      note: { id, title, content },
    });
  } catch (error) {
    console.error('Error while updating note:', error);
    res.status(500).json({ message: 'Something went wrong!' });
  }
};

export const removeNote = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const note = await getNoteById(id, userId);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    const isDeleted = await deleteNote(id, userId);
    if (!isDeleted) {
      return res.status(500).json({ message: 'Failed to delete note' });
    }

    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error('Error while deleting note:', error);
    res.status(500).json({ message: 'Something went wrong!' });
  }
};
