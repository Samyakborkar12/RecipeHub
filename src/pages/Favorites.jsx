import React from 'react';
import { Heart, Trash2 } from 'lucide-react';
import RecipeCard from '../components/RecipeCard';
import EmptyState from '../components/EmptyState';
import { useFavorites } from '../context/FavoritesContext';
import { RECIPES } from '../data/recipes';

export default function Favorites() {
  const { favorites, clearFavorites, favoritesCount } = useFavorites();

  const favoriteRecipes = RECIPES.filter(recipe => favorites.includes(recipe.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200/80 dark:border-stone-800/80 mb-8">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-stone-100 tracking-tight">
              My Saved Recipes
            </h1>
            <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 tabular-nums">
              {favoritesCount}
            </span>
          </div>
          <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
            Your personal cookbook of handpicked culinary inspirations
          </p>
        </div>

        {favoritesCount > 0 && (
          <button
            type="button"
            onClick={() => {
              if (window.confirm('Are you sure you want to remove all saved recipes?')) {
                clearFavorites();
              }
            }}
            className="flex items-center gap-1.5 self-start sm:self-auto px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 dark:text-stone-400 hover:text-rose-600 dark:hover:text-rose-400 border border-stone-200 dark:border-stone-800 hover:border-rose-300 dark:hover:border-rose-900 transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear All Saved</span>
          </button>
        )}
      </div>

      {/* Grid or Empty State */}
      {favoriteRecipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favoriteRecipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div className="py-12">
          <EmptyState
            icon={Heart}
            title="Your recipe box is empty."
            description="Save recipes you love and they'll appear here."
            actionText="Explore Recipes"
            actionTo="/explore"
          />
        </div>
      )}
    </div>
  );
}
