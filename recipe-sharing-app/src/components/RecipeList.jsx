import { useRecipeStore } from "../recipeStore";
import FavoriteButton from "./FavoriteButton";

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.recipes);

  return (
    <div>
      <h2>All Recipes</h2>
      {recipes.map((recipe) => (
        <div key={recipe.id}>
          <h3>{recipe.title}</h3>
          <p>{recipe.description}</p>
          <FavoriteButton recipeId={recipe.id} /> {/* ⭐ add toggle */}
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
