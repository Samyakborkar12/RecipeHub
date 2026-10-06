import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, Flame, Clock, Utensils, HeartHandshake, ChefHat } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import RecipeCard from '../components/RecipeCard';
import CategoryCard from '../components/CategoryCard';
import { RECIPES, CATEGORIES, MOODS } from '../data/recipes';
import heroBanner from '../assets/images/hero_recipehub_banner_1791247316386.jpg';

export default function Home() {
  const navigate = useNavigate();
  const [selectedMood, setSelectedMood] = useState('Comfort Food');

  // Popular 8 categories specified in user brief
  const popularCategoryNames = [
    'Indian', 'Italian', 'Asian', 'Mexican',
    'Healthy', 'Desserts', 'Breakfast', 'Quick & Easy'
  ];
  const popularCategories = CATEGORIES.filter(c => popularCategoryNames.includes(c.name));

  // Trending recipes (highest ratings & reviews)
  const trendingRecipes = [...RECIPES]
    .sort((a, b) => b.rating - a.rating || b.reviews - a.reviews)
    .slice(0, 6);

  // Quick & Easy recipes (totalTime <= 30 mins)
  const quickAndEasyRecipes = RECIPES
    .filter(r => (r.totalTime || r.cookTime) <= 30)
    .slice(0, 4);

  // Mood recipes based on selected tab
  const moodRecipes = RECIPES
    .filter(r => r.mood === selectedMood || r.tags.includes(selectedMood))
    .slice(0, 4);

  const handleHeroSearch = (query) => {
    if (query && query.trim()) {
      navigate(`/explore?q=${encodeURIComponent(query.trim())}`);
    } else {
      navigate('/explore');
    }
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-12">
      {/* 1. Hero Section */}
      <section className="relative pt-6 sm:pt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Heading & Search */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/80 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Over 30 chef-curated culinary recipes</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-stone-900 dark:text-stone-100 tracking-tight leading-[1.1] text-balance">
                What are you craving today?
              </h1>

              <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 max-w-xl leading-relaxed">
                Discover delicious recipes, find inspiration, and cook something amazing.
              </p>

              {/* Working Search Bar */}
              <div className="pt-2 max-w-xl">
                <SearchBar
                  size="lg"
                  onSearch={handleHeroSearch}
                  autoNavigate={true}
                  placeholder="Search recipes, ingredients, cuisines..."
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  to="/explore"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-amber-600 hover:bg-amber-700 active:scale-95 transition-all shadow-md hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                >
                  <span>Explore Recipes</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/kitchen"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-stone-700 dark:text-stone-200 bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 active:scale-95 transition-all"
                >
                  <Utensils className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span>Cook with What You Have</span>
                </Link>
              </div>

              {/* Quick stats unboxed */}
              <div className="pt-4 flex items-center gap-6 text-xs text-stone-500 dark:text-stone-400">
                <span className="flex items-center gap-1.5">
                  <strong className="text-stone-800 dark:text-stone-200 font-bold">100%</strong> Tested recipes
                </span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1.5">
                  <strong className="text-stone-800 dark:text-stone-200 font-bold">15+</strong> World cuisines
                </span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1.5">
                  <strong className="text-stone-800 dark:text-stone-200 font-bold">No</strong> Sign-up required
                </span>
              </div>
            </div>

            {/* Right Column: Hero Visual Food Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-stone-200/60 dark:border-stone-800/80 aspect-[4/3] lg:aspect-square">
                <img
                  src={heroBanner}
                  alt="Delicious artisanal dining table spread with freshly cooked gourmet dishes"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                
                {/* Floating highlight card on hero banner */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border border-stone-100 dark:border-stone-800 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                        Featured Favorite
                      </span>
                      <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                        Authentic Butter Chicken (Murgh Makhani)
                      </h4>
                    </div>
                    <Link
                      to="/recipe/butter-chicken-delight"
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-600 text-white hover:bg-amber-700 transition-colors"
                    >
                      Cook Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Popular Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-stone-100 tracking-tight">
              Popular Categories
            </h2>
            <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
              Explore by cultural flavors and daily cooking styles
            </p>
          </div>
          <Link
            to="/categories"
            className="group flex items-center gap-1 text-sm font-bold text-amber-600 dark:text-amber-400 hover:text-amber-700 transition-colors"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
          {popularCategories.map((cat) => (
            <Link
              key={cat.id}
              to={`/explore?category=${encodeURIComponent(cat.name)}`}
              className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800/80 shadow-sm hover:shadow-md hover:border-amber-400 dark:hover:border-amber-500 hover:-translate-y-1 transition-all group text-center cursor-pointer"
            >
              <span className="text-3xl mb-2 filter drop-shadow-sm group-hover:scale-110 transition-transform">
                {cat.icon}
              </span>
              <span className="text-xs sm:text-sm font-bold text-stone-800 dark:text-stone-200 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                {cat.name}
              </span>
              <span className="text-[11px] text-stone-400 dark:text-stone-500 mt-0.5">
                {cat.count} recipes
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Trending Recipes */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 flex items-center justify-center">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-stone-100 tracking-tight">
                Trending Recipes
              </h2>
              <p className="text-sm text-stone-500 dark:text-stone-400">
                Community favorites with top ratings and rave reviews
              </p>
            </div>
          </div>

          <Link
            to="/explore?sort=popular"
            className="group hidden sm:flex items-center gap-1 text-sm font-bold text-amber-600 dark:text-amber-400 hover:text-amber-700 transition-colors"
          >
            <span>See More</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingRecipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </section>

      {/* 4. Quick & Easy (30 minutes or less) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-stone-100 tracking-tight">
                Quick & Easy
              </h2>
              <p className="text-sm text-stone-500 dark:text-stone-400">
                Gourmet homemade meals on your table in 30 minutes or less
              </p>
            </div>
          </div>

          <Link
            to="/explore?maxTime=30"
            className="group flex items-center gap-1 text-sm font-bold text-amber-600 dark:text-amber-400 hover:text-amber-700 transition-colors"
          >
            <span>All Quick Meals</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickAndEasyRecipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </section>

      {/* 5. Mood-Based Cooking */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            Flavor Inspirations
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-stone-100 tracking-tight mt-1">
            What are you in the mood for?
          </h2>
          <p className="text-sm text-stone-500 dark:text-stone-400 mt-2">
            Match your appetite with dishes tuned to how you want to feel
          </p>
        </div>

        {/* Mood Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8">
          {MOODS.map(mood => (
            <button
              key={mood.id}
              type="button"
              onClick={() => setSelectedMood(mood.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                selectedMood === mood.id
                  ? 'bg-amber-600 text-white shadow-md scale-105'
                  : 'bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 border border-stone-200/80 dark:border-stone-800/80 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              <span className="text-base">{mood.emoji}</span>
              <span>{mood.label}</span>
            </button>
          ))}
        </div>

        {/* Mood Filtered Recipe Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {moodRecipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </section>

      {/* 6. Smart Feature Callout: My Kitchen */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-amber-600 to-orange-600 text-white p-8 sm:p-12 shadow-xl">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold">
              <ChefHat className="w-3.5 h-3.5" />
              <span>Smart Pantry Cooking Assistant</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              What's in your kitchen right now?
            </h3>
            <p className="text-sm sm:text-base text-amber-100 leading-relaxed">
              Don't let ingredients go to waste. Tell us what you have in your fridge (like tomato, onion, cheese, or eggs) and we'll instantly find delicious recipes with matching percentages!
            </p>
            <div className="pt-2">
              <Link
                to="/kitchen"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold bg-white text-stone-900 hover:bg-amber-50 active:scale-95 transition-all shadow-md"
              >
                <span>Try My Kitchen</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
