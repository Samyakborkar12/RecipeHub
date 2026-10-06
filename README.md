# RecipeHub 🍳

> **Discover. Cook. Enjoy.**

RecipeHub is a modern culinary recipe discovery and smart kitchen companion built as a responsive Single-Page Application (SPA). Designed with clean typography, warm culinary aesthetics, seamless dark mode support, and intelligent pantry-matching algorithms.

---

## 🌟 Key Features

### 🔍 1. Recipe Discovery & Search
- Live dynamic search across recipe titles, ingredients, cultural cuisines, and cooking tags.
- Deep filtering by Category, Difficulty (Easy, Medium, Hard), Maximum Cooking Time (15m, 30m, 45m, 60m+), and Minimum Rating (4.0+, 4.5+, 4.8+).
- Dynamic sorting by **Popular**, **Highest Rated**, **Quickest**, and **Newest**.
- Clean URL synchronization (`/explore?q=...&category=...`).

### 🥑 2. My Kitchen — Smart Pantry Matcher
- Enter any ingredients currently in your kitchen (e.g., `Tomato, onion, potato, cheese`) or click common pantry staples to add them.
- Dynamic tag management with instant chip removals.
- Calculates exact match percentages (e.g., **"80% match — 4 of 5 ingredients available"**).
- Ranks dishes with the highest matching percentage first, highlighting available vs. missing ingredients.

### 💖 3. Favorites Box & Persistence
- Save or remove recipes with the heart button from any card or detail page without accidental navigation.
- Persistent across page reloads using browser `LocalStorage`.
- Dedicated Favorites page with counter badge, grid view, and safe removal actions.

### 📖 4. Comprehensive Recipe Detail Pages
- High-resolution culinary imagery with automatic fallback handling.
- **Interactive Servings Scaler**: Scale serving count up or down; ingredient quantities dynamically re-calculate in real time.
- **Interactive Checklist**: Check off ingredients as you prepare them.
- **Step-by-Step Cooking Guide**: Track completed cooking steps.
- **Nutritional Breakdown**: Calories, Protein, Carbohydrates, and Fat.
- **Related Recipes**: Handpicked recommendations from matching cuisines and categories.

### 🌗 5. Modern Light & Dark Mode
- Full dark mode system configured with custom CSS and warm slate/amber tones.
- Preserves user preference in `LocalStorage` with system theme fallback.

### ⚙️ 6. Settings & Data Management
- Customize appearance themes.
- View local storage usage.
- Safe confirmation dialogs for clearing favorites or resetting all preferences.

---

## 🛠️ Technologies Used

- **React.js**: Functional components and modern React Hooks (`useState`, `useMemo`, `useEffect`, `useContext`).
- **React Router DOM**: Client-side routing with `BrowserRouter`, `Routes`, `Route`, `useSearchParams`, and `useLocation`.
- **Tailwind CSS**: Utility-first styling with warm amber palettes and dark mode support.
- **Lucide React**: Clean, accessible vector icons.
- **LocalStorage API**: Client-side persistence for Favorites, Pantry Ingredients, and Theme preference.
- **Vite**: Ultra-fast build and development server.

---

## 📁 Project Structure

```
RecipeHub/
├── public/
├── src/
│   ├── assets/
│   │   └── images/
│   ├── components/
│   │   ├── CategoryCard.jsx
│   │   ├── EmptyState.jsx
│   │   ├── FavoriteButton.jsx
│   │   ├── FilterPanel.jsx
│   │   ├── Footer.jsx
│   │   ├── Navbar.jsx
│   │   ├── Rating.jsx
│   │   ├── RecipeCard.jsx
│   │   ├── RecipeGrid.jsx
│   │   ├── SearchBar.jsx
│   │   └── ThemeToggle.jsx
│   ├── context/
│   │   ├── FavoritesContext.jsx
│   │   └── ThemeContext.jsx
│   ├── data/
│   │   └── recipes.js
│   ├── pages/
│   │   ├── Categories.jsx
│   │   ├── Explore.jsx
│   │   ├── Favorites.jsx
│   │   ├── Home.jsx
│   │   ├── MyKitchen.jsx
│   │   ├── RecipeDetails.jsx
│   │   └── Settings.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── metadata.json
├── package.json
├── README.md
└── vite.config.ts
```

---

## 🚀 Installation & Running Locally

1. Clone or navigate to the project directory:
   ```bash
   cd RecipeHub
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

---

## 💡 How Features Work

### How Favorites Work
- `FavoritesContext` provides stateful access to saved recipe IDs.
- On first load, it checks `localStorage.getItem('recipehub_favorites')`.
- Toggling the heart icon updates state and synchronizes with LocalStorage.
- All actions are guarded with `e.stopPropagation()` so clicking favorites on recipe cards never triggers unintended route transitions.

### How "My Kitchen" Works
- Users input comma-separated ingredients or individual items, converting them into chips.
- The matching engine normalizes ingredient strings (stemming and punctuation stripping).
- It compares each recipe's required ingredients against user inventory, generating an exact match ratio and percentage.
- Results are dynamically sorted by highest percentage match, displaying available and missing ingredients clearly.

---

## 🔮 Future Improvements

- Meal planner calendar for weekly dinner scheduling.
- Export grocery shopping list to PDF or clipboard.
- Voice-guided cooking step reading mode.
- User recipe creation and community rating submissions.
