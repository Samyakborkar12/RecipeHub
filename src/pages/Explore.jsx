import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, X } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import RecipeGrid from '../components/RecipeGrid';
import { RECIPES } from '../data/recipes';

export default function Explore() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read initial params
  const initialQuery = searchParams.get('q') || '';
  const initialCategory = searchParams.get('category') || 'all';
  const initialDifficulty = searchParams.get('difficulty') || 'all';
  const initialMaxTime = searchParams.get('maxTime') ? Number(searchParams.get('maxTime')) : 'all';
  const initialMinRating = searchParams.get('minRating') ? Number(searchParams.get('minRating')) : 'all';
  const initialSort = searchParams.get('sort') || 'popular';

  const [query, setQuery] = useState(initialQuery);
  const [filters, setFilters] = useState({
    category: initialCategory,
    difficulty: initialDifficulty,
    maxTime: initialMaxTime,
    minRating: initialMinRating
  });
  const [sortBy, setSortBy] = useState(initialSort);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync state if URL search params change
  useEffect(() => {
    const qParam = searchParams.get('q');
    if (qParam !== null && qParam !== query) {
      setQuery(qParam);
    }
    const catParam = searchParams.get('category');
    if (catParam !== null && catParam !== filters.category) {
      setFilters(prev => ({ ...prev, category: catParam }));
    }
  }, [searchParams]);

  // Check if any filters are active
  const hasActiveFilters = useMemo(() => {
    return (
      query.trim() !== '' ||
      filters.category !== 'all' ||
      filters.difficulty !== 'all' ||
      filters.maxTime !== 'all' ||
      filters.minRating !== 'all'
    );
  }, [query, filters]);

  const handleResetFilters = () => {
    setQuery('');
    setFilters({
      category: 'all',
      difficulty: 'all',
      maxTime: 'all',
      minRating: 'all'
    });
    setSortBy('popular');
    setSearchParams({});
  };

  // Filtered and sorted recipes
  const filteredRecipes = useMemo(() => {
    return RECIPES.filter(recipe => {
      // 1. Search Query Match (Title, Ingredients, Category, Cuisine, Tags)
      if (query.trim()) {
        const q = query.toLowerCase().trim();
        const titleMatch = recipe.title.toLowerCase().includes(q);
        const descMatch = recipe.description.toLowerCase().includes(q);
        const categoryMatch = recipe.category.toLowerCase().includes(q);
        const cuisineMatch = recipe.cuisine.toLowerCase().includes(q);
        const tagsMatch = recipe.tags.some(tag => tag.toLowerCase().includes(q));
        const ingredientsMatch = recipe.ingredients.some(ing => ing.toLowerCase().includes(q));

        if (!titleMatch && !descMatch && !categoryMatch && !cuisineMatch && !tagsMatch && !ingredientsMatch) {
          return false;
        }
      }

      // 2. Category Filter
      if (filters.category !== 'all') {
        const cat = filters.category.toLowerCase();
        const matchesCategory =
          recipe.category.toLowerCase() === cat ||
          recipe.cuisine.toLowerCase() === cat ||
          recipe.tags.some(t => t.toLowerCase() === cat);
        if (!matchesCategory) return false;
      }

      // 3. Difficulty Filter
      if (filters.difficulty !== 'all') {
        if (recipe.difficulty.toLowerCase() !== filters.difficulty.toLowerCase()) {
          return false;
        }
      }

      // 4. Max Time Filter
      if (filters.maxTime !== 'all') {
        const total = recipe.totalTime || recipe.cookTime;
        if (total > Number(filters.maxTime)) {
          return false;
        }
      }

      // 5. Min Rating Filter
      if (filters.minRating !== 'all') {
        if (recipe.rating < Number(filters.minRating)) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'popular') {
        return (b.reviews || 0) - (a.reviews || 0);
      }
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      }
      if (sortBy === 'quickest') {
        return (a.totalTime || a.cookTime) - (b.totalTime || b.cookTime);
      }
      if (sortBy === 'newest') {
        return (b.id > a.id ? 1 : -1);
      }
      return 0;
    });
  }, [query, filters, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-stone-100 tracking-tight">
          Explore Recipes
        </h1>
        <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
          Search dishes across global cuisines, cooking times, and dietary preferences
        </p>
      </div>

      {/* Main Search Bar & Mobile Filter Trigger */}
      <div className="flex items-center gap-3 mb-8">
        <div className="flex-1">
          <SearchBar
            value={query}
            onChange={setQuery}
            onSearch={setQuery}
            placeholder="Search by recipe name, ingredient, category, or cuisine..."
            size="md"
          />
        </div>

        {/* Mobile Filter Button */}
        <button
          type="button"
          onClick={() => setMobileFilterOpen(true)}
          className="lg:hidden flex items-center gap-2 px-4 py-3 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 font-bold text-xs shadow-sm cursor-pointer"
        >
          <SlidersHorizontal className="w-4 h-4 text-amber-600" />
          <span>Filters</span>
          {hasActiveFilters && (
            <span className="w-2 h-2 rounded-full bg-amber-600" />
          )}
        </button>
      </div>

      {/* Layout Grid: Sidebar Filters + Main Recipe Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Desktop Left Sidebar Filters */}
        <aside className="hidden lg:block lg:col-span-4 xl:col-span-3 sticky top-24">
          <FilterPanel
            filters={filters}
            onChange={setFilters}
            onReset={handleResetFilters}
            hasActiveFilters={hasActiveFilters}
          />
        </aside>

        {/* Mobile Filter Modal */}
        {mobileFilterOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex justify-end bg-black/50 backdrop-blur-sm">
            <div className="w-full max-w-xs h-full bg-white dark:bg-stone-950 p-6 overflow-y-auto shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-stone-200 dark:border-stone-800 mb-6">
                <span className="font-bold text-lg text-stone-900 dark:text-stone-100">
                  Filters
                </span>
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 rounded-lg text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <FilterPanel
                filters={filters}
                onChange={setFilters}
                onReset={handleResetFilters}
                hasActiveFilters={hasActiveFilters}
                className="border-0 shadow-none p-0 bg-transparent"
              />

              <div className="mt-8 pt-4 border-t border-stone-200 dark:border-stone-800">
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(false)}
                  className="w-full py-3 rounded-xl bg-amber-600 text-white font-bold text-sm shadow-md"
                >
                  Apply Filters ({filteredRecipes.length} results)
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Right Content: Recipes Grid */}
        <main className="lg:col-span-8 xl:col-span-9">
          <RecipeGrid
            recipes={filteredRecipes}
            sortBy={sortBy}
            onSortChange={setSortBy}
            emptyTitle="No recipes found"
            emptyDescription="Try changing your filters or search something else."
            emptyActionText={hasActiveFilters ? "Clear All Filters" : "Browse All"}
            onEmptyAction={handleResetFilters}
          />
        </main>

      </div>
    </div>
  );
}
