import React from 'react'

const RecipeList = () => {
  const sampleRecipes = [
    {
      id: 1,
      title: "Spaghetti Carbonara",
      description: "Classic Italian pasta dish with eggs, cheese, and pancetta",
      cookingTime: 20,
      difficulty: "Medium"
    },
    {
      id: 2,
      title: "Chicken Stir Fry",
      description: "Quick and healthy Asian-inspired stir fry",
      cookingTime: 15,
      difficulty: "Easy"
    },
    {
      id: 3,
      title: "Chocolate Chip Cookies",
      description: "Classic homemade chocolate chip cookies",
      cookingTime: 25,
      difficulty: "Easy"
    }
  ]

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
          Discover Amazing Recipes
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Share your culinary creations and explore recipes from food enthusiasts around the world.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sampleRecipes.map((recipe) => (
          <div key={recipe.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {recipe.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {recipe.description}
              </p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>⏱️ {recipe.cookingTime} min</span>
                <span className={`px-2 py-1 rounded-full ${
                  recipe.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                  recipe.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {recipe.difficulty}
                </span>
              </div>
              <button className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200">
                View Recipe
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <button className="bg-green-600 text-white py-3 px-8 rounded-lg hover:bg-green-700 transition-colors duration-200 text-lg font-semibold">
          + Add Your Recipe
        </button>
      </div>
    </div>
  )
}

export default RecipeList