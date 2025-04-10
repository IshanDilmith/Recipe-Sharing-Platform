import { useState } from "react";
import { Link } from "react-router-dom";
import { Home, Search, Heart, Book, User, ChevronDown, LogIn } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const NavigationBar = () => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { user, logoutHandler } = useAuth();

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Book className="h-8 w-8 text-orange-500" />
              <span className="ml-2 text-xl font-bold text-gray-800">Recipe Book</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex sm:space-x-8 items-center">
            <Link to="/" className="flex items-center text-gray-900 hover:text-orange-500 font-medium">
              <Home size={18} className="mr-1" />
              Home
            </Link>
          </div>

          {/* Right Section */}
          <div className="flex items-center">
            {user ? (
              <div className="relative">
                <button
                  onClick={toggleProfileMenu}
                  className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none"
                >
                  <User size={20} className="mr-1" />
                  <span>My Profile</span>
                  <ChevronDown size={16} className="ml-1" />
                </button>

                {/* Dropdown */}
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                    <div className="py-1">
                      <Link
                        to="/manage-recipies"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <User size={16} className="mr-2" />
                        Your Profile
                      </Link>
                      <Link
                        to="/favourite-recipes"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <Heart size={16} className="mr-2 text-red-500" />
                        Favorites
                      </Link>
                      <button
                        onClick={() => {
                          logoutHandler();
                          setIsProfileMenuOpen(false);
                        }}
                        className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <LogIn size={16} className="mr-2" />
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden sm:flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700"
              >
                <LogIn size={18} className="mr-1" />
                LogIn
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
