import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Heart, Search, UtensilsCrossed, Menu, X, Settings as SettingsIcon } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useFavorites } from '../context/FavoritesContext';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { favoritesCount } = useFavorites();
  const navigate = useNavigate();

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/explore', label: 'Explore' },
    { to: '/categories', label: 'Categories' },
    { to: '/kitchen', label: 'My Kitchen', badge: 'Smart' },
    { to: '/favorites', label: 'Favorites', count: favoritesCount }
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-stone-200/80 dark:border-stone-800/80 bg-white/90 dark:bg-stone-950/90 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          
          {/* Zone 1: Brand Wordmark */}
          <Link
            to="/"
            className="flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-lg"
          >
            <span className="text-xl sm:text-2xl font-black tracking-tight text-stone-900 dark:text-stone-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
              RecipeHub <span className="text-xl sm:text-2xl">🍳</span>
            </span>
          </Link>

          {/* Zone 2: Desktop Navigation Links (Clean unboxed typography) */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `relative px-3.5 py-2 text-sm font-semibold rounded-xl transition-colors ${
                    isActive
                      ? 'text-amber-600 dark:text-amber-400 bg-amber-50/70 dark:bg-amber-950/40'
                      : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-900'
                  }`
                }
              >
                <span className="flex items-center gap-1.5 whitespace-nowrap">
                  {link.label}
                  {link.count !== undefined && link.count > 0 && (
                    <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-rose-500 text-white leading-none">
                      {link.count}
                    </span>
                  )}
                  {link.badge && (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-100/80 dark:bg-amber-900/60 px-1.5 py-0.5 rounded-md">
                      {link.badge}
                    </span>
                  )}
                </span>
              </NavLink>
            ))}
          </nav>

          {/* Zone 3: Right Controls & Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Explore / Search Icon */}
            <button
              type="button"
              onClick={() => navigate('/explore')}
              aria-label="Search recipes"
              className="p-2 rounded-xl text-stone-600 dark:text-stone-300 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-stone-100 dark:hover:bg-stone-900 transition-colors cursor-pointer"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Settings Link */}
            <Link
              to="/settings"
              aria-label="Settings"
              className="hidden sm:flex p-2 rounded-xl text-stone-600 dark:text-stone-300 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-stone-100 dark:hover:bg-stone-900 transition-colors"
            >
              <SettingsIcon className="w-5 h-5" />
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(prev => !prev)}
              aria-label="Toggle mobile menu"
              aria-expanded={mobileMenuOpen}
              className="md:hidden p-2 rounded-xl text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 px-4 pt-2 pb-5 space-y-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold transition-colors ${
                  isActive
                    ? 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40'
                    : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-900'
                }`
              }
            >
              <span>{link.label}</span>
              <div className="flex items-center gap-1.5">
                {link.badge && (
                  <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/60 px-2 py-0.5 rounded-full">
                    {link.badge}
                  </span>
                )}
                {link.count !== undefined && link.count > 0 && (
                  <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-rose-500 text-white">
                    {link.count}
                  </span>
                )}
              </div>
            </NavLink>
          ))}
          <NavLink
            to="/settings"
            onClick={() => setMobileMenuOpen(false)}
            className={({ isActive }) =>
              `flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold transition-colors ${
                isActive
                  ? 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40'
                  : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-900'
              }`
            }
          >
            <span>Settings</span>
            <SettingsIcon className="w-4 h-4 text-stone-400" />
          </NavLink>
        </div>
      )}
    </header>
  );
}
