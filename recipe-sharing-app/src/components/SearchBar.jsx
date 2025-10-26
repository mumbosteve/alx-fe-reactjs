// SearchBar.js
import React from 'react';
import { useRecipeStore } from './recipeStore';

const SearchBar = () => {
  const searchTerm = useRecipeStore(state => state.searchTerm);
  const setSearchTerm = useRecipeStore(state => state.setSearchTerm);
  const filterRecipes = useRecipeStore(state => state.filterRecipes);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    // Trigger filtering when search term changes
    setTimeout(() => filterRecipes(), 100);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    filterRecipes();
  };

  return (
    <form onSubmit={handleSearchSubmit} className="search-bar">
      <div className="search-input-container">
        <input
          type="text"
          placeholder="Search recipes by name, description, or ingredients..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
        <button type="submit" className="search-button">
          🔍
        </button>
      </div>
    </form>
  );
};

export default SearchBar;