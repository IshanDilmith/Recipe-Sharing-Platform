import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "../src/pages/LoginPage";
import HomePage from "../src/pages/HomePage";
import Recipe from "../src/components/SpecificRecipe";
import ManageRecipies from "../src/pages/ManageRecipies";


function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/LogIn" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/recipe-detail" element={<Recipe />} />
        <Route path="/manage-recipies" element={<ManageRecipies />} />


      </Routes>
    </Router>
  );
}

export default AppRoutes;