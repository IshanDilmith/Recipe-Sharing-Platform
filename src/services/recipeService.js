import axios from 'axios';

export const addRecipe = async (recipe) => {
    try {
        const response = await axios.post('/api/recipes', recipe);
        return response.data;
    } catch (error) {
        throw new Error('Error adding recipe: ' + error.message);
    }
}

export const updateRecipe = async (recipe) => {
    try {
        const response = await axios.put(`/api/recipes/${recipe.id}`, recipe);
        return response.data;
    } catch (error) {
        throw new Error('Error updating recipe: ' + error.message);
    }
}

export const deleteRecipe = async (id) => {
    try {
        await axios.delete(`/api/recipes/${id}`);
    } catch (error) {
        throw new Error('Error deleting recipe: ' + error.message);
    }
}

export const fetchRecipeById = async (id) => {
    try {
        const response = await axios.get(`/api/recipes/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching recipe: ' + error.message);
    }
}

export const fetchByUserId = async (userId) => {
    try {
        const response = await axios.get(`/api/recipes/${userId}`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching recipes: ' + error.message);
    }
}