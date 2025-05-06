import React, { useState } from "react";
import axios from "axios";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/search", { query });
      setResults(response.data.results);
    } catch (error) {
      console.error("Erreur de recherche :", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-blue-700 dark:text-blue-300 mb-6">
          Recherche intelligente 🔍
        </h1>

        <div className="flex items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Tape ta question..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 p-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
          <button
            onClick={handleSearch}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Rechercher
          </button>
        </div>

        {/* ✅ Affichage des résultats */}
        {results.map((res, index) => (
          <div
            key={index}
            className="border p-4 rounded-xl bg-white/80 dark:bg-gray-800 shadow mb-4"
          >
            <p className="text-lg font-semibold text-blue-600 dark:text-blue-300">{res.text}</p>
            {res.url && (
              <a
                href={res.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-500 hover:underline"
              >
                Voir la source
              </a>
            )}
            <div className="text-sm text-gray-500 mt-1">
              Source : {res.source} | Score : {res.score.toFixed(2)}
            </div>
          </div>
          
        ))}
      </div>
    </div>
    
  );
  
};

export default SearchPage;
