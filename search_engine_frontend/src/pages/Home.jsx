import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';

function Home() {
  const [results, setResults] = useState([]);

  return (
    <div>
      <h1>Moteur de recherche intelligent</h1>
      <SearchBar onResults={setResults} />

      <div>
        {results.length > 0 ? (
          <ul>
            {results.map((result, index) => (
              <li key={index}>{result}</li>
            ))}
          </ul>
        ) : (
          <p>Aucun résultat pour le moment.</p>
        )}
      </div>
    </div>
  );
}

export default Home;
