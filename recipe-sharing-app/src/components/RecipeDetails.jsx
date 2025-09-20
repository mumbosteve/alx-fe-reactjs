import { useParams, Link, useNavigate } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';
import DeleteRecipeButton from './DeleteRecipeButton';

const RecipeDetails = () => {
  const { id } = useParams();
  const recipeId = Number(id);
  const recipe = useRecipeStore((s) => s.recipes.find((r) => r.id === recipeId));
  const navigate = useNavigate();

  if (!recipe) {
    return (
      <div style={{ padding: 20 }}>
        <p>Recipe not found.</p>
        <button onClick={() => navigate('/')}>Back to list</button>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>{recipe.title}</h1>
      <p>{recipe.description}</p>

      <div style={{ marginTop: 16 }}>
        <Link to={`/edit/${recipe.id}`} style={{ marginRight: 12 }}>
          Edit
        </Link>
        <DeleteRecipeButton id={recipe.id} />
      </div>
    </div>
  );
};

export default RecipeDetails;
