import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-stone-200/80 dark:border-stone-800/80 bg-stone-50 dark:bg-stone-950 mt-16 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-8 border-b border-stone-200/60 dark:border-stone-800/60">
          <div>
            <Link to="/" className="inline-block mb-2">
              <span className="text-2xl font-black text-stone-900 dark:text-stone-100">
                RecipeHub <span className="text-2xl">🍳</span>
              </span>
            </Link>
            <p className="text-sm font-semibold text-amber-600 dark:text-amber-500">
              Discover. Cook. Enjoy.
            </p>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 max-w-sm">
              Your modern culinary companion for delicious discovery, smart pantry cooking, and kitchen inspiration.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-stone-600 dark:text-stone-400">
            <Link to="/" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
              Home
            </Link>
            <Link to="/explore" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
              Explore
            </Link>
            <Link to="/categories" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
              Categories
            </Link>
            <Link to="/kitchen" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
              My Kitchen
            </Link>
            <Link to="/favorites" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
              Favorites
            </Link>
            <Link to="/settings" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
              Settings
            </Link>
          </nav>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 dark:text-stone-400">
          <p>
            © {currentYear} RecipeHub. All rights reserved. Crafted for food lovers everywhere.
          </p>
          <div className="flex items-center gap-1">
            <span>Cooked with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>and passion</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
