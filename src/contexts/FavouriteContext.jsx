import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './authContext';

const FavouriteContext = createContext();

export const useFavourite = () => useContext(FavouriteContext);

export const FavouriteProvider = ({ children }) => {
    const { user } = useAuth();
    const [favourites, setFavourites] = useState([]);

    useEffect(() => {
        if(user && user.email) {
            const userData = JSON.parse(localStorage.getItem(user.email)) || {};
            const storedFavourites = userData.favourites || [];
            setFavourites(storedFavourites);
        }
    }, [user]);

    const addFavourite = (recipe) => {
        setFavourites((prevFavourites) => {
            const updatedFavourites = [...prevFavourites, recipe];
            updateLocalStorage(updatedFavourites);
            return updatedFavourites;
        });
    };

    const removeFavourite = (recipeId) => {
        const updatedFavourites = favourites.filter(recipe => recipe.id !== recipeId);
        setFavourites(updatedFavourites);
        updateLocalStorage(updatedFavourites);
    };

    const updateLocalStorage = (favourites) => {
        if(user && user.email) {
            const userData = JSON.parse(localStorage.getItem(user.email)) || {};
            userData.favourites = favourites;
            localStorage.setItem(user.email, JSON.stringify(userData));
        }
    };

    return (
        <FavouriteContext.Provider value={{ favourites, addFavourite, removeFavourite }}>
            {children}
        </FavouriteContext.Provider>
    );
}