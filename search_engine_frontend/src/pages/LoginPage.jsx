import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveToken } from "../utils/storage";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erreur lors de la connexion");
      }

      saveToken(data.token);
      alert("Connexion réussie !");
      navigate("/favorites"); // ou "/history"
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="p-6">
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Se connecter</button>
    </div>
  );
};

export default LoginPage;
