import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, ChefHat, Sparkles } from 'lucide-react';
import FavoriteButton from './FavoriteButton';
import Rating from './Rating';

export default function RecipeCard({ recipe, className = '' }) {
  const [imageError, setImageError] = useState(false);

  if (!recipe) return null;

  return (
    <article
      className={`group relative flex flex-col bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/80 dark:border-stone-800/80 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 ${className}`}
    >
      {/* Clickable Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100 dark:bg-stone-800">
        {!imageError ? (
          <img
            src={recipe.image}
            alt={recipe.title}
            onError={() => setImageError(true)}
            referrerPolicy="no-referrer"
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100 dark:from-stone-800 dark:to-stone-900 p-4 text-center">
            <ChefHat className="w-10 h-10 text-amber-500 mb-2 opacity-80" />
            <span className="text-xs font-medium text-stone-600 dark:text-stone-300 line-clamp-2">
              {recipe.title}
            </span>
          </div>
        )}

        {/* Favorite Button (Floating Top-Right) */}
        <div className="absolute top-3 right-3 z-10">
          <FavoriteButton recipeId={recipe.id} size="md" className="p-2" />
        </div>

        {/* Quick Difficulty Subtle Indicator */}
        <div className="absolute bottom-3 left-3 pointer-events-none">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold backdrop-blur-md bg-black/60 text-white">
            <Clock className="w-3 h-3 text-amber-400" />
            {recipe.totalTime || recipe.cookTime}m
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex flex-col flex-1 p-4 sm:p-5">
        {/* Unboxed Metadata (Zero-Pill Discipline) */}
        <div className="flex items-center gap-1.5 text-xs font-medium text-amber-700 dark:text-amber-400 mb-2">
          <span>{recipe.cuisine}</span>
          <span aria-hidden="true">·</span>
          <span>{recipe.category}</span>
          <span aria-hidden="true">·</span>
          <span className="text-stone-500 dark:text-stone-400">{recipe.difficulty}</span>
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100 leading-snug line-clamp-2 mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
          <Link to={`/recipe/${recipe.id}`} className="focus:outline-none focus-visible:underline">
            {recipe.title}
          </Link>
        </h3>

        {/* Description snippet */}
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 line-clamp-2 mb-4 flex-1">
          {recipe.description}
        </p>

        {/* Card Footer: Rating & Servings */}
        <div className="flex items-center justify-between pt-3 border-t border-stone-100 dark:border-stone-800 text-xs text-stone-500 dark:text-stone-400">
          <Rating value={recipe.rating} reviews={recipe.reviews} size="sm" />
          <span className="tabular-nums">
            {recipe.servings} servings
          </span>
        </div>
      </div>
    </article>
  );
}
