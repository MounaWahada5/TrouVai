import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar"; 

const HomePage = () => {
  const [selectedModel, setSelectedModel] = useState("gemma");
  const navigate = useNavigate();

  const handleStartChat = () => {
    navigate("/chat", { state: { model: selectedModel } });
  };

   return (
    <div>
      <Navbar /> {/* Affiche la navbar ici */}

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex flex-col items-center justify-center text-center px-4 pt-8">
        <h1 className="text-5xl font-extrabold animate-float bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text mb-6">
          SmartSearch AI
        </h1>

        <p className="text-gray-600 text-lg mb-8">
          Explore answers with public AI models like <strong>Gemma</strong> and <strong>Mistral</strong>
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="gemma">Gemma</option>
            <option value="mistral">Mistral</option>
            <option value="other">Other (Coming soon)</option>
          </select>

          <button
            onClick={handleStartChat}
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
          >
            Start Chat
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;