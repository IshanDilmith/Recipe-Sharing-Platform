import { Clock, Star, Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useRecipe } from '../contexts/RecipeContext'
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import UpdateRecipeForm from "./UpdateRecipeForm";
import { useAuth } from '../contexts/AuthContext';
import { useState } from "react";

const ManageRecipeCard = ({ recipe }) => {
    const { user } = useAuth();
    const { title, description, cookTime, image, rating } = recipe;
    const { deleteRecipeHandler } = useRecipe();
    const { updateRecipeHandler } = useRecipe();

    const navigate = useNavigate();

    const handleViewRecipe = () => {
        navigate('/recipe-detail', { state: { recipe } });
    }

    const [isOpen, setIsOpen] = useState(false);  
    const [recipeData, setRecipeData] = useState(recipe); 

    const handleOpen = (recipe) => {
        setRecipeData(recipe); 
        setIsOpen(true); 
    };

    const handleClose = () => {
        setIsOpen(false);
        setRecipeData(null); 
    };

    const handleUpdateRecipe = async (updatedRecipe) => {
        console.log("Updated Recipe:", updatedRecipe);
        await updateRecipeHandler(updatedRecipe);
        handleClose();
    };
    
    const handleDelete = async () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then(async (result) => {
            if (result.isConfirmed) {
                try{
                    await deleteRecipeHandler(recipe.id);
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                      });
                } catch (error) {
                    console.error("Error deleting recipe:", error);
                }
            }
          });
        
    }

    return (
        <div className="w-70 h-96 rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
            <div className="relative h-48 overflow-hidden">
                <img 
                src={image} 
                alt={title} 
                className="w-full h-full object-cover" 
                />
                <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white px-3 py-1 flex items-center rounded-tr-lg">
                <Clock size={16} className="mr-1" />
                <span className="text-sm">{cookTime} mins</span>
                </div>
            </div>
            
            <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-xl text-gray-800">{title}</h3>
                <div className="flex items-center">
                    <span className="text-l font-medium mr-1 text-gray-700">{rating}</span>
                    <div className="flex">
                    <Star size={18} className="fill-amber-400 text-amber-400" />
                    </div>
                </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>
                
                <div className="flex flex-col gap-2">
                    <button 
                        className="w-full bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300 flex items-center justify-center"
                        onClick={handleViewRecipe}
                    >
                        View
                    </button>
                    
                    <div className="grid grid-cols-2 gap-2">
                        <button 
                            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300 flex items-center justify-center"
                           onClick={() => handleOpen(recipe)}
                        >
                            <Edit size={16} className="mr-1" />
                            Edit
                        </button>
                        <UpdateRecipeForm
                            userId={user.id}
                            onSubmit={handleUpdateRecipe}
                            isOpen={isOpen}
                            handleClose={handleClose}
                            recipeData={recipeData}
                        />
                        
                        <button 
                            className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300 flex items-center justify-center"
                            onClick={handleDelete}
                        >
                            <Trash2 size={16} className="mr-1" />
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ManageRecipeCard;