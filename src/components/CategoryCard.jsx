import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export default function CategoryCard({ category, count, className = '' }) {
  if (!category) return null;

  return (
    <Link
      to={`/explore?category=${encodeURIComponent(category.name || category.id)}`}
      className={`group relative flex flex-col justify-between p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800/80 shadow-sm hover:shadow-md hover:border-amber-400/50 dark:hover:border-amber-600/50 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer ${className}`}
    >
      <div className="flex items-start justify-between mb-4">
        <span className="text-3xl sm:text-4xl filter drop-shadow-sm transition-transform duration-300 group-hover:scale-110">
          {category.icon || '🍽️'}
        </span>
        <div className="w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-400 group-hover:bg-amber-100 dark:group-hover:bg-amber-950/60 group-hover:text-amber-600 dark:group-hover:text-amber-400 flex items-center justify-center transition-colors">
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>

      <div>
        <h4 className="text-base font-bold text-stone-900 dark:text-stone-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
          {category.name}
        </h4>
        {category.description && (
          <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-1 mt-1">
            {category.description}
          </p>
        )}
        <div className="mt-3 text-xs font-medium text-stone-400 dark:text-stone-500">
          {count !== undefined ? `${count} recipes` : `${category.count || 0} recipes`}
        </div>
      </div>
    </Link>
  );
}
