// src/recipeStore.js
import { create } from 'zustand';

/**
 * Helper to apply search + filter logic to a recipes array
 */
const applyFilters = (recipes, searchTerm, filters) => {
  const term = (searchTerm || '').trim().toLowerCase();

  return recipes.filter((r) => {
    // match title or ingredients against search term
    const matchesTerm =
      term === '' ||
      (r.title && r.title.toLowerCase().includes(term)) ||
      (Array.isArray(r.ingredients) &&
        r.ingredients.some((i) => i.toLowerCase().includes(term)));

    // match ingredient filter if set
    const matchesIngredient =
      !filters.ingredient ||
      (Array.isArray(r.ingredients) &&
        r.ingredients.some((i) =>
          i.toLowerCase().includes(filters.ingredient.toLowerCase())
        ));

    // match prep time if set (prepTime assumed to be number of minutes)
    const matchesPrep =
      !filters.maxPrepTime || (typeof r.prepTime === 'number' && r.prepTime <= filters.maxPrepTime);

    return matchesTerm && matchesIngredient && matchesPrep;
  });
};

// some example starter recipes (optional)
const initialRecipes = [
  {
    id: 1,
    title: 'Spaghetti Bolognese',
    description: 'Classic Italian pasta with meat sauce.',
    ingredients: ['pasta', 'tomato', 'beef'],
    prepTime: 40,
  },
  {
    id: 2,
    title: 'Pancakes',
    description: 'Fluffy breakfast pancakes with syrup.',
    ingredients: ['flour', 'milk', 'eggs'],
    prepTime: 20,
  },
];

export const useRecipeStore = create((set, get) => ({
  // core data
  recipes: initialRecipes,

  // visible (derived) list
  filteredRecipes: initialRecipes,

  // search + extra filters
  searchTerm: '',
  filters: {
    ingredient: '',    // e.g. "tomato"
    maxPrepTime: null, // e.g. 30 (minutes)
  },

  // actions
  setSearchTerm: (term) => {
    set({ searchTerm: term });
    const { recipes, filters } = get();
    set({ filteredRecipes: applyFilters(recipes, term, filters) });
  },

  setFilters: (newFilters) => {
    set((state) => {
      const merged = { ...state.filters, ...newFilters };
      return { filters: merged, filteredRecipes: applyFilters(state.recipes, state.searchTerm, merged) };
    });
  },

  // CRUD + ensure filteredRecipes stays in sync
  addRecipe: (newRecipe) =>
    set((state) => {
      const recipes = [...state.recipes, newRecipe];
      return { recipes, filteredRecipes: applyFilters(recipes, state.searchTerm, state.filters) };
    }),

  updateRecipe: (updatedRecipe) =>
    set((state) => {
      const recipes = state.recipes.map((r) => (r.id === updatedRecipe.id ? { ...r, ...updatedRecipe } : r));
      return { recipes, filteredRecipes: applyFilters(recipes, state.searchTerm, state.filters) };
    }),

  deleteRecipe: (id) =>
    set((state) => {
      const recipes = state.recipes.filter((r) => r.id !== id);
      return { recipes, filteredRecipes: applyFilters(recipes, state.searchTerm, state.filters) };
    }),

  // replace all recipes and recompute filters
  setRecipes: (recipes) => {
    set({ recipes, filteredRecipes: applyFilters(recipes, get().searchTerm, get().filters) });
  },

  // explicit apply (if you need it)
  applyFilters: () => {
    const { recipes, searchTerm, filters } = get();
    set({ filteredRecipes: applyFilters(recipes, searchTerm, filters) });
  },
}));
