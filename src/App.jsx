import React from 'react'
import AppRoutes from "../routes/Approutes"
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './contexts/authContext'
import { RecipeProvider } from './contexts/RecipeContext'
import { FavouriteProvider } from './contexts/FavouriteContext'

function App() {

  return (
    <AuthProvider>
      <RecipeProvider>
        <FavouriteProvider>
          <Router>
            <AppRoutes />
          </Router>
        </FavouriteProvider>
      </RecipeProvider>
    </AuthProvider>
    
  )
}

export default App
