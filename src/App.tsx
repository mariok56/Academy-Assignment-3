import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { useThemeStore } from './store/themeStore'
import { router } from './router/router'
import './App.css'

const App: React.FC = () => {
  const { darkMode } = useThemeStore()

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
