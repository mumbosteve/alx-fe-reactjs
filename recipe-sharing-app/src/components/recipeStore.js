import { create } from 'zustand';

export const useRecipeStore = create((set) => ({
  // starter recipes (optional)
  recipes: [
    { id: Date.now(), title: 'Spaghetti Bolognese', description: 'Classic Italian pasta with meat sauce.' },
    { id: Date.now() + 1, title: 'Pancakes', description: 'Fluffy breakfast pancakes with syrup.' },
  ],

  // add a new recipe
  addRecipe: (newRecipe) =>
    set((state) => ({ recipes: [...state.recipes, newRecipe] })),

  // update existing recipe (replace fields by id)
  updateRecipe: (updatedRecipe) =>
    set((state) => ({
      recipes: state.recipes.map((r) =>
        r.id === updatedRecipe.id ? { ...r, ...updatedRecipe } : r
      ),
    })),

  // delete a recipe by id
  deleteRecipe: (id) =>
    set((state) => ({ recipes: state.recipes.filter((r) => r.id !== id) })),

  // replace all recipes
  setRecipes: (recipes) => set({ recipes }),
}));
