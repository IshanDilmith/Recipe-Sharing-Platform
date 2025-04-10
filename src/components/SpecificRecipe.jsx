import { Star } from "lucide-react";
import { useLocation } from 'react-router-dom';
import TimerComponent from "./TimerComponent";
import { useState } from "react";
import NavigationBar from '../common/NavBar';
import Footer from '../common/Footer';
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton, FacebookIcon, TwitterIcon, LinkedinIcon } from 'react-share';

const Recipe = () => {
    const location = useLocation();
    const recipe = location.state?.recipe || {};

    const [isOpen, setIsOpen] = useState(false);
    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    if (!recipe) {
        return <div>No recipe found</div>;
    }

    const { title, image, description,cookTime,rating, ingredients, instructions } = recipe;

    const renderStars = () => {
        const stars = [];
        const fullStars = Math.floor(rating);
        
        for (let i = 0; i < fullStars; i++) {
            stars.push(<Star key={i} className="fill-yellow-400 text-yellow-400" size={20} />);
        }
        
        return stars;
    };

    const shareUrl = window.location.href;
    const shareTitle = `Check out this recipe: ${title}`;
    const shareDescription = description || "Delicious recipe to try!";

    return (
        <div className="flex flex-col min-h-screen">
      <NavigationBar />
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8 mb-8">
            <div className="flex flex-col md:flex-row gap-6">
                {/* Image section */}
                <div className="md:w-1/2">
                <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
                    <img 
                        src={image}
                        alt={title} 
                        className="rounded-lg max-h-64 object-cover"
                    />
                </div>
                </div>
                
                {/* Recipe details section */}
                <div className="md:w-1/2">
                    <h1 className="text-2xl font-bold mb-2">{title}</h1>
                    <p className="text-gray-600 mb-4">{description}</p>
                    
                    <div className="flex items-center mb-4">
                        <div className="flex mr-2">
                            {renderStars(rating)}
                        </div>
                        <span className="text-gray-600">{rating.toFixed(1)}</span>
                    </div>
                    
                    <div className="mb-4">
                        <span className="inline-block bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium">
                            {cookTime} minutes
                        </span>
                    </div>
                    
                    <div className="mb-4">
                        <button onClick={handleOpen} className="flex items-center bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300">
                            Start Timer
                        </button>
                        <TimerComponent cookTime={cookTime} isOpen={isOpen} handleClose={handleClose}  />
                    </div>

                    <div className="mt-8 flex justify-end space-x-4 ">
                        <FacebookShareButton url={shareUrl} quote={shareTitle + shareDescription}>
                            <FacebookIcon size={32} round />
                        </FacebookShareButton>
                        <TwitterShareButton url={shareUrl} title={shareTitle + shareDescription}>
                            <TwitterIcon size={32} round />
                        </TwitterShareButton>
                        <LinkedinShareButton url={shareUrl} title={shareTitle + shareDescription}>
                            <LinkedinIcon size={32} round />
                        </LinkedinShareButton>
                    </div>

                </div>
            </div>
            
            {/* Ingredients section */}
            <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4 border-b pb-2">Ingredients</h2>
                <ul className="list-disc pl-5 space-y-2">
                    {ingredients.map((ingredient, index) => (
                        <li key={index} className="text-gray-700">{ingredient}</li>
                    ))}
                </ul>
            </div>
            
            {/* Instructions section */}
            <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4 border-b pb-2">Instructions</h2>
                <ol className="list-decimal pl-5 space-y-4">
                    {instructions.map((step, index) => (
                        <li key={index} className="text-gray-700">{step}</li>
                    ))}
                </ol>
            </div>
            </div>

            
            <Footer />
        </div>
      );
}

export default Recipe;

