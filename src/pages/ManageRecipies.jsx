import { useAuth } from '../contexts/AuthContext';
import { useRecipe } from '../contexts/RecipeContext'
import RecipeList from '../components/RecipeList';

const ManageRecipies = () => {

    const { user } = useAuth();
    const { recipes } = useRecipe();

    if( !user ) {
        return(
            <div>You need to log in first.</div>
        )
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Manage Recipes</h1>
            <button>add recipe</button>

            {recipes.length > 0 ? (
                <RecipeList passedRecipies={recipes} isManage = {true} />
            ) : (
                <div className="text-gray-500">No recipes found.</div>
            )}
        </div>
    )


}

export default ManageRecipies;