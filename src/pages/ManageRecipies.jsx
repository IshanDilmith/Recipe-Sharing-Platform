import { useAuth } from '../contexts/AuthContext';
import { useRecipe } from '../contexts/RecipeContext'
import RecipeList from '../components/RecipeList';
import { useState } from 'react';
import AddRecipeForm from '../components/AddRecipeForm';
import NavigationBar from '../common/NavBar';
import Footer from '../common/Footer';
import searchHandleImg from '../../public/noRecip.jpg';
import { Grid, Container } from '@mui/material';

const ManageRecipies = () => {

    const { user } = useAuth();
    const { recipes } = useRecipe();
    const { addNewRecipeHandler } = useRecipe();

    const [isOpen, setIsOpen] = useState(false);
    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    if( !user ) {
        return(
            <div>You need to log in first.</div>
        )
    }

    const onSubmit = async (recipe) => {
        try {
            await addNewRecipeHandler(recipe);
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <div>
        <div className="flex flex-col min-h-screen">
            <NavigationBar />
            <h1 className="text-4xl font-bold mb-3 text-center mt-10 ">Manage Recipes</h1>
            <div className='flex justify-end-safe w-full px-8'>
            <button
                onClick={handleOpen}
                className="flex items-center px-4 py-2 bg-orange-500 text-white font-medium rounded-lg shadow hover:bg-orange-600 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-300"
                >
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 mr-2" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                >
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                Add Recipe
            </button>
                
                <AddRecipeForm 
                    isOpen={isOpen} 
                    handleClose={handleClose} 
                    userId={user.id} 
                    onSubmit={onSubmit} 
                />
            </div>

            {recipes.length > 0 ? (
                <RecipeList passedRecipies={recipes} isManage = {true} />
            ) : (
                <Container maxWidth="xl">
                    <Grid item xs={12}>
                        <div className="lg:col-span-3 flex justify-center">
                            <img
                                src={searchHandleImg}
                                alt="No packages available"
                                className="w-40 h-40"
                            />
                        </div>
                    </Grid>
                    </Container>
                
            )}
            
        </div>
        <Footer />
        </div>
    )


}

export default ManageRecipies;