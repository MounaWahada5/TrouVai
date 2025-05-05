import React from 'react';
import { StarOff } from 'lucide-react';

export default function FavoritesList({ favorites }) {
  if (favorites.length === 0) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400 mt-10">
        <StarOff className="mx-auto mb-2 w-8 h-8" />
        Aucun favori enregistré pour le moment.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {favorites.map((fav, index) => (
        <div key={index} className="p-4 border rounded bg-white dark:bg-gray-800 shadow-sm">
          <h3 className="text-lg font-semibold text-primary">{fav.title || 'Favori'}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">{fav.text || fav.answer}</p>
        </div>
      ))}
    </div>
  );
}
