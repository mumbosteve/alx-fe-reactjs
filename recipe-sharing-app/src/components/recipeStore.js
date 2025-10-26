// recipeStore.js
import { create } from 'zustand';

const useRecipeStore = create((set, get) => ({
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
    },
    {
      id: '3',
      title: 'Chocolate Chip Cookies',
      description: 'Classic homemade chocolate chip cookies',
      ingredients: ['flour', 'butter', 'sugar', 'chocolate chips', 'vanilla', 'eggs'],
      instructions: 'Mix ingredients, bake at 350°F for 10-12 minutes',
      cookingTime: 25,
      difficulty: 'Easy'
    },
    {
      id: '4',
      title: 'Beef Lasagna',
      description: 'Hearty Italian lasagna with beef and cheese',
      ingredients: ['lasagna noodles', 'ground beef', 'tomato sauce', 'ricotta', 'mozzarella'],
      instructions: 'Layer noodles, meat sauce, and cheese, bake until bubbly',
      cookingTime: 60,
      difficulty: 'Hard'
    }
  ],
  
  // Search and filter states
  searchTerm: '',
  selectedDifficulty: 'All',
  maxCookingTime: '',
  filteredRecipes: [],
  
  // Actions
  addRecipe: (newRecipe) => set((state) => ({
    recipes: [...state.recipes, { ...newRecipe, id: Date.now().toString() }]
  })),
  
  updateRecipe: (recipeId, updatedRecipe) => set((state) => ({
    recipes: state.recipes.map(recipe =>
      recipe.id === recipeId ? { ...recipe, ...updatedRecipe } : recipe
    )
  })),
  
  deleteRecipe: (recipeId) => set((state) => ({
    recipes: state.recipes.filter(recipe => recipe.id !== recipeId)
  })),
  
  // Search and filter actions
  setSearchTerm: (term) => set({ searchTerm: term }),
  
  setSelectedDifficulty: (difficulty) => set({ selectedDifficulty: difficulty }),
  
  setMaxCookingTime: (time) => set({ maxCookingTime: time }),
  
  // Filter recipes based on all criteria
  filterRecipes: () => set((state) => {
    const { searchTerm, selectedDifficulty, maxCookingTime, recipes } = state;
    
    let filtered = recipes;
    
    // Filter by search term (title, description, or ingredients)
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(recipe =>
        recipe.title.toLowerCase().includes(term) ||
        recipe.description.toLowerCase().includes(term) ||
        recipe.ingredients.some(ingredient => 
          ingredient.toLowerCase().includes(term)
        )
      );
    }
    
    // Filter by difficulty
    if (selectedDifficulty !== 'All') {
      filtered = filtered.filter(recipe => 
        recipe.difficulty === selectedDifficulty
      );
    }
    
    // Filter by cooking time
    if (maxCookingTime) {
      filtered = filtered.filter(recipe => 
        recipe.cookingTime <= parseInt(maxCookingTime)
      );
    }
    
    return { filteredRecipes: filtered };
  }),
  
  // Clear all filters
  clearFilters: () => set({
    searchTerm: '',
    selectedDifficulty: 'All',
    maxCookingTime: '',
    filteredRecipes: get().recipes
  })
}));

export { useRecipeStore };