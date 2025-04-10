import React from 'react';
import { Grid, Container, Button } from '@mui/material';
import RecipeCard from './RecipeCard';
import ManageRecipeCard from './ManageRecipeCard';
import { useFavourite } from '../contexts/FavouriteContext';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const RecipeList = ({ passedRecipies, isManage }) => {
    const { favourites, addFavourite, removeFavourite } = useFavourite(); 

    const isFavourite = (recipeId) => favourites.some((recipe) => recipe.id === recipeId);  

    const handleToggleFavourite = (recipe) => {
        if (isFavourite(recipe.id)) {
            removeFavourite(recipe.id);
        } else {
            addFavourite(recipe);
        }
    };

    const renderRecipeCard = (recipe) => {
        return isManage ? (
            <ManageRecipeCard recipe={recipe} />
        ) : (
            <RecipeCard recipe={recipe} />
        );
    };

    return (
        <Container maxWidth="xl">
            <Grid container spacing={4} justifyContent="center">
                {passedRecipies.map((recipe) => (
                    <Grid item xs={12} sm={6} md={3} key={recipe.id}>
                        {renderRecipeCard(recipe)}
                        <Button
                            variant="contained"
                            color={isFavourite(recipe.id) ? "secondary" : "primary"}
                            onClick={() => handleToggleFavourite(recipe)}
                            startIcon={isFavourite(recipe.id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                            sx={{
                                transition: 'all 0.3s',
                                '&:hover': {
                                transform: 'scale(1.05)',
                                },
                            }}
                            >
                            {isFavourite(recipe.id) ? "Remove from Favourites" : "Add to Favourites"}
                        </Button>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default RecipeList;
