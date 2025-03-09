import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { NavLink } from 'react-router-dom';
import { CgNotes } from 'react-icons/cg';
import { BsPersonAdd } from 'react-icons/bs';
import { IoLogInSharp } from 'react-icons/io5';
import { AiOutlineLogout } from 'react-icons/ai';
import { SiDarkreader } from 'react-icons/si';
import { GiStripedSun } from 'react-icons/gi';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setDarkMode(savedTheme === 'dark');
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else {
      const systemDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      setDarkMode(systemDark);
      document.documentElement.classList.toggle('dark', systemDark);
      localStorage.setItem('theme', systemDark ? 'dark' : 'light');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="p-4 font-poppins bg-light dark:bg-darkBlue dark:text-light transition-all duration-300">
      <div className="p-4 max-w-6xl mx-auto flex justify-between items-center">
        <NavLink to={'/'} className="hover:scale-105 transition duration-300">
          <h1 className="flex items-center gap-1 text-xl md:text-2xl font-bold">
            <CgNotes className="text-blue-700" />
            RuBAC <span className="text-blue-700">Notes</span>
          </h1>
        </NavLink>

        <div className="flex items-center gap-10">
          {!user ? (
            <div className="flex gap-4 items-center">
              <NavLink
                to={'register'}
                className="px-3 py-1 bg-darkBlue text-light rounded-full flex items-center gap-1 text-lg hover:scale-105 hover:bg-gray-300 hover:text-darkBlue transition duration-300 dark:bg-light dark:text-darkBlue">
                <BsPersonAdd className="text-lg" /> Register
              </NavLink>

              <NavLink
                to={'login'}
                className="px-3 py-1 bg-darkBlue text-light rounded-full flex items-center gap-1 text-lg hover:scale-105 hover:bg-gray-300 hover:text-darkBlue transition duration-300 dark:bg-light dark:text-darkBlue">
                <IoLogInSharp /> Login
              </NavLink>
            </div>
          ) : (
            <button
              onClick={handleLogout}
              className="px-3 py-1 bg-darkBlue text-light rounded-full flex items-center gap-1 text-lg hover:scale-105 hover:bg-red-700 transition duration-300 cursor-pointer dark:bg-light dark:text-darkBlue">
              <AiOutlineLogout /> Logout
            </button>
          )}

          <button>
            {darkMode ? (
              <GiStripedSun
                onClick={toggleDarkMode}
                className="text-2xl text-yellow-300 cursor-pointer"
              />
            ) : (
              <SiDarkreader
                onClick={toggleDarkMode}
                className="text-2xl text-darkBlue cursor-pointer"
              />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
