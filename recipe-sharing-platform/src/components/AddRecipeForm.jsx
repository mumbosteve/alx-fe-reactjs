import React, { useState } from "react";

function AddRecipeForm() {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    let validationErrors = {};
    if (!title.trim()) validationErrors.title = "Recipe title is required.";
    if (!ingredients.trim()) {
      validationErrors.ingredients = "Ingredients are required.";
    } else if (ingredients.split(",").length < 2) {
      validationErrors.ingredients = "Please enter at least two ingredients.";
    }
    if (!steps.trim()) validationErrors.steps = "Preparation steps are required.";
    return validationErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const newRecipe = {
        id: Date.now(),
        title,
        ingredients: ingredients.split(",").map((i) => i.trim()),
        steps,
      };

      console.log("Recipe submitted:", newRecipe);
      setTitle("");
      setIngredients("");
      setSteps("");
      alert("Recipe submitted successfully!");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center md:text-3xl">
        Add New Recipe
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
        {/* Title */}
        <div>
          <label className="block text-gray-700 font-medium mb-1 md:mb-2">
            Recipe Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.title
                ? "border-red-500 focus:ring-red-400"
                : "focus:ring-blue-400"
            } md:py-3`}
            placeholder="e.g., Chocolate Cake"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1 md:text-base">{errors.title}</p>
          )}
        </div>

        {/* Ingredients */}
        <div>
          <label className="block text-gray-700 font-medium mb-1 md:mb-2">
            Ingredients (separated by commas)
          </label>
          <textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.ingredients
                ? "border-red-500 focus:ring-red-400"
                : "focus:ring-blue-400"
            } md:py-3`}
            placeholder="e.g., Flour, Sugar, Eggs"
            rows="3"
          />
          {errors.ingredients && (
            <p className="text-red-500 text-sm mt-1 md:text-base">{errors.ingredients}</p>
          )}
        </div>

        {/* Steps */}
        <div>
          <label className="block text-gray-700 font-medium mb-1 md:mb-2">
            Preparation Steps
          </label>
          <textarea
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.steps
                ? "border-red-500 focus:ring-red-400"
                : "focus:ring-blue-400"
            } md:py-3`}
            placeholder="e.g., Mix ingredients, bake at 180°C for 30 minutes"
            rows="4"
          />
          {errors.steps && (
            <p className="text-red-500 text-sm mt-1 md:text-base">{errors.steps}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 md:py-3"
        >
          Submit Recipe
        </button>
      </form>
    </div>
  );
}

export default AddRecipeForm;
