import { useState } from "react";
import { ClockIcon, StarIcon, PencilIcon, ListBulletIcon, PhotoIcon } from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const AddRecipeForm = ({ onSubmit, userId, isOpen, handleClose }) => {
    const [recipe, setRecipe] = useState({
      userId: userId,
      title: "",
      description: "",
      cookTime: 30,
      rating: 4.0,
      ingredients: "Ingredient 1, Ingredient 2, Ingredient 3",
      instructions: "Step 1, Step 2, Step 3",
      image: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleRatingChange = (newValue) => {
    setRecipe({ ...recipe, rating: newValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formattedRecipe = {
      ...recipe,
      ingredients: recipe.ingredients.split(',').map(item => item.trim()),
      instructions: recipe.instructions.split(',').map(item => item.trim())
    };
    
    onSubmit(formattedRecipe);
    
    setRecipe({
      userId: userId,
      title: "",
      description: "",
      cookTime: 30,
      rating: 4.0,
      ingredients: "",
      instructions: "",
      image: ""
    });
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Recipe Added Successfully!!",
      showConfirmButton: false,
      timer: 1500
  });
    handleClose();
  };

  const RatingSelector = ({ value, onChange }) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className="focus:outline-none"
          >
            {star <= value ? (
              <StarIconSolid className="h-6 w-6 text-amber-400" />
            ) : (
              <StarIcon className="h-6 w-6 text-gray-300" />
            )}
          </button>
        ))}
      </div>
    );
  };
  

  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Create New Recipe</DialogTitle>
      <DialogContent>
    <div className="p-8 max-w-lg mx-auto bg-white rounded-xl shadow-xl border border-gray-100">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Create New Recipe
        </h2>
        <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full"></div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Recipe Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={recipe.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors bg-white"
            placeholder="Enter recipe title"
          />
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            id="description"
            name="description"
            value={recipe.description}
            onChange={handleChange}
            required
            rows="2"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors bg-white"
            placeholder="Brief description of your recipe"
          ></textarea>
        </div>
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-3 flex items-center text-sm text-amber-700">
              <ClockIcon className="h-5 w-5 mr-2" />
              Time & Rating
            </span>
          </div>
        </div>
        
        <div className="flex space-x-4 items-center">
          <div className="w-1/2">
            <label htmlFor="cookTime" className="block text-sm font-medium text-gray-700 mb-1">Cook Time</label>
            <div className="relative">
              <input
                type="number"
                id="cookTime"
                name="cookTime"
                min="1"
                value={recipe.cookTime}
                onChange={handleChange}
                required
                className="w-full pl-4 pr-16 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors bg-white"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 pointer-events-none">
                mins
              </div>
            </div>
          </div>
          
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
            <RatingSelector value={recipe.rating} onChange={handleRatingChange} />
          </div>
        </div>
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-3 flex items-center text-sm text-green-700">
              <PencilIcon className="h-5 w-5 mr-2" />
              Ingredients
            </span>
          </div>
        </div>
        
        <div>
          <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700 mb-1">Ingredients</label>
          <textarea
            id="ingredients"
            name="ingredients"
            value={recipe.ingredients}
            onChange={handleChange}
            required
            rows="2"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors bg-white"
            placeholder="Chicken, Coconut milk, Spices"
          ></textarea>
          <p className="mt-1 text-xs text-gray-500">Separate ingredients with commas</p>
        </div>
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-3 flex items-center text-sm text-blue-700">
              <ListBulletIcon className="h-5 w-5 mr-2" />
              Instructions
            </span>
          </div>
        </div>
        
        <div>
          <label htmlFor="instructions" className="block text-sm font-medium text-gray-700 mb-1">Instructions</label>
          <textarea
            id="instructions"
            name="instructions"
            value={recipe.instructions}
            onChange={handleChange}
            required
            rows="3"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors bg-white"
            placeholder="Heat oil in a pan, Add spices and sauté, Add chicken and cook"
          ></textarea>
          <p className="mt-1 text-xs text-gray-500">Separate steps with commas</p>
        </div>
        
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
          <input
            type="text"
            id="image"
            name="image"
            value={recipe.image}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors bg-white"
            placeholder="Enter recipe title"
          />
        </div>
        
        <button 
          type="submit" 
          className="w-full py-3 px-4 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all"
        >
          Save Recipe
        </button>
      </form>
      
    </div>
    </DialogContent>

    <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddRecipeForm;