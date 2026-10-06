import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  UtensilsCrossed, Plus, X, Sparkles, ChefHat, Check,
  AlertCircle, ArrowRight, Clock, Flame
} from 'lucide-react';
import { RECIPES } from '../data/recipes';
import FavoriteButton from '../components/FavoriteButton';
import Rating from '../components/Rating';

const POPULAR_PANTRY_ITEMS = [
  'Garlic', 'Onion', 'Tomato', 'Chicken', 'Eggs',
  'Cheese', 'Olive oil', 'Rice', 'Pasta', 'Butter',
  'Potato', 'Lemon', 'Broccoli', 'Ginger', 'Spinach'
];

export default function MyKitchen() {
  const [inputValue, setInputValue] = useState('');
  const [ingredients, setIngredients] = useState(() => {
    try {
      const saved = localStorage.getItem('recipehub_kitchen_ingredients');
      return saved ? JSON.parse(saved) : ['Tomato', 'Garlic', 'Olive oil'];
    } catch {
      return ['Tomato', 'Garlic', 'Olive oil'];
    }
  });

  // Save pantry ingredients to localStorage
  const saveIngredients = (newIngredients) => {
    setIngredients(newIngredients);
    try {
      localStorage.setItem('recipehub_kitchen_ingredients', JSON.stringify(newIngredients));
    } catch (e) {
      console.warn('Could not save ingredients', e);
    }
  };

  // Add one or multiple ingredients (handles commas)
  const handleAddIngredients = (rawString) => {
    if (!rawString || !rawString.trim()) return;

    const items = rawString
      .split(',')
      .map(item => item.trim())
      .filter(item => item.length > 0);

    const updated = [...ingredients];
    items.forEach(item => {
      // Avoid duplicate case-insensitive
      const exists = updated.some(existing => existing.toLowerCase() === item.toLowerCase());
      if (!exists) {
        updated.push(item);
      }
    });

    saveIngredients(updated);
    setInputValue('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddIngredients(inputValue);
    }
  };

  const handleRemove = (itemToRemove) => {
    const updated = ingredients.filter(
      item => item.toLowerCase() !== itemToRemove.toLowerCase()
    );
    saveIngredients(updated);
  };

  const handleClearAll = () => {
    saveIngredients([]);
  };

  // Ingredient matcher algorithm:
  // Normalizes strings, checks substrings or stem tokens
  const normalize = (text) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .trim();
  };

  const matches = useMemo(() => {
    if (ingredients.length === 0) return [];

    const userTerms = ingredients.map(ing => normalize(ing));

    return RECIPES.map(recipe => {
      let matchedCount = 0;
      const matchedIngredients = [];
      const missingIngredients = [];

      recipe.ingredients.forEach(rawIng => {
        const normalizedRecipeIng = normalize(rawIng);
        // Check if any of the user's entered ingredients match this recipe ingredient
        const isMatched = userTerms.some(term => {
          if (!term) return false;
          // check if term is inside ingredient string or vice versa
          return normalizedRecipeIng.includes(term) || term.includes(normalizedRecipeIng);
        });

        if (isMatched) {
          matchedCount++;
          matchedIngredients.push(rawIng);
        } else {
          missingIngredients.push(rawIng);
        }
      });

      const totalIngredients = recipe.ingredients.length;
      const matchPercentage = Math.round((matchedCount / totalIngredients) * 100);

      return {
        recipe,
        matchedCount,
        totalIngredients,
        matchPercentage,
        matchedIngredients,
        missingIngredients
      };
    })
    // Only show recipes with at least 1 match
    .filter(item => item.matchedCount > 0)
    // Sort descending by match percentage and count
    .sort((a, b) => b.matchPercentage - a.matchPercentage || b.matchedCount - a.matchedCount);
  }, [ingredients]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      
      {/* Page Title & Intro */}
      <div className="max-w-2xl text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>Smart Pantry Chef</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-stone-100 tracking-tight">
          What's in your kitchen?
        </h1>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 mt-2">
          Tell us what ingredients you have and we'll find recipes you can make.
        </p>
      </div>

      {/* Ingredient Input Box & Chips Area */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-6">
        
        {/* Input Bar */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="e.g. Tomato, onion, potato, cheese (press Enter)"
              aria-label="Add ingredients"
              className="w-full px-4 py-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm sm:text-base"
            />
          </div>
          <button
            type="button"
            onClick={() => handleAddIngredients(inputValue)}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-amber-600 hover:bg-amber-700 active:scale-95 text-white font-bold text-sm shadow-sm transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Ingredient</span>
          </button>
        </div>

        {/* Quick Add Suggestions */}
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-stone-400 block mb-2.5">
            Quick Add Common Pantry Staples:
          </span>
          <div className="flex flex-wrap gap-2">
            {POPULAR_PANTRY_ITEMS.map(staple => {
              const alreadyAdded = ingredients.some(
                ing => ing.toLowerCase() === staple.toLowerCase()
              );
              return (
                <button
                  key={staple}
                  type="button"
                  onClick={() => !alreadyAdded && handleAddIngredients(staple)}
                  disabled={alreadyAdded}
                  className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                    alreadyAdded
                      ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 opacity-60 cursor-default'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-amber-100 dark:hover:bg-amber-900/40 hover:text-amber-800 dark:hover:text-amber-300'
                  }`}
                >
                  <Plus className="w-3 h-3" />
                  <span>{staple}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Current Active Ingredients Chips */}
        {ingredients.length > 0 ? (
          <div className="pt-4 border-t border-stone-100 dark:border-stone-800">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400">
                In Your Kitchen ({ingredients.length} items):
              </span>
              <button
                type="button"
                onClick={handleClearAll}
                className="text-xs font-semibold text-rose-600 dark:text-rose-400 hover:underline cursor-pointer"
              >
                Clear all
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {ingredients.map((item, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-2 pl-3.5 pr-2 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200/80 dark:border-amber-800/80 text-amber-900 dark:text-amber-200 text-sm font-semibold shadow-2xs"
                >
                  <span>{item}</span>
                  <button
                    type="button"
                    onClick={() => handleRemove(item)}
                    aria-label={`Remove ${item}`}
                    className="p-1 rounded-lg text-amber-700 dark:text-amber-400 hover:bg-amber-200/60 dark:hover:bg-amber-900/60 transition-colors cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        ) : (
          <div className="pt-4 border-t border-stone-100 dark:border-stone-800 text-center py-6 text-stone-400 text-sm">
            No ingredients added yet. Type your kitchen items above or click the quick-add buttons!
          </div>
        )}
      </div>

      {/* Results Header */}
      <div>
        <div className="flex items-center justify-between pb-4 border-b border-stone-200/80 dark:border-stone-800/80 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100">
              Matching Recipes
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
              Ordered by highest percentage of ingredients you already have
            </p>
          </div>
          {matches.length > 0 && (
            <span className="text-xs sm:text-sm font-semibold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-3 py-1 rounded-xl">
              {matches.length} recipes found
            </span>
          )}
        </div>

        {/* Results List or Empty State */}
        {ingredients.length === 0 ? (
          <div className="text-center py-16 p-8 rounded-3xl bg-white/60 dark:bg-stone-900/40 border border-dashed border-stone-200 dark:border-stone-800 max-w-lg mx-auto">
            <UtensilsCrossed className="w-12 h-12 text-amber-500 mx-auto mb-3 opacity-80" />
            <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 mb-1">
              Your pantry is empty
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mb-4">
              Add a few ingredients you have on hand like onions, garlic, pasta, or tomatoes to discover matching recipes.
            </p>
          </div>
        ) : matches.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matches.map(({ recipe, matchedCount, totalIngredients, matchPercentage, missingIngredients }) => (
              <div
                key={recipe.id}
                className="flex flex-col bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800/80 overflow-hidden shadow-sm hover:shadow-md transition-all group"
              >
                {/* Image Banner */}
                <div className="relative aspect-[16/10] overflow-hidden bg-stone-100 dark:bg-stone-800">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3">
                    <FavoriteButton recipeId={recipe.id} size="md" className="p-2" />
                  </div>

                  {/* Match Percentage Badge */}
                  <div className="absolute top-3 left-3">
                    <span className={`inline-flex items-center px-3 py-1 rounded-xl text-xs font-black shadow-md ${
                      matchPercentage >= 70
                        ? 'bg-emerald-600 text-white'
                        : matchPercentage >= 40
                        ? 'bg-amber-500 text-white'
                        : 'bg-stone-900/80 text-white'
                    }`}>
                      {matchPercentage}% match
                    </span>
                  </div>

                  {/* Time Badge */}
                  <div className="absolute bottom-3 left-3">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold backdrop-blur-md bg-black/60 text-white">
                      <Clock className="w-3 h-3 text-amber-400" />
                      {recipe.totalTime || recipe.cookTime}m
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    {/* Match ratio callout */}
                    <div className="flex items-center justify-between text-xs font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                      <span className="flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" />
                        {matchedCount} of {totalIngredients} ingredients available
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors line-clamp-1">
                      <Link to={`/recipe/${recipe.id}`}>
                        {recipe.title}
                      </Link>
                    </h3>

                    <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-2 mt-1.5">
                      {recipe.description}
                    </p>
                  </div>

                  {/* Missing ingredients preview */}
                  {missingIngredients.length > 0 && (
                    <div className="pt-3 border-t border-stone-100 dark:border-stone-800 text-[11px] text-stone-500 dark:text-stone-400">
                      <span className="font-semibold text-stone-700 dark:text-stone-300">Missing: </span>
                      <span>
                        {missingIngredients.slice(0, 2).map(i => i.split(',')[0]).join(', ')}
                        {missingIngredients.length > 2 && ` +${missingIngredients.length - 2} more`}
                      </span>
                    </div>
                  )}

                  {/* Cook Button */}
                  <Link
                    to={`/recipe/${recipe.id}`}
                    className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-bold bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 group-hover:bg-amber-600 group-hover:text-white transition-colors cursor-pointer"
                  >
                    <span>View Recipe & Steps</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 max-w-lg mx-auto">
            <AlertCircle className="w-10 h-10 text-amber-500 mx-auto mb-2" />
            <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
              No matching recipes found
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 mb-4">
              Try adding more standard staples like onion, garlic, rice, tomatoes, or oil.
            </p>
          </div>
        )}
      </div>

    </div>
  );
}
