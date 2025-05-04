import React, { useEffect, useState } from "react";

function Results() {
  const [results, setResults] = useState([]);
  const lastQuery = localStorage.getItem("lastQuery");

  useEffect(() => {
    if (!lastQuery) return;

    fetch("http://localhost:5000/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: lastQuery }),
    })
      .then((res) => res.json())
      .then((data) => setResults(data));
  }, [lastQuery]);

  return (
    <div>
      <h2>Résultats pour : "{lastQuery}"</h2>
      <ul>
        {results.map((item, i) => (
          <li key={i}>
            {item.text} <br />
            <small>Score: {item.score.toFixed(2)}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Results;
