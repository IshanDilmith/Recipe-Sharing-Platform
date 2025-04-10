import React, { useState } from 'react';
import RecipeList from '../components/RecipeList';
import { MockRecipies } from '../../mock data/db';
import { TextField, Container } from '@mui/material';
import NavigationBar from '../common/NavBar';
import { Search, X } from 'lucide-react';
import Footer from '../common/Footer';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 8;

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
    setCurrentPage(1);
  };

  const filteredRecipes = MockRecipies.filter((recipe) => {
    const titleMatch = recipe.title?.toLowerCase().includes(searchQuery);
    const ingredientsMatch = recipe.ingredients?.join(', ').toLowerCase().includes(searchQuery);
    return titleMatch || ingredientsMatch;
  });

  // Pagination Logic
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = filteredRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  // Change Page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate Total Pages
  const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);

  return (
    <div>
      <NavigationBar />
      <Container maxWidth="xl">
        <div className="relative w-full max-w-xl mx-auto">
          <div className="relative mt-4 mb-4 rounded-lg shadow-sm">
            <input
              type="text"
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400 focus:border-orange-500 focus:outline-none transition-all shadow-sm bg-white"
              placeholder="Search recipes by title or ingredients..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>

        <div className="flex justify-center items-center min-h-screen">
          <RecipeList passedRecipies={currentRecipes} isManage={false} />
        </div>

        <div className="flex justify-center mt-8 mb-5">
          <button
            className="px-4 py-2 mx-2 bg-orange-500 text-white rounded-md"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          <span className="px-4 py-2 text-lg">
            Page {currentPage} of {totalPages}
          </span>

          <button
            className="px-4 py-2 mx-2 bg-orange-500 text-white rounded-md"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default HomePage;

