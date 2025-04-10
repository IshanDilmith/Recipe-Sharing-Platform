import { MockRecipies } from '../../mock data/db';

export const addRecipe = async (recipe) => {
    try {
        const newRecipe = { ...recipe, id: MockRecipies.length + 1 };
        MockRecipies.push(newRecipe);
        return newRecipe;
    } catch (error) {
        throw new Error('Error adding recipe: ' + error.message);
    }
}

export const updateRecipe = async (updatedRecipe) => {
    try {
        const index = MockRecipies.findIndex(recipe => recipe.id === updatedRecipe.id);
        if (index !== -1) {
            MockRecipies[index] = updatedRecipe;
            return updatedRecipe;
        }
        throw new Error('Recipe not found');
    } catch (error) {
        throw new Error('Error updating recipe: ' + error.message);
    }
}

export const deleteRecipe = async (id) => {
    try {
        const index = MockRecipies.findIndex(recipe => recipe.id === id);
        if (index !== -1) {
            MockRecipies.splice(index, 1);
            return { message: 'Recipe deleted successfully' };
        }
        throw new Error('Recipe not found');
    } catch (error) {
        throw new Error('Error deleting recipe: ' + error.message);
    }
}

export const fetchRecipeById = async (id) => {
    try {
        const recipe = MockRecipies.find(recipe => recipe.id === id);
        if (recipe) {
            return recipe;
        }
        throw new Error('Recipe not found');
    } catch (error) {
        throw new Error('Error fetching recipe: ' + error.message);
    }
}

export const fetchByUserId = async (userId) => {
    try {
        const userRecipes = MockRecipies.filter(recipe => recipe.userId === userId);
        if (userRecipes.length > 0) {
            return userRecipes;
        }
        throw new Error('No recipes found for this user');
    } catch (error) {
        throw new Error('Error fetching recipes: ' + error.message);
    }
}