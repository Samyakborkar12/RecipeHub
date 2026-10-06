import React from 'react';
import { Filter, RotateCcw, X, Check } from 'lucide-react';
import { CATEGORIES } from '../data/recipes';

export default function FilterPanel({
  filters,
  onChange,
  onReset,
  hasActiveFilters,
  className = ''
}) {
  const difficulties = ['All', 'Easy', 'Medium', 'Hard'];
  const maxTimes = [
    { label: 'Any Time', value: 'all' },
    { label: '≤ 15 mins', value: 15 },
    { label: '≤ 30 mins', value: 30 },
    { label: '≤ 45 mins', value: 45 },
    { label: '≤ 60 mins', value: 60 }
  ];
  const ratings = [
    { label: 'Any Rating', value: 'all' },
    { label: '★ 4.0+', value: 4.0 },
    { label: '★ 4.5+', value: 4.5 },
    { label: '★ 4.8+', value: 4.8 }
  ];

  return (
    <div className={`bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800/80 rounded-2xl p-5 shadow-sm ${className}`}>
      <div className="flex items-center justify-between pb-4 border-b border-stone-100 dark:border-stone-800 mb-5">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-amber-600 dark:text-amber-500" />
          <h2 className="text-sm font-bold tracking-tight text-stone-900 dark:text-stone-100 uppercase">
            Filter Recipes
          </h2>
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={onReset}
            className="flex items-center gap-1 text-xs font-semibold text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Clear Filters
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* Category Filter */}
        <div>
          <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-2.5">
            Category
          </label>
          <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto pr-1">
            <button
              type="button"
              onClick={() => onChange({ ...filters, category: 'all' })}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                filters.category === 'all'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
              }`}
            >
              All Categories
            </button>
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                type="button"
                onClick={() => onChange({ ...filters, category: cat.name })}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  filters.category === cat.name
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Difficulty Filter */}
        <div>
          <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-2.5">
            Difficulty
          </label>
          <div className="grid grid-cols-4 gap-1.5">
            {difficulties.map(diff => (
              <button
                key={diff}
                type="button"
                onClick={() => onChange({ ...filters, difficulty: diff.toLowerCase() })}
                className={`py-1.5 px-2 text-center rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  filters.difficulty === diff.toLowerCase()
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>

        {/* Max Cooking Time */}
        <div>
          <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-2.5">
            Maximum Cook Time
          </label>
          <div className="grid grid-cols-2 gap-1.5">
            {maxTimes.map(t => (
              <button
                key={t.value}
                type="button"
                onClick={() => onChange({ ...filters, maxTime: t.value })}
                className={`py-1.5 px-2 text-center rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  filters.maxTime === t.value
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Minimum Rating */}
        <div>
          <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-2.5">
            Minimum Rating
          </label>
          <div className="grid grid-cols-2 gap-1.5">
            {ratings.map(r => (
              <button
                key={r.value}
                type="button"
                onClick={() => onChange({ ...filters, minRating: r.value })}
                className={`py-1.5 px-2 text-center rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  filters.minRating === r.value
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
