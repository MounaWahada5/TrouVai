import React, { useEffect, useState } from 'react';
import FavoritesList from '../components/FavoritesList';
import { getFavorites } from '../utils/storage';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-primary">⭐ Favoris enregistrés</h2>
      <FavoritesList favorites={favorites} />
    </div>
  );
}
