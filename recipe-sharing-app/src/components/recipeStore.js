// recipeStore.js
import { create } from 'zustand';

const useRecipeStore = create((set) => ({
  recipes: [
    {
      id: '1',
      title: 'Spaghetti Carbonara',
      description: 'Classic Italian pasta dish with eggs, cheese, and pancetta',
      ingredients: ['spaghetti', 'eggs', 'parmesan', 'pancetta', 'black pepper'],
      instructions: 'Cook pasta, mix eggs with cheese, combine with hot pasta and pancetta',
      cookingTime: 20,
      difficulty: 'Medium'
    },
    {
      id: '2',
      title: 'Chicken Stir Fry',
      description: 'Quick and healthy Asian-inspired stir fry',
      ingredients: ['chicken', 'vegetables', 'soy sauce', 'ginger', 'garlic'],
      instructions: 'Stir fry chicken, add vegetables and sauce, cook until tender',
      cookingTime: 15,
      difficulty: 'Easy'
    }
  ],
  
  // Add a new recipe
  addRecipe: (newRecipe) => set((state) => ({
    recipes: [...state.recipes, { ...newRecipe, id: Date.now().toString() }]
  })),
  
  // Update an existing recipe
  updateRecipe: (recipeId, updatedRecipe) => set((state) => ({
    recipes: state.recipes.map(recipe =>
      recipe.id === recipeId ? { ...recipe, ...updatedRecipe } : recipe
    )
  })),
  
  // Delete a recipe
  deleteRecipe: (recipeId) => set((state) => ({
    recipes: state.recipes.filter(recipe => recipe.id !== recipeId)
  }))
}));

export { useRecipeStore };