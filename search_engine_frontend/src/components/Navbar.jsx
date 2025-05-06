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
    <div className="flex justify-between items-center w-full px-6 py-4 bg-white dark:bg-gray-800 shadow">
    <div className="flex items-center gap-4">
      <NavLink to="/" className="text-blue-600 font-bold text-xl flex items-center gap-1">
        🔍 TrouVai
      </NavLink>
    </div>
  
    <div className="flex items-center gap-4">
      <NavLink to="/login" className="text-gray-600 hover:text-blue-600">Connexion</NavLink>
      <NavLink to="/register" className="bg-blue-600 text-white px-3 py-1 rounded-full hover:bg-blue-700">
        Inscription
      </NavLink>
    </div>
  </div>

  );
}
