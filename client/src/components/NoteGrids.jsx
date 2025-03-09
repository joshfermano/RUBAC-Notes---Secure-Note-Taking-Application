import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit3, FiTrash2 } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';

const NoteGrids = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch('http://localhost:5500/api/notes', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch notes');
        }

        const data = await response.json();
        setNotes(data.notes);
      } catch (error) {
        console.error('Error fetching notes:', error);
        setError('Failed to load notes');
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [token]);

  const handleDelete = async (noteId) => {
    if (!window.confirm('Are you sure you want to delete this note?')) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5500/api/notes/${noteId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to delete note');
      }

      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
    } catch (error) {
      console.error('Error deleting note:', error);
      setError('Failed to delete note');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 dark:text-red-400">{error}</div>
    );
  }

  if (notes.length === 0) {
    return (
      <div className="text-center text-gray-600 dark:text-gray-400">
        No notes yet. Create your first note!
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {notes.map((note) => (
        <div
          key={note.id}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
          <Link to={`/notes/${note.id}`}>
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 truncate">
                {note.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
                {note.content}
              </p>
            </div>
          </Link>
          <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {new Date(note.created_at).toLocaleDateString()}
            </span>
            <div className="flex space-x-2">
              <Link
                to={`/notes/${note.id}/edit`}
                className="p-2 text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors duration-200">
                <FiEdit3 className="w-4 h-4" />
              </Link>
              <button
                onClick={() => handleDelete(note.id)}
                className="p-2 text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 transition-colors duration-200">
                <FiTrash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NoteGrids;
