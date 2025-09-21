// src/components/SearchBar.jsx
import React from 'react';
import { useRecipeStore } from '../recipeStore';

const SearchBar = () => {
  const searchTerm = useRecipeStore((s) => s.searchTerm);
  const setSearchTerm = useRecipeStore((s) => s.setSearchTerm);

  return (
    <div style={{ marginBottom: 12 }}>
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by title or ingredient..."
        style={{ width: '100%', padding: '8px', borderRadius: 6, border: '1px solid #ccc' }}
      />
    </div>
  );
};

export default SearchBar;
