import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Search from "./components/Search";
import Results from "./components/Results";
import History from "./components/History";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Recherche</Link> | <Link to="/results">Résultats</Link> | <Link to="/history">Historique</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/results" element={<Results />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

