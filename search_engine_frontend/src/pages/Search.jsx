import React, { useState } from 'react';

function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);

  const handleSearch = async () => {
    const response = await fetch('http://127.0.0.1:5000/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query })
    });

    const data = await response.json();
    setResults(data);
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Moteur de Recherche Intelligent</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Pose ta question..."
        className="p-2 border rounded w-full mb-4"
      />
      <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded">
        Rechercher
      </button>

      {results && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Résultat :</h2>
          <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(results, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default SearchPage;
