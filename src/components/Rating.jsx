import React from 'react';
import { Star } from 'lucide-react';

export default function Rating({ value = 5, reviews, size = 'sm', showNumber = true, className = '' }) {
  const rounded = Math.round(value * 10) / 10;

  const starSize = size === 'xs' ? 'w-3.5 h-3.5' : size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';

  return (
    <div className={`inline-flex items-center gap-1.5 ${className}`}>
      <div className="flex items-center text-amber-500">
        <Star className={`${starSize} fill-amber-400 text-amber-400`} />
      </div>
      {showNumber && (
        <span className="text-xs font-semibold text-stone-800 dark:text-stone-200 tabular-nums">
          {rounded.toFixed(1)}
        </span>
      )}
      {reviews !== undefined && (
        <span className="text-xs text-stone-500 dark:text-stone-400 tabular-nums">
          ({reviews})
        </span>
      )}
    </div>
  );
}
