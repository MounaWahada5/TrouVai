function History() {
  return <h1>Historique de recherche</h1>;
}
import React, { useEffect, useState } from 'react';

function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/history')
      .then(res => res.json())
      .then(data => setHistory(data.history))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Historique des recherches</h2>
      <ul>
        {history.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default History;
