import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function SearchBar({
  value,
  onChange,
  onSearch,
  placeholder = 'Search by recipe name, ingredient, cuisine...',
  size = 'md',
  autoNavigate = false,
  className = ''
}) {
  const [localQuery, setLocalQuery] = useState(value || '');
  const navigate = useNavigate();

  const query = value !== undefined ? value : localQuery;

  const handleChange = (e) => {
    const val = e.target.value;
    if (value === undefined) {
      setLocalQuery(val);
    }
    if (onChange) {
      onChange(val);
    }
  };

  const handleClear = () => {
    if (value === undefined) {
      setLocalQuery('');
    }
    if (onChange) {
      onChange('');
    }
    if (onSearch) {
      onSearch('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    }
    if (autoNavigate && query.trim()) {
      navigate(`/explore?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const isLarge = size === 'lg';

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      className={`relative flex items-center w-full rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 shadow-sm focus-within:ring-2 focus-within:ring-amber-500 focus-within:border-amber-500 transition-all ${
        isLarge ? 'p-2 pl-4 sm:p-2.5 sm:pl-5 shadow-md' : 'p-1.5 pl-3.5'
      } ${className}`}
    >
      <Search
        className={`shrink-0 text-stone-400 dark:text-stone-500 mr-2 sm:mr-3 ${
          isLarge ? 'w-5 h-5 sm:w-6 sm:h-6 text-amber-600 dark:text-amber-500' : 'w-4 h-4'
        }`}
      />

      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        aria-label="Search recipes"
        className={`w-full bg-transparent text-stone-800 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none ${
          isLarge ? 'text-base sm:text-lg' : 'text-sm'
        }`}
      />

      {query && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Clear search query"
          className="p-1 rounded-full text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 transition-colors mr-1 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      )}

      <button
        type="submit"
        className={`shrink-0 font-semibold text-white bg-amber-600 hover:bg-amber-700 active:scale-95 transition-all rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 cursor-pointer ${
          isLarge
            ? 'px-5 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base'
            : 'px-3.5 py-1.5 text-xs sm:text-sm'
        }`}
      >
        Search
      </button>
    </form>
  );
}
