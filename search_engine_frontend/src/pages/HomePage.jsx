import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">

      {/* Contenu principal avec header inclus */}
      <div className="relative z-10 w-full max-w-6xl px-6 py-16 mx-auto">
        <div className="bg-white/90 dark:bg-black/70 rounded-3xl shadow-2xl p-10 text-center">

          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 dark:text-blue-300 mb-4">
            Welcome To My Smart Search Engine 🔍
          </h1>

          <p className="text-lg md:text-xl text-gray-800 dark:text-gray-200 mb-8">
            Explore les données, garde une trace de ton historique et enregistre tes résultats favoris.
          </p>

          <button
            onClick={() => navigate("/search")}
            className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold py-3 px-8 rounded-full transition duration-300 shadow-lg"
          >
            Commencer la recherche
          </button>
        </div>

        {/* Cards avec titres déjà présents dans Navbar, pour effet visuel uniquement */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div
            onClick={() => navigate("/search")}
            className="cursor-pointer bg-white/70 dark:bg-gray-800 rounded-xl shadow-md p-6 hover:scale-105 transform transition duration-300"
          >
            <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-300">🔍 Rechercher</h3>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Lancer une recherche intelligente avec notre IA.
            </p>
          </div>

          <div
            onClick={() => navigate("/history")}
            className="cursor-pointer bg-white/70 dark:bg-gray-800 rounded-xl shadow-md p-6 hover:scale-105 transform transition duration-300"
          >
            <h3 className="text-xl font-semibold text-purple-700 dark:text-purple-300">🕓 Historique</h3>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Consulte les recherches précédentes.
            </p>
          </div>

          <div
            onClick={() => navigate("/favorites")}
            className="cursor-pointer bg-white/70 dark:bg-gray-800 rounded-xl shadow-md p-6 hover:scale-105 transform transition duration-300"
          >
            <h3 className="text-xl font-semibold text-red-600 dark:text-red-300">❤️ Favoris</h3>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Retrouve facilement tes résultats favoris.
            </p>
          </div>

          <div
            onClick={() => navigate("/about")}
            className="cursor-pointer bg-white/70 dark:bg-gray-800 rounded-xl shadow-md p-6 hover:scale-105 transform transition duration-300"
          >
            <h3 className="text-xl font-semibold text-green-600 dark:text-green-300">ℹ️ À propos</h3>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              En savoir plus sur le projet et ses objectifs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
