import React, { useState } from 'react';

function SearchBar({ onResults }) {
  const [query, setQuery] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      const response = await fetch(`http://localhost:5000/search?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      onResults(data.results);
    } catch (error) {
      console.error("Erreur lors de la recherche :", error);
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex flex-col sm:flex-row items-center justify-center gap-4 p-6 max-w-2xl mx-auto mt-12 bg-white rounded-2xl shadow-md"
    >
      <input
        type="text"
        placeholder="🔍 Tape ta recherche..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full sm:flex-1 p-3 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all"
      >
        Rechercher
      </button>
    </form>
  );
}

export default SearchBar;
