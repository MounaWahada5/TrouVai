import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center text-center h-[80vh] space-y-8">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-primary dark:text-white"
      >
        Welcome To My Smart Search Engine 🔍
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-lg text-gray-600 dark:text-gray-300 max-w-xl"
      >
        Explore les données, garde une trace de ton historique et enregistre tes résultats préférés.
      </motion.p>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate('/search')}
        className="px-6 py-3 bg-primary text-white rounded-full shadow hover:bg-blue-600 transition"
      >
        Commencer la recherche
      </motion.button>
    </div>
  );
}
