import React from 'react';
import { Heart } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';

export default function FavoriteButton({ recipeId, className = '', size = 'md' }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(recipeId);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(recipeId);
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={active ? 'Remove from favorites' : 'Save to favorites'}
      aria-pressed={active}
      className={`group relative flex items-center justify-center rounded-full transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
        active
          ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400 hover:scale-105 shadow-sm'
          : 'bg-white/90 text-stone-500 backdrop-blur-sm hover:text-rose-500 hover:bg-white dark:bg-stone-900/80 dark:text-stone-400 dark:hover:text-rose-400 dark:hover:bg-stone-900 shadow-sm'
      } ${className}`}
    >
      <Heart
        className={`${iconSizes[size] || 'w-5 h-5'} transition-all duration-200 ${
          active ? 'fill-rose-500 text-rose-500 scale-110' : 'group-hover:scale-110'
        }`}
      />
    </button>
  );
}
