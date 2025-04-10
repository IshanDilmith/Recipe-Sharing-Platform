import React from 'react';
import { useFavourite } from '../contexts/FavouriteContext';
import RecipeCard from './RecipeCard';
import { Grid, Container, Button } from '@mui/material';
import searchHandleImg from '../../public/noRecip.jpg';

const FavouriteRecipes = () => {
    const { favourites, removeFavourite } = useFavourite();

    return (
        <Container maxWidth="xl">
            <Grid container spacing={4} justifyContent="center">
                {favourites.length === 0 && (
                    <Grid item xs={12}>
                        <div className="lg:col-span-3 flex justify-center">
                            <img
                                src={searchHandleImg}
                                alt="No packages available"
                                className="w-40 h-40"
                            />
                        </div>
                    </Grid>
                )}
                {favourites.map((recipe) => (
                    <Grid item xs={12} sm={6} md={3} key={recipe.id}>
                        <RecipeCard recipe={recipe} />
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => removeFavourite(recipe.id)}
                        >
                            Remove from Favourites
                        </Button>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default FavouriteRecipes;

