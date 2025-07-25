import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch, setToken } from "../../utils/api";
import robotImage from '../../assets/fonts/robot.png'; // Importation de l'image du robot

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      setToken(data.token);
      localStorage.setItem("user_id", data.user.id.toString());
      localStorage.setItem("username", data.user.username);
      navigate("/chat");
    } catch (err: any) {
      setError(err.message || "Email ou mot de passe incorrect");
    }
  };

  return (
    // Conteneur principal avec le dégradé bleu de la HomePage
    <div
      className="min-h-screen flex items-center justify-center
                 bg-gradient-to-br from-[#E0FFFF] to-[#ADD8E6] text-gray-800" // Fond bleu clair harmonisé
    >
      <div className="flex w-full max-w-7xl h-[80vh] bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Partie gauche : Image du robot */}
        <div className="w-1/2 flex items-center justify-center p-8 bg-[#ADD8E6] relative"> {/* Couleur d'accentuation pour le fond de l'image */}
          <img
            src={robotImage}
            alt="Robot Assistant"
            className="max-h-full w-auto object-contain animate-float" // animate-float si défini dans votre CSS
          />
          {/* Petites bulles comme sur la HomePage */}
          <div className="absolute top-1/4 left-1/4 bg-blue-400 text-white px-3 py-1 rounded-lg text-sm rotate-6 shadow-md">
            Hello!
          </div>
          <div className="absolute top-1/3 right-1/4 bg-green-400 text-white px-3 py-1 rounded-lg text-sm -rotate-3 shadow-md">
            How are you?
          </div>
        </div>

        {/* Partie droite : Formulaire de connexion */}
        <div className="w-1/2 p-12 flex flex-col justify-center bg-white">
          <h2 className="text-4xl font-extrabold text-center text-[#2F4F4F] mb-8"> {/* Couleur du titre harmonisée */}
            Welcome Back!
          </h2>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-3 focus:ring-[#ADD8E6] transition-all duration-200" // Bordure et focus ring bleus
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-3 focus:ring-[#ADD8E6] transition-all duration-200" // Bordure et focus ring bleus
              required
            />
            <button
              type="submit"
              className="w-full py-4 bg-[#4682B4] text-white rounded-xl font-bold text-lg
                         hover:bg-[#34658A] transition-all duration-300 transform hover:-translate-y-1 shadow-lg" // Bouton bleu harmonisé
            >
              Sign In
            </button>
          </form>

          <p className="text-base text-center mt-8 text-gray-700">
            Don’t have an account?{" "}
            <button
              onClick={() => navigate("/signup")}
              className="text-[#4682B4] hover:underline font-semibold" // Lien bleu harmonisé
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}