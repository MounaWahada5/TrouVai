import React, { useState } from "react";

export default function InputBar({ onSend }) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() === "") return;
    onSend(input);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-4 bg-gray-900 flex items-center">
      <textarea
        className="flex-grow resize-none rounded-md p-2 bg-gray-700 text-white outline-none"
        rows={1}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Pose ta question ou recherche..."
      />
      <button
        onClick={handleSend}
        className="ml-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Envoyer
      </button>
    </div>
  );
}
