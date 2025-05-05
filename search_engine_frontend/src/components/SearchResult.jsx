import React from 'react';
import { Star } from 'lucide-react';

export default function SearchResult({ result, onSaveFavorite }) {
  return (
    <div className="p-4 border rounded-md shadow-sm bg-white dark:bg-gray-800">
      <h3 className="font-semibold text-lg mb-2 text-primary">{result.title || "Résultat"}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300">{result.text || result.answer || "Pas de contenu"}</p>

      <button
        onClick={onSaveFavorite}
        className="mt-3 inline-flex items-center text-sm text-blue-600 hover:underline"
      >
        <Star className="w-4 h-4 mr-1" />
        Ajouter aux favoris
      </button>
    </div>
  );
}
