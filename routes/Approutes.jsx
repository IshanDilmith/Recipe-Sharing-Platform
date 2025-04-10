import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "../src/pages/LoginPage";
import HomePage from "../src/pages/HomePage";
import Recipe from "../src/components/SpecificRecipe";
import ManageRecipies from "../src/pages/ManageRecipies";
import FavouritesPage from "../src/pages/FavouritesPage";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/LogIn" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/recipe-detail" element={<Recipe />} />
        <Route path="/manage-recipies" element={<ManageRecipies />} />
        <Route path="/favourite-recipes" element={<FavouritesPage />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;