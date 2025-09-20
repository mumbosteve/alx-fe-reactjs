import { useRecipeStore } from './recipeStore';
import { useNavigate } from 'react-router-dom';

const DeleteRecipeButton = ({ id }) => {
  const deleteRecipe = useRecipeStore((s) => s.deleteRecipe);
  const navigate = useNavigate();

  const handleDelete = () => {
    const ok = window.confirm('Are you sure you want to delete this recipe?');
    if (!ok) return;
    deleteRecipe(id);
    navigate('/'); // go back to list
  };

  return (
    <button onClick={handleDelete} style={{ background: '#c00', color: 'white', border: 'none', padding: '6px 10px', borderRadius: 4 }}>
      Delete
    </button>
  );
};

export default DeleteRecipeButton;
