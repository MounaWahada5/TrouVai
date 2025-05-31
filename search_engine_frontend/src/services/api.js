import axios from "axios";

const API_BASE = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true, // Pour CORS + cookies si besoin
});

// Auth API
export const login = (email, password) =>
  api.post("/auth/login", { email, password });

export const register = (email, password, username) =>
  api.post("/auth/register", { email, password, username });

// Chat / Recherche
export const sendMessage = (message) =>
  api.post("/chat/send", { message });

// Scraping / Recherche sur Google
export const getScrapingResults = (query) =>
  api.get(`/scraping/search?query=${encodeURIComponent(query)}`);

// Historique (optionnel)
export const fetchHistory = () => api.get("/user/history");

// Logout
export const logout = () => api.post("/auth/logout");

export default api;
