import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const username = localStorage.getItem('user');
  {username ? (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-gray-700 dark:text-white">👤 {username}</span>
      <button
        onClick={() => {
          localStorage.removeItem('user');
          window.location.href = '/login';
        }}
        className="text-red-500 hover:text-red-700 text-sm"
      >
        Se déconnecter
      </button>
    </div>
  ) : (
    <NavLink
      to="/login"
      className="text-sm text-primary font-semibold hover:underline"
    >
      Se connecter
    </NavLink>
  )}
  

  useEffect(() => {
    const isDark = localStorage.getItem('theme') === 'dark';
    setDarkMode(isDark);
    document.documentElement.classList.toggle('dark', isDark);

    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', newMode);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-800 shadow-md">
      <h1 className="text-xl font-bold text-primary dark:text-white">🔎 TrouVai</h1>
      <NavLink to="/login" className="text-gray-600 dark:text-gray-300 hover:text-primary">
  Connexion
</NavLink>
<NavLink to="/register" className="text-gray-600 dark:text-gray-300 hover:text-primary">
  Inscription
</NavLink>


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

        <NavLink to="/about" className={({ isActive }) =>
          isActive ? 'text-primary font-semibold' : 'text-gray-600 dark:text-gray-300 hover:text-primary'
        }>
          À propos
        </NavLink>

        <button
          onClick={toggleDarkMode}
          className="ml-2 p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
        >
          {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-800" />}
        </button>

        {user && (
          <div className="flex items-center space-x-2 ml-4">
            <span className="text-sm text-primary dark:text-white">👤 {user}</span>
            <button
              onClick={handleLogout}
              className="text-red-500 hover:underline text-sm"
            >
              Déconnexion
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
