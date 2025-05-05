import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import SearchResult from '../components/SearchResult';
import { fetchSearchResults } from '../utils/api';
import { saveToHistory, saveToFavorites } from '../utils/storage';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (searchQuery) => {
    setQuery(searchQuery);
    setLoading(true);
    try {
      const response = await fetchSearchResults(searchQuery);
      setResults(response);
      saveToHistory(searchQuery); // save to localStorage
    } catch (error) {
      console.error('Erreur recherche:', error);
    }
    setLoading(false);
  };

  const handleSaveFavorite = (item) => {
    saveToFavorites(item);
  };

  return (
    <div className="space-y-6">
      <SearchBar onSearch={handleSearch} />
      {loading && <p className="text-center">🔄 Chargement...</p>}
      {!loading && results.length > 0 && (
        <div className="space-y-4">
          {results.map((item, idx) => (
            <SearchResult
              key={idx}
              result={item}
              onSaveFavorite={() => handleSaveFavorite(item)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
