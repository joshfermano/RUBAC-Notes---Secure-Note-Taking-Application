import React from 'react';
import { Link } from 'react-router-dom';
import { IoAddOutline } from 'react-icons/io5';
import NoteGrids from '../components/NoteGrids';
import { useAuth } from '../contexts/AuthContext';

const Homepage = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl text-gray-900 dark:text-white flex items-center gap-2  ">
            Welcome,{' '}
            <span className="text-blue-600 font-bold">{user.username}</span>!
          </h1>

          <Link
            to="/notes/new"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:hover:bg-indigo-500 transition-all duration-200">
            <IoAddOutline className="text-xl mr-2" />
            New Note
          </Link>
        </div>
        <NoteGrids />
      </div>
    </div>
  );
};

export default Homepage;
