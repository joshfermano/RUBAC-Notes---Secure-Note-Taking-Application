import pool from '../config/db.js';

export const getAllNotes = async (userId) => {
  try {
    const [notes] = await pool.query(
      'SELECT * FROM notes WHERE user_id = ? ORDER BY created_at DESC',
      [userId]
    );
    return notes;
  } catch (error) {
    console.error('Error while getting notes: ', error);
  }
};

export const createNote = async (userId, title, content) => {
  try {
    // Validate inputs
    if (!userId || !title) {
      throw new Error('Missing required fields');
    }

    const [result] = await pool.query(
      'INSERT INTO notes (user_id, title, content) VALUES (?, ?, ?)',
      [userId, title, content || '']
    );

    if (!result.insertId) {
      throw new Error('Failed to create note');
    }

    // Fetch created note
    const [newNote] = await pool.query('SELECT * FROM notes WHERE id = ?', [
      result.insertId,
    ]);

    return newNote[0];
  } catch (error) {
    console.error('Error while creating note:', error);
    throw error;
  }
};

export const getNoteById = async (noteId, userId) => {
  try {
    const [note] = await pool.query(
      'SELECT * FROM notes WHERE id = ? AND user_id = ?',
      [noteId, userId]
    );
    return note[0];
  } catch (error) {
    console.error('Error while getting note:', error);
    throw error;
  }
};

export const updateNote = async (noteId, userId, title, content) => {
  try {
    const [result] = await pool.query(
      'UPDATE notes SET title = ?, content = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?',
      [title, content, noteId, userId]
    );
    return result.affectedRows > 0;
  } catch (error) {
    console.error('Error while updating note:', error);
    throw error;
  }
};

export const deleteNote = async (noteId, userId) => {
  try {
    const [result] = await pool.query(
      'DELETE FROM notes WHERE id = ? AND user_id = ?',
      [noteId, userId]
    );
    return result.affectedRows > 0;
  } catch (error) {
    console.error('Error while deleting note:', error);
    throw error;
  }
};
