// RecipeDetails.js
import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';

const RecipeDetails = () => {
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const recipe = useRecipeStore(state =>
    state.recipes.find(recipe => recipe.id === recipeId)
  );

  const deleteRecipe = useRecipeStore(state => state.deleteRecipe);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      deleteRecipe(recipeId);
      navigate('/');
    }
  };

  if (!recipe) {
    return (
      <div className="recipe-details">
        <h2>Recipe not found</h2>
        <Link to="/">Back to Recipes</Link>
      </div>
    );
  }

  return (
    <div className="recipe-details">
      <div className="recipe-header">
        <h1>{recipe.title}</h1>
        <div className="recipe-actions">
          <Link to={`/edit/${recipe.id}`} className="btn btn-edit">
            Edit Recipe
          </Link>
          <button onClick={handleDelete} className="btn btn-delete">
            Delete Recipe
          </button>
          <Link to="/" className="btn btn-back">
            Back to Recipes
          </Link>
        </div>
      </div>
      
      <div className="recipe-meta">
        <span className="cooking-time">⏱️ {recipe.cookingTime} minutes</span>
        <span className="difficulty">📊 {recipe.difficulty}</span>
      </div>
      
      <p className="recipe-description">{recipe.description}</p>
      
      <div className="recipe-section">
        <h3>Ingredients</h3>
        <ul className="ingredients-list">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>
      
      <div className="recipe-section">
        <h3>Instructions</h3>
        <p className="recipe-instructions">{recipe.instructions}</p>
      </div>
    </div>
  );
};

export default RecipeDetails;