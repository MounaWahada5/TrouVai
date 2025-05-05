import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const user = { email, password };
    localStorage.setItem('user', JSON.stringify(user));
    navigate('/login');
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
      <form onSubmit={handleRegister} className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md w-full max-w-sm">
        <h2 className="text-xl font-semibold mb-6 text-center text-gray-800 dark:text-white">Créer un compte</h2>
        <input
          type="email"
          placeholder="Adresse e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <button type="submit" className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">
          S'inscrire
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
