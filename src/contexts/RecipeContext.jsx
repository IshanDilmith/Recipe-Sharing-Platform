import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { addRecipe, updateRecipe, deleteRecipe, fetchByUserId } from '../services/recipeService';

const RecipeContext = createContext();

export const useRecipe = () => useContext(RecipeContext);

export const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const loadRecipes = () => {
      if (user) {
        const storedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
        setRecipes(storedRecipes);
      } else {
        setRecipes([]);
      }
    };
    loadRecipes();
  }, [user]);

  const addNewRecipeHandler = async (recipe) => {
    try {
      if (!user) throw new Error('User not authenticated');
      const newRecipe = await addRecipe(recipe);
      setRecipes((prevRecipes) => [...prevRecipes, newRecipe]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateRecipeHandler = async (recipe) => {
    try {
      if (!user) throw new Error('User not authenticated');
  
      setLoading(true);
  
      const updatedRecipe = await updateRecipe(recipe);
  
      setRecipes((prevRecipes) =>
        prevRecipes.map((r) => (r.id === updatedRecipe.id ? updatedRecipe : r))
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteRecipeHandler = async (id) => {
    try {
      if (!user) throw new Error('User not authenticated');
      await deleteRecipe(id);
      setRecipes((prevRecipes) => prevRecipes.filter((recipe) => recipe.id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <RecipeContext.Provider
      value={{
        recipes,
        loading,
        error,
        addNewRecipeHandler,
        updateRecipeHandler,
        deleteRecipeHandler,
        setLoading,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};
