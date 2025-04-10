import React from 'react';
import RecipeList from '../components/RecipeList';
import { MockRecipies } from '../../mock data/db';

const HomePage = () => {

    const recipies = MockRecipies;

    return (
        <div>
            <div className="flex justify-center items-center min-h-screen">
                <RecipeList passedRecipies={recipies} isManage = {false}/>
            </div>
            
        </div>
    );
}

export default HomePage;