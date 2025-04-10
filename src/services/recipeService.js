
export const addRecipe = async (recipe) => {
  try {
    const newRecipe = { ...recipe, id: getRecipesFromLocalStorage().length + 1 };
    const updatedRecipes = [...getRecipesFromLocalStorage(), newRecipe];
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
    return newRecipe;
  } catch (error) {
    throw new Error('Error adding recipe: ' + error.message);
  }
};

const getRecipesFromLocalStorage = () => {
    try {
      const recipes = JSON.parse(localStorage.getItem('recipes'));
      return recipes || [];
    } catch (error) {
      console.error('Error fetching recipes from localStorage:', error);
      return [];
    }
  };
  

  export const updateRecipe = async (updatedRecipe) => {
    try {
      const recipes = getRecipesFromLocalStorage();
      const index = recipes.findIndex((recipe) => recipe.id === updatedRecipe.id);
      if (index !== -1) {
        recipes[index] = updatedRecipe;
        localStorage.setItem('recipes', JSON.stringify(recipes));
        return updatedRecipe;
      }
      throw new Error('Recipe not found');
    } catch (error) {
      throw new Error('Error updating recipe: ' + error.message);
    }
  };

export const deleteRecipe = async (id) => {
  try {
    let recipes = getRecipesFromLocalStorage();
    recipes = recipes.filter(recipe => recipe.id !== id);
    localStorage.setItem('recipes', JSON.stringify(recipes));
    return { message: 'Recipe deleted successfully' };
  } catch (error) {
    throw new Error('Error deleting recipe: ' + error.message);
  }
};

export const fetchRecipeById = async (id) => {
  try {
    const recipes = getRecipesFromLocalStorage();
    const recipe = recipes.find(recipe => recipe.id === id);
    if (recipe) {
      return recipe;
    }
    throw new Error('Recipe not found');
  } catch (error) {
    throw new Error('Error fetching recipe: ' + error.message);
  }
};

export const fetchByUserId = async (userId) => {
  try {
    const recipes = getRecipesFromLocalStorage();
    const userRecipes = recipes.filter(recipe => recipe.userId === userId);
    if (userRecipes.length > 0) {
      return userRecipes;
    }
    throw new Error('No recipes found for this user');
  } catch (error) {
    throw new Error('Error fetching recipes: ' + error.message);
  }
};
