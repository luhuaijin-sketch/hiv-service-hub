import { useState, useEffect } from 'react';

const STORAGE_KEY = 'hiv_service_hub_favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse favorites from localStorage', e);
      }
    }
  }, []);

  const toggleFavorite = (articleId: string) => {
    setFavorites((prev) => {
      const isFavorited = prev.includes(articleId);
      const next = isFavorited
        ? prev.filter((id) => id !== articleId)
        : [...prev, articleId];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  const isFavorited = (articleId: string) => favorites.includes(articleId);

  return { favorites, toggleFavorite, isFavorited };
}
