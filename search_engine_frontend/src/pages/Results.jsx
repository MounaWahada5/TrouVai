import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function Results() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q');
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (query) {
      fetch(`http://localhost:5000/search?q=${encodeURIComponent(query)}`)
        .then((res) => res.json())
        .then((data) => setResults(data.results))
        .catch((err) => console.error(err));
    }
  }, [query]);

  return (
    <div>
      <h2>Résultats pour : {query}</h2>
      <ul>
        {results.map((result, index) => (
          <li key={index}>{result.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default Results;
