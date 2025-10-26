import React from 'react';
import HomePage from './components/HomePage';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🍳</span>
              <h1 className="text-2xl font-bold text-gray-900">
                RecipeShare
              </h1>
            </div>
            
            <nav className="flex space-x-8">
              <a href="#" className="text-blue-600 font-semibold border-b-2 border-blue-600 pb-1">
                Home
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                Browse
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                Add Recipe
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                My Recipes
              </a>
            </nav>

            <div className="flex items-center space-x-4">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium">
                Sign In
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <HomePage />
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2024 RecipeShare. All rights reserved.</p>
          <p className="text-gray-400 mt-2">
            Share your culinary creations with the world
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;