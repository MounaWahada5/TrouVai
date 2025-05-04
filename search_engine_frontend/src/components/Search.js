import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Search() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!query.trim()) return;
    localStorage.setItem("lastQuery", query); // on enregistre la recherche
    navigate("/results"); // on va à la page de résultats
  };

  return (
    <div>
      <h2>Moteur de Recherche Intelligent</h2>
      <input
        type="text"
        placeholder="Entrez votre recherche..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Rechercher</button>
    </div>
  );
}

export default Search;
