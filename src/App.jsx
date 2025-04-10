import React from 'react'
import AppRoutes from "../routes/Approutes"
import { AuthProvider } from './contexts/AuthContext'
import { RecipeProvider } from './contexts/RecipeContext'
import { FavouriteProvider } from './contexts/FavouriteContext'

function App() {

  return (
    <AuthProvider>
      <RecipeProvider>
        <FavouriteProvider>
            <AppRoutes />
        </FavouriteProvider>
      </RecipeProvider>
    </AuthProvider>
    
  )
}

export default App
