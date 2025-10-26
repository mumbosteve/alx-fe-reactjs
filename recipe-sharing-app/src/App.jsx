// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RecipeList from './RecipeList';
import RecipeDetails from './RecipeDetails';
import EditRecipeForm from './EditRecipeForm';
import AddRecipeForm from './AddRecipeForm';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="app-header">
          <h1>🍳 Recipe Sharing App</h1>
          <nav>
            <Link to="/" className="nav-link">All Recipes</Link>
            <Link to="/add" className="nav-link">Add New Recipe</Link>
          </nav>
        </header>
        
        <main className="app-main">
          <Routes>
            <Route path="/" element={<RecipeList />} />
            <Route path="/add" element={<AddRecipeForm />} />
            <Route path="/recipe/:recipeId" element={<RecipeDetails />} />
            <Route path="/edit/:recipeId" element={<EditRecipeForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;