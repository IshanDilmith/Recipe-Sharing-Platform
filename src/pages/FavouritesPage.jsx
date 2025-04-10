import NavigationBar from '../common/NavBar';
import Footer from '../common/Footer';
import FavouriteRecipes from '../components/FavouriteList';

const FavouritesPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavigationBar />
      <main className="flex-grow flex items-center justify-center">
        <FavouriteRecipes />
      </main>
      <Footer />
    </div>
  );
}

export default FavouritesPage;