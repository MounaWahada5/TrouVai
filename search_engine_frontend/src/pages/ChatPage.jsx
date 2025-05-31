import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import ChatMessage from "../components/ChatMessage";
import InputBar from "../components/InputBar";
import { sendMessage, getScrapingResults, fetchHistory } from "../services/api";

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Charger l'historique au lancement (optionnel)
  useEffect(() => {
    async function loadHistory() {
      try {
        const res = await fetchHistory();
        if (res.data && res.data.history) {
          setMessages(res.data.history);
        }
      } catch (error) {
        console.log("Pas d'historique ou erreur:", error);
      }
    }
    loadHistory();
  }, []);

  const handleSend = async (text) => {
    const userMessage = { role: "user", text };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      // 1. Recherche scraping sur Google (par ex)
      const scrapingRes = await getScrapingResults(text);
      const scrapingResults = scrapingRes.data.results || [];

      // 2. Envoi message au chat backend (modèle AI)
      const chatRes = await sendMessage(text);
      const botReply = chatRes.data.reply;

      const botMessage = {
        role: "bot",
        text: botReply,
        scraping: scrapingResults,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Désolé, une erreur est survenue." },
      ]);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <main className="flex-grow p-4 overflow-auto bg-gray-900">
        {messages.map((msg, i) => (
          <div key={i}>
            <ChatMessage message={msg} />
            {msg.scraping && msg.scraping.length > 0 && (
              <div className="ml-4 mb-4 bg-gray-800 rounded p-2 text-sm">
                <strong>Sources trouvées:</strong>
                <ul className="list-disc list-inside">
                  {msg.scraping.map((source, idx) => (
                    <li key={idx}>
                      <a
                        href={source.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 underline"
                      >
                        {source.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </main>
      <InputBar onSend={handleSend} />
      {loading && (
        <div className="absolute bottom-20 right-4 text-white animate-pulse">
          Chargement...
        </div>
      )}
    </div>
  );
}
