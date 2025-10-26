// RecipeList.js
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';
import SearchBar from './SearchBar';
import RecipeFilters from './RecipeFilters';

const RecipeList = () => {
  const {
    filteredRecipes,
    recipes,
    filterRecipes,
    searchTerm,
    selectedDifficulty,
    maxCookingTime
  } = useRecipeStore();

  // Apply filters when component mounts or when dependencies change
  useEffect(() => {
    filterRecipes();
  }, [filterRecipes, searchTerm, selectedDifficulty, maxCookingTime]);

  const displayRecipes = filteredRecipes.length > 0 ? filteredRecipes : recipes;
  const hasActiveSearch = searchTerm || selectedDifficulty !== 'All' || maxCookingTime;

  return (
    <div className="recipe-list">
      <div className="search-filters-section">
        <SearchBar />
        <RecipeFilters />
      </div>

      <div className="results-header">
        <h2>
          {hasActiveSearch ? 'Search Results' : 'All Recipes'}
          {hasActiveSearch && (
            <span className="results-count">
              ({filteredRecipes.length} {filteredRecipes.length === 1 ? 'recipe' : 'recipes'} found)
            </span>
          )}
        </h2>
        
        {hasActiveSearch && filteredRecipes.length === 0 && (
          <div className="no-results">
            <p>No recipes found matching your criteria.</p>
            <p>Try adjusting your search terms or filters.</p>
          </div>
        )}
      </div>

      {displayRecipes.length === 0 && !hasActiveSearch ? (
        <div className="empty-state">
          <p>No recipes found. <Link to="/add">Add your first recipe!</Link></p>
        </div>
      ) : (
        <div className="recipes-grid">
          {displayRecipes.map(recipe => (
            <div key={recipe.id} className="recipe-card">
              <h3>{recipe.title}</h3>
              <p className="recipe-description">{recipe.description}</p>
              <div className="recipe-meta">
                <span className="cooking-time">⏱️ {recipe.cookingTime} min</span>
                <span className={`difficulty difficulty-${recipe.difficulty.toLowerCase()}`}>
                  📊 {recipe.difficulty}
                </span>
              </div>
              <div className="recipe-ingredients-preview">
                <strong>Ingredients:</strong> {recipe.ingredients.slice(0, 3).join(', ')}
                {recipe.ingredients.length > 3 && '...'}
              </div>
              <Link to={`/recipe/${recipe.id}`} className="btn btn-view">
                View Recipe
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeList;