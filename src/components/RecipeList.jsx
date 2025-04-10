import React from 'react';
import { Grid, Container } from '@mui/material';
import RecipeCard from './RecipeCard';
import ManageRecipeCard from './ManageRecipeCard';

const RecipeList = ({ passedRecipies, isManage }) => {
    
    const recipes = passedRecipies; 

    if(isManage == false) {
        return (

            <Container maxWidth="xl" >
                <Grid container spacing={4} justifyContent="center">
                    {recipes.map((recipe) => (
                        <Grid item xs={12} sm={6} md={3} key={recipe.id}>
                            <RecipeCard recipe={recipe} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        );
    } else if(isManage == true) {
        return (
            <Container maxWidth="xl" >
                <Grid container spacing={4} justifyContent="center">
                    {recipes.map((recipe) => (
                        <Grid item xs={12} sm={6} md={3} key={recipe.id}>
                            <ManageRecipeCard recipe={recipe} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        );
    }
    
};

export default RecipeList;
