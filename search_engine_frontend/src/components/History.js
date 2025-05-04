import React, { useEffect, useState } from "react";

function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/history")
      .then((res) => res.json())
      .then((data) => setHistory(data.history));
  }, []);

  return (
    <div>
      <h2>Historique</h2>
      <ul>
        {history.map((q, i) => (
          <li key={i}>{q}</li>
        ))}
      </ul>
    </div>
  );
}

export default History;
