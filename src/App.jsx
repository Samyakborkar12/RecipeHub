import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Categories from './pages/Categories';
import RecipeDetails from './pages/RecipeDetails';
import Favorites from './pages/Favorites';
import MyKitchen from './pages/MyKitchen';
import Settings from './pages/Settings';
import { ThemeProvider } from './context/ThemeContext';
import { FavoritesProvider } from './context/FavoritesContext';

// Scroll to top automatically when navigating between pages
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <BrowserRouter>
          <ScrollToTop />
          <div className="min-h-screen flex flex-col bg-stone-50/50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 transition-colors">
            <Navbar />
            <div className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/recipe/:id" element={<RecipeDetails />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/kitchen" element={<MyKitchen />} />
                <Route path="/settings" element={<Settings />} />
                {/* Fallback route */}
                <Route path="*" element={<Explore />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </BrowserRouter>
      </FavoritesProvider>
    </ThemeProvider>
  );
}
