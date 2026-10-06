import React from 'react';
import { ChefHat } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function EmptyState({
  icon: Icon = ChefHat,
  title = 'No recipes found',
  description = 'Try changing your filters or search something else.',
  actionText,
  actionTo,
  onAction,
  className = ''
}) {
  return (
    <div className={`flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-2xl border border-dashed border-stone-200 dark:border-stone-800 bg-white/50 dark:bg-stone-900/40 max-w-lg mx-auto ${className}`}>
      <div className="w-16 h-16 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-2">
        {title}
      </h3>
      <p className="text-sm text-stone-600 dark:text-stone-400 mb-6 max-w-sm">
        {description}
      </p>

      {actionText && (
        actionTo ? (
          <Link
            to={actionTo}
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-amber-600 hover:bg-amber-700 active:scale-95 transition-all shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
          >
            {actionText}
          </Link>
        ) : (
          <button
            type="button"
            onClick={onAction}
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-amber-600 hover:bg-amber-700 active:scale-95 transition-all shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 cursor-pointer"
          >
            {actionText}
          </button>
        )
      )}
    </div>
  );
}
