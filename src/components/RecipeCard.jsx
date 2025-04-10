import { Clock, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
    const { title, description, cookTime, image, rating } = recipe;

    const navigate = useNavigate();

    const handleViewRecipe = () => {
        navigate('/recipe-detail', { state: { recipe } });
    }

    return (
        <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
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
                
                <button className="w-full bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300 flex items-center justify-center"
                onClick={handleViewRecipe}>
                    View Recipe
                </button>
            </div>
        </div>
    );
}

export default RecipeCard;