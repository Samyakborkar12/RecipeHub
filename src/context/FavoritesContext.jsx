import React, { createContext, useContext, useEffect, useState } from 'react';

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem('recipehub_favorites');
      return stored ? JSON.parse(stored) : ['butter-chicken-delight', 'creamy-tuscan-garlic-pasta'];
    } catch {
      return ['butter-chicken-delight', 'creamy-tuscan-garlic-pasta'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('recipehub_favorites', JSON.stringify(favorites));
    } catch (err) {
      console.warn('Unable to persist favorites to localStorage', err);
    }
  }, [favorites]);

  const isFavorite = (id) => favorites.includes(id);

  const toggleFavorite = (id) => {
    setFavorites(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const addFavorite = (id) => {
    setFavorites(prev => (prev.includes(id) ? prev : [...prev, id]));
  };

  const removeFavorite = (id) => {
    setFavorites(prev => prev.filter(item => item !== id));
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        favoritesCount: favorites.length,
        isFavorite,
        toggleFavorite,
        addFavorite,
        removeFavorite,
        clearFavorites
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}
