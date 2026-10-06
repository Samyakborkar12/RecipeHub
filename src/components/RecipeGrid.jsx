import React from 'react';
import RecipeCard from './RecipeCard';
import EmptyState from './EmptyState';
import { ArrowUpDown } from 'lucide-react';

export default function RecipeGrid({
  recipes = [],
  sortBy,
  onSortChange,
  emptyTitle = 'No recipes found',
  emptyDescription = 'Try changing your filters or search something else.',
  emptyActionText,
  onEmptyAction,
  className = ''
}) {
  const sortOptions = [
    { label: 'Popular', value: 'popular' },
    { label: 'Highest Rated', value: 'rating' },
    { label: 'Quickest', value: 'quickest' },
    { label: 'Newest', value: 'newest' }
  ];

  if (!recipes || recipes.length === 0) {
    return (
      <EmptyState
        title={emptyTitle}
        description={emptyDescription}
        actionText={emptyActionText}
        onAction={onEmptyAction}
        className={className}
      />
    );
  }

  return (
    <div className={`space-y-5 ${className}`}>
      {/* Grid Top Header: Count & Sorting */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-stone-200/60 dark:border-stone-800/60">
        <p className="text-xs sm:text-sm font-medium text-stone-500 dark:text-stone-400">
          Showing <span className="font-bold text-stone-900 dark:text-stone-100 tabular-nums">{recipes.length}</span> delicious recipes
        </p>

        {onSortChange && (
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <span className="text-xs font-medium text-stone-500 dark:text-stone-400 flex items-center gap-1">
              <ArrowUpDown className="w-3.5 h-3.5" />
              Sort:
            </span>
            <select
              value={sortBy}
              aria-label="Sort recipes by"
              onChange={(e) => onSortChange(e.target.value)}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
            >
              {sortOptions.map(opt => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5 sm:gap-6">
        {recipes.map(recipe => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}
