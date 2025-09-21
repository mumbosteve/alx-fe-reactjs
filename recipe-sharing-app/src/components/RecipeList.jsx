// src/components/RecipeList.jsx
import { Link } from 'react-router-dom';
import { useRecipeStore } from '../recipeStore';

const RecipeList = () => {
  const recipes = useRecipeStore((s) => s.filteredRecipes); // now uses filteredRecipes
  return (
    <div style={{ marginTop: 10 }}>
      <h2>Recipes</h2>
      {recipes.length === 0 ? (
        <p>No recipes match your search/filters.</p>
      ) : (
        recipes.map((r) => (
          <div key={r.id} style={{ border: '1px solid #ddd', padding: 12, marginBottom: 8, borderRadius: 6 }}>
            <h3>{r.title} {r.prepTime ? <small style={{ fontWeight: 400 }}>({r.prepTime} min)</small> : null}</h3>
            <p style={{ margin: '6px 0' }}>{r.description}</p>
            {Array.isArray(r.ingredients) && r.ingredients.length > 0 && (
              <p style={{ margin: '6px 0', color: '#555' }}>Ingredients: {r.ingredients.join(', ')}</p>
            )}
            <div style={{ marginTop: 8 }}>
              <Link to={`/recipe/${r.id}`} style={{ marginRight: 12 }}>View</Link>
              <Link to={`/edit/${r.id}`}>Edit</Link>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default RecipeList;
