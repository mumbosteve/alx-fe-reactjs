// src/components/FilterPanel.jsx
import React, { useState } from 'react';
import { useRecipeStore } from '../recipeStore';

const FilterPanel = () => {
  const [ingredient, setIngredient] = useState('');
  const [maxPrepTime, setMaxPrepTime] = useState('');
  const setFilters = useRecipeStore((s) => s.setFilters);

  const apply = () => {
    setFilters({
      ingredient: ingredient.trim(),
      maxPrepTime: maxPrepTime ? Number(maxPrepTime) : null,
    });
  };

  const clear = () => {
    setIngredient('');
    setMaxPrepTime('');
    setFilters({ ingredient: '', maxPrepTime: null });
  };

  return (
    <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
      <input
        placeholder="Filter ingredient (e.g. tomato)"
        value={ingredient}
        onChange={(e) => setIngredient(e.target.value)}
        style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc', flex: 1 }}
      />
      <input
        placeholder="Max prep time (min)"
        type="number"
        value={maxPrepTime}
        onChange={(e) => setMaxPrepTime(e.target.value)}
        style={{ width: 140, padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
      />
      <button onClick={apply} style={{ padding: '8px 12px' }}>Apply</button>
      <button onClick={clear} style={{ padding: '8px 12px' }}>Clear</button>
    </div>
  );
};

export default FilterPanel;
