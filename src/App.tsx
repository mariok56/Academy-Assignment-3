import React from 'react'
import { Navigate, createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/login'
import AuthLayout from './layouts/AuthLayout'
import UserGrid from './components/UserGrid'
import { useThemeStore } from './store/themeStore'
import './App.css'

interface AppProps {}

const router = createBrowserRouter(
  [
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/",
      element: <AuthLayout />,
      children: [
        {
          index: true,
          element: <Navigate to="/dashboard" replace />
        },
        {
          path: "dashboard",
          element: <UserGrid />
        }
      ]
    },
    {
      path: "*",
      element: <Navigate to="/" replace />
    }
  ],
  {
    future: {
      v7_relativeSplatPath: true,
    }
  }
);

const App: React.FC<AppProps> = () => {
  const { darkMode } = useThemeStore();
  
  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
      <RouterProvider router={router} />
    </div>
  )
}

export default App