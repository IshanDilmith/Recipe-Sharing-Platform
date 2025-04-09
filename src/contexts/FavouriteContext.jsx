import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './authContext';

const FavouriteContext = createContext();

export const useFavourite = () => useContext(FavouriteContext);

export const FavouriteProvider = ({ children }) => {
    const { user } = useAuth();
    const [favourites, setFavourites] = useState([]);

    useEffect(() => {
        if(user){
            const userData = JSON.parse(localStorage.getItem(user)) || [];
            const storedFavourites = userData.favourites || [];
            setFavourites(storedFavourites);
        }
    }, [user]);

    const addFavourite = (recipe) => {
        setFavourites((prevFavourites) => [...prevFavourites, recipe]);
        updateLocalStorage([...favourites, recipe]);
    };

    const removeFavourite = (recipeId) => {
        const updatedFavourites = favourites.filter(recipe => recipe.id !== recipeId);
        setFavourites(updatedFavourites);
        updateLocalStorage(updatedFavourites);
    };

    const updateLocalStorage = (favourites) => {
        if(user){
            const userData = JSON.parse(localStorage.getItem(user)) || {};
            userData.favourites = favourites;
            localStorage.setItem(user, JSON.stringify(userData));
        }
    };

    return (
        <FavouriteContext.Provider value={{ favourites, addFavourite, removeFavourite }}>
            {children}
        </FavouriteContext.Provider>
    );
}