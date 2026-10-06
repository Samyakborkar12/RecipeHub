import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Clock, Users, ChefHat, Sparkles, ArrowLeft,
  CheckCircle2, Circle, Flame, Minus, Plus, Share2, Check
} from 'lucide-react';
import FavoriteButton from '../components/FavoriteButton';
import Rating from '../components/Rating';
import RecipeCard from '../components/RecipeCard';
import { RECIPES } from '../data/recipes';

export default function RecipeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);
  const [checkedIngredients, setCheckedIngredients] = useState({});
  const [completedSteps, setCompletedSteps] = useState({});
  const [copied, setCopied] = useState(false);

  const recipe = RECIPES.find(r => r.id === id);

  // Dynamic Servings state (default to recipe's base servings)
  const baseServings = recipe?.servings || 4;
  const [servings, setServings] = useState(baseServings);

  if (!recipe) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto mb-4">
          <ChefHat className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-2">
          Recipe Not Found
        </h1>
        <p className="text-sm text-stone-600 dark:text-stone-400 mb-6">
          We couldn't find the recipe you're looking for. It may have been relocated or updated.
        </p>
        <Link
          to="/explore"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-amber-600 hover:bg-amber-700 transition-colors shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Browse All Recipes</span>
        </Link>
      </div>
    );
  }

  // Related recipes: same cuisine or category (excluding current recipe)
  const relatedRecipes = RECIPES
    .filter(r => r.id !== recipe.id && (r.category === recipe.category || r.cuisine === recipe.cuisine))
    .slice(0, 3);

  const toggleIngredientCheck = (idx) => {
    setCheckedIngredients(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const toggleStepCheck = (idx) => {
    setCompletedSteps(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleShare = () => {
    try {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const scaleFactor = servings / baseServings;

  // Helper to scale quantities in ingredient strings (e.g. "2 tomatoes" -> "4 tomatoes")
  const scaleIngredient = (ingredientStr) => {
    if (scaleFactor === 1) return ingredientStr;

    // Match leading integer or decimal or fraction
    return ingredientStr.replace(/^(\d+(\.\d+)?|\d+\/\d+)/, (match) => {
      let num = 0;
      if (match.includes('/')) {
        const [numerator, denominator] = match.split('/');
        num = Number(numerator) / Number(denominator);
      } else {
        num = parseFloat(match);
      }
      const scaled = num * scaleFactor;
      // Round to 1 decimal place if needed
      return Number.isInteger(scaled) ? scaled.toString() : scaled.toFixed(1);
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-10">
      
      {/* Back navigation & Actions Bar */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to recipes</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Share Button */}
          <button
            type="button"
            onClick={handleShare}
            aria-label="Share recipe"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer shadow-sm"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>Share</span>
              </>
            )}
          </button>

          {/* Favorite Button */}
          <FavoriteButton recipeId={recipe.id} size="lg" className="p-2 border border-stone-200/80 dark:border-stone-800/80" />
        </div>
      </div>

      {/* Main Recipe Header Area */}
      <div className="space-y-4">
        {/* Zero-Pill Unboxed Metadata */}
        <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-semibold text-amber-700 dark:text-amber-400">
          <span>{recipe.cuisine} Cuisine</span>
          <span aria-hidden="true">·</span>
          <span>{recipe.category}</span>
          <span aria-hidden="true">·</span>
          <span className="text-stone-500 dark:text-stone-400">{recipe.difficulty} Difficulty</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 dark:text-stone-100 tracking-tight leading-tight">
          {recipe.title}
        </h1>

        <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 leading-relaxed max-w-3xl">
          {recipe.description}
        </p>

        {/* Rating and Reviews */}
        <div className="flex items-center gap-4 pt-1">
          <Rating value={recipe.rating} reviews={recipe.reviews} size="md" />
          <span className="text-stone-300 dark:text-stone-700">|</span>
          <span className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
            Mood: <strong className="text-stone-700 dark:text-stone-300 font-semibold">{recipe.mood}</strong>
          </span>
        </div>
      </div>

      {/* Large Food Photography Hero */}
      <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden shadow-xl border border-stone-200/80 dark:border-stone-800 bg-stone-100 dark:bg-stone-800">
        {!imageError ? (
          <img
            src={recipe.image}
            alt={recipe.title}
            onError={() => setImageError(true)}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-stone-100 dark:bg-stone-900 p-8 text-center">
            <ChefHat className="w-16 h-16 text-amber-500 mb-3 opacity-70" />
            <span className="text-base font-bold text-stone-800 dark:text-stone-200">
              {recipe.title}
            </span>
          </div>
        )}
      </div>

      {/* Quick Stats Grid: Times & Servings */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-sm">
        <div className="flex flex-col items-center text-center p-2">
          <span className="text-xs text-stone-400 uppercase tracking-wider font-semibold">Prep Time</span>
          <span className="text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-100 tabular-nums mt-1">
            {recipe.prepTime} mins
          </span>
        </div>

        <div className="flex flex-col items-center text-center p-2 border-l border-stone-100 dark:border-stone-800">
          <span className="text-xs text-stone-400 uppercase tracking-wider font-semibold">Cook Time</span>
          <span className="text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-100 tabular-nums mt-1">
            {recipe.cookTime} mins
          </span>
        </div>

        <div className="flex flex-col items-center text-center p-2 sm:border-l border-stone-100 dark:border-stone-800">
          <span className="text-xs text-stone-400 uppercase tracking-wider font-semibold">Total Time</span>
          <span className="text-lg sm:text-xl font-bold text-amber-600 dark:text-amber-400 tabular-nums mt-1">
            {recipe.totalTime || recipe.cookTime} mins
          </span>
        </div>

        <div className="flex flex-col items-center text-center p-2 border-l border-stone-100 dark:border-stone-800">
          <span className="text-xs text-stone-400 uppercase tracking-wider font-semibold">Difficulty</span>
          <span className="text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-100 mt-1">
            {recipe.difficulty}
          </span>
        </div>
      </div>

      {/* Main 2-Column Split: Ingredients & Servings Scaler (Left) vs Instructions & Nutrition (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left Column: Ingredients with Servings Scaler */}
        <section className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100 dark:border-stone-800">
              <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100">
                Ingredients
              </h2>

              {/* Servings Scaler Controls */}
              <div className="flex items-center gap-2 bg-stone-100 dark:bg-stone-800 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setServings(prev => Math.max(1, prev - 1))}
                  aria-label="Decrease servings"
                  className="w-7 h-7 flex items-center justify-center rounded-lg bg-white dark:bg-stone-700 text-stone-700 dark:text-stone-200 shadow-xs hover:bg-stone-50 cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="text-xs font-bold text-stone-800 dark:text-stone-200 px-1 tabular-nums whitespace-nowrap">
                  {servings} servings
                </span>
                <button
                  type="button"
                  onClick={() => setServings(prev => Math.min(12, prev + 1))}
                  aria-label="Increase servings"
                  className="w-7 h-7 flex items-center justify-center rounded-lg bg-white dark:bg-stone-700 text-stone-700 dark:text-stone-200 shadow-xs hover:bg-stone-50 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <p className="text-xs text-stone-400">
              Check off ingredients as you prepare them in your kitchen.
            </p>

            {/* Ingredients Checklist */}
            <ul className="space-y-3">
              {recipe.ingredients.map((ing, idx) => {
                const isChecked = !!checkedIngredients[idx];
                return (
                  <li
                    key={idx}
                    onClick={() => toggleIngredientCheck(idx)}
                    className="flex items-start gap-3 text-sm cursor-pointer group select-none"
                  >
                    <div className="mt-0.5 shrink-0 text-stone-400 group-hover:text-amber-600 transition-colors">
                      {isChecked ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-100 dark:fill-emerald-950" />
                      ) : (
                        <Circle className="w-4 h-4" />
                      )}
                    </div>
                    <span
                      className={`leading-relaxed transition-colors ${
                        isChecked
                          ? 'line-through text-stone-400 dark:text-stone-500'
                          : 'text-stone-800 dark:text-stone-200 group-hover:text-stone-900'
                      }`}
                    >
                      {scaleIngredient(ing)}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Nutrition Card */}
          <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-600" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100">
                Nutrition per Serving
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/50">
                <span className="text-xs text-stone-400 block font-medium">Calories</span>
                <span className="text-base font-bold text-stone-900 dark:text-stone-100 tabular-nums">
                  {recipe.calories} kcal
                </span>
              </div>
              <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/50">
                <span className="text-xs text-stone-400 block font-medium">Protein</span>
                <span className="text-base font-bold text-stone-900 dark:text-stone-100 tabular-nums">
                  {recipe.protein}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/50">
                <span className="text-xs text-stone-400 block font-medium">Carbohydrates</span>
                <span className="text-base font-bold text-stone-900 dark:text-stone-100 tabular-nums">
                  {recipe.carbs}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/50">
                <span className="text-xs text-stone-400 block font-medium">Fat</span>
                <span className="text-base font-bold text-stone-900 dark:text-stone-100 tabular-nums">
                  {recipe.fat}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Right Column: Step-by-Step Cooking Instructions */}
        <section className="lg:col-span-7 space-y-6">
          <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100 dark:border-stone-800">
              <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">
                Cooking Instructions
              </h2>
              <span className="text-xs text-stone-500 font-semibold tabular-nums">
                {recipe.instructions.length} steps
              </span>
            </div>

            <ol className="space-y-6">
              {recipe.instructions.map((step, idx) => {
                const isStepDone = !!completedSteps[idx];
                return (
                  <li
                    key={idx}
                    onClick={() => toggleStepCheck(idx)}
                    className="flex items-start gap-4 p-4 rounded-xl transition-all cursor-pointer group hover:bg-stone-50 dark:hover:bg-stone-800/40"
                  >
                    {/* Step Number Circle */}
                    <div
                      className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                        isStepDone
                          ? 'bg-emerald-600 text-white'
                          : 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 group-hover:bg-amber-600 group-hover:text-white'
                      }`}
                    >
                      {isStepDone ? <Check className="w-4 h-4" /> : idx + 1}
                    </div>

                    <div className="flex-1">
                      <p
                        className={`text-sm sm:text-base leading-relaxed transition-colors ${
                          isStepDone
                            ? 'line-through text-stone-400 dark:text-stone-500'
                            : 'text-stone-800 dark:text-stone-200'
                        }`}
                      >
                        {step}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

      </div>

      {/* Related Recipes Section */}
      {relatedRecipes.length > 0 && (
        <section className="pt-10 border-t border-stone-200/80 dark:border-stone-800 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-stone-900 dark:text-stone-100">
                You Might Also Like
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
                More delicious dishes from {recipe.cuisine} and {recipe.category}
              </p>
            </div>
            <Link
              to={`/explore?category=${encodeURIComponent(recipe.category)}`}
              className="text-xs sm:text-sm font-bold text-amber-600 dark:text-amber-400 hover:text-amber-700"
            >
              See all
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedRecipes.map(related => (
              <RecipeCard key={related.id} recipe={related} />
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
