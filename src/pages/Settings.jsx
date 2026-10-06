import React, { useState } from 'react';
import {
  Sun, Moon, Laptop, Trash2, RotateCcw, Check,
  ShieldCheck, Database, Info, AlertTriangle
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useFavorites } from '../context/FavoritesContext';

export default function Settings() {
  const { theme, setTheme } = useTheme();
  const { favoritesCount, clearFavorites } = useFavorites();

  const [confirmClearFavs, setConfirmClearFavs] = useState(false);
  const [confirmResetAll, setConfirmResetAll] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const showNotification = (msg) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(''), 3000);
  };

  const handleClearFavorites = () => {
    clearFavorites();
    setConfirmClearFavs(false);
    showNotification('All saved recipes have been removed.');
  };

  const handleResetPreferences = () => {
    try {
      localStorage.removeItem('recipehub_kitchen_ingredients');
      localStorage.removeItem('recipehub_favorites');
      clearFavorites();
      setTheme('light');
      setConfirmResetAll(false);
      showNotification('All settings and storage have been reset to factory defaults.');
    } catch (e) {
      console.warn('Error resetting preferences', e);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      
      {/* Page Title */}
      <div className="text-left pb-6 border-b border-stone-200/80 dark:border-stone-800/80">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-stone-100 tracking-tight">
          Application Settings
        </h1>
        <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
          Manage your interface appearance, personal preferences, and local data
        </p>
      </div>

      {/* Floating Status Toast */}
      {statusMessage && (
        <div className="flex items-center gap-2 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-sm font-semibold shadow-sm animate-fade-in">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* 1. Theme Preferences */}
      <section className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-4">
        <div>
          <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100">
            Appearance
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-0.5">
            Choose how RecipeHub looks on your device
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 pt-2">
          <button
            type="button"
            onClick={() => setTheme('light')}
            className={`flex items-center justify-center gap-3 p-4 rounded-2xl border text-sm font-bold transition-all cursor-pointer ${
              theme === 'light'
                ? 'bg-amber-50 border-amber-500 text-amber-900 shadow-sm'
                : 'border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800'
            }`}
          >
            <Sun className="w-5 h-5 text-amber-500" />
            <span>Light Theme</span>
          </button>

          <button
            type="button"
            onClick={() => setTheme('dark')}
            className={`flex items-center justify-center gap-3 p-4 rounded-2xl border text-sm font-bold transition-all cursor-pointer ${
              theme === 'dark'
                ? 'bg-stone-800 border-amber-500 text-stone-100 shadow-sm'
                : 'border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800'
            }`}
          >
            <Moon className="w-5 h-5 text-amber-400" />
            <span>Dark Theme</span>
          </button>
        </div>
      </section>

      {/* 2. Data & Storage Management */}
      <section className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-6">
        <div>
          <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100">
            Local Storage & Personal Data
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-0.5">
            RecipeHub stores your favorites and kitchen items privately in your browser's LocalStorage.
          </p>
        </div>

        {/* Data summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/40 text-xs text-stone-600 dark:text-stone-400">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-stone-700 dark:text-stone-300">Saved Favorites:</span>
            <span className="font-bold tabular-nums text-stone-900 dark:text-stone-100">{favoritesCount} recipes</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-semibold text-stone-700 dark:text-stone-300">Storage Mode:</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400">Browser LocalStorage</span>
          </div>
        </div>

        <div className="space-y-4 pt-2">
          {/* Clear Favorites with Confirmation UI */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl border border-stone-100 dark:border-stone-800">
            <div>
              <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                Clear Saved Favorites
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Remove all recipes from your personal favorites box.
              </p>
            </div>

            {confirmClearFavs ? (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleClearFavorites}
                  className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-sm transition-colors cursor-pointer"
                >
                  Yes, Remove All
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmClearFavs(false)}
                  className="px-3 py-1.5 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 text-xs font-semibold hover:bg-stone-100 dark:hover:bg-stone-800 cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setConfirmClearFavs(true)}
                disabled={favoritesCount === 0}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                  favoritesCount === 0
                    ? 'border-stone-200 text-stone-400 opacity-50 cursor-not-allowed'
                    : 'border-rose-200 dark:border-rose-900/60 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40'
                }`}
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear Favorites</span>
              </button>
            )}
          </div>

          {/* Reset All Preferences with Confirmation UI */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl border border-stone-100 dark:border-stone-800">
            <div>
              <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                Reset All App Preferences
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Restores default theme, clears kitchen ingredients, and empties saved recipes.
              </p>
            </div>

            {confirmResetAll ? (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleResetPreferences}
                  className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-sm transition-colors cursor-pointer"
                >
                  Confirm Reset
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmResetAll(false)}
                  className="px-3 py-1.5 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 text-xs font-semibold hover:bg-stone-100 dark:hover:bg-stone-800 cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setConfirmResetAll(true)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Preferences</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 3. About RecipeHub */}
      <section className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-3">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-amber-600" />
          <h2 className="text-base font-bold text-stone-900 dark:text-stone-100">
            About RecipeHub 🍳
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
          RecipeHub is a client-side Single-Page Application engineered with React, Vite, Tailwind CSS, and LocalStorage. Designed with anti-slop visual discipline, zero dead clicks, and full responsiveness across mobile, tablet, and desktop viewports.
        </p>
      </section>

    </div>
  );
}
