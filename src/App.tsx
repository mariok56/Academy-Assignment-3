import React, { JSX } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/login'
import AuthLayout from './layouts/AuthLayout'
import UserGrid from './components/UserGrid'
import { useThemeStore } from './store/themeStore'
import './App.css'

function App(): JSX.Element {
  const { darkMode } = useThemeStore();
  
  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          
          {/* Protected routes */}
          <Route path="/" element={<AuthLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<UserGrid />} />
          </Route>
          
          {/* Catch all - redirect to dashboard or login */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App