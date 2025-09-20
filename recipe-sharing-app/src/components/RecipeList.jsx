import { Link } from 'react-router-dom';
import { useRecipeStore } from '../recipeStore';

const RecipeList = () => {
  const recipes = useRecipeStore((s) => s.recipes);

  return (
    <div style={{ marginTop: 20 }}>
      <h2>Recipes</h2>
      {recipes.length === 0 ? (
        <p>No recipes yet.</p>
      ) : (
        recipes.map((r) => (
          <div
            key={r.id}
            style={{
              border: '1px solid #ddd',
              padding: 12,
              marginBottom: 10,
              borderRadius: 6,
            }}
          >
            <h3>{r.title}</h3>
            <p>{r.description}</p>
            <div style={{ marginTop: 8 }}>
              <Link to={`/recipe/${r.id}`} style={{ marginRight: 12 }}>
                View
              </Link>
              <Link to={`/edit/${r.id}`}>Edit</Link>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default RecipeList;
