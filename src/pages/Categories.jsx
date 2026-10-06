import React from 'react';
import CategoryCard from '../components/CategoryCard';
import { CATEGORIES, RECIPES } from '../data/recipes';

export default function Categories() {
  // Compute dynamic recipe counts for each category
  const categoriesWithCounts = CATEGORIES.map(cat => {
    const matchingCount = RECIPES.filter(r => {
      const target = cat.name.toLowerCase();
      return (
        r.category.toLowerCase() === target ||
        r.cuisine.toLowerCase() === target ||
        r.tags.some(t => t.toLowerCase() === target)
      );
    }).length;

    return {
      ...cat,
      calculatedCount: matchingCount
    };
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Page Header */}
      <div className="text-left mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-stone-100 tracking-tight">
          Browse Categories
        </h1>
        <p className="text-sm sm:text-base text-stone-500 dark:text-stone-400 mt-2 max-w-2xl">
          Dive into regional culinary traditions, everyday meal categories, and diet-friendly collections.
        </p>
      </div>

      {/* Grid of 15 Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5 sm:gap-6">
        {categoriesWithCounts.map(cat => (
          <CategoryCard
            key={cat.id}
            category={cat}
            count={cat.calculatedCount}
          />
        ))}
      </div>
    </div>
  );
}
