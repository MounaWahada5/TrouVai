import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDark = localStorage.getItem('theme') === 'dark';
    setDarkMode(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', newMode);
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-800 shadow-md">
      <h1 className="text-xl font-bold text-primary dark:text-white">🔎 TrouVai</h1>

      <div className="flex gap-4 items-center">
        <NavLink to="/" className={({ isActive }) =>
          isActive ? 'text-primary font-semibold' : 'text-gray-600 dark:text-gray-300 hover:text-primary'
        }>
          Accueil
        </NavLink>

        <NavLink to="/search" className={({ isActive }) =>
          isActive ? 'text-primary font-semibold' : 'text-gray-600 dark:text-gray-300 hover:text-primary'
        }>
          Rechercher
        </NavLink>

        <NavLink to="/history" className={({ isActive }) =>
          isActive ? 'text-primary font-semibold' : 'text-gray-600 dark:text-gray-300 hover:text-primary'
        }>
          Historique
        </NavLink>

        <NavLink to="/favorites" className={({ isActive }) =>
          isActive ? 'text-primary font-semibold' : 'text-gray-600 dark:text-gray-300 hover:text-primary'
        }>
          Favoris
        </NavLink>

        <button
          onClick={toggleDarkMode}
          className="ml-4 p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
        >
          {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-800" />}
        </button>
      </div>
    </nav>
  );
}
