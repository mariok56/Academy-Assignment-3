import React from 'react'
import { Navigate, createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import LoginPage from './components/pages/Login'
import DashboardPage from './components/pages/DashboardPage'
import UserManagementPage from './components/pages/UserManagementPage'
import AuthTemplate from './components/templates/AuthTemplate'
import { useThemeStore } from './store/themeStore'
import './App.css'

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/",
    element: (
      <AuthTemplate>
        <Outlet />
      </AuthTemplate>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />
      },
      {
        path: "dashboard",
        element: <DashboardPage />
      },
      {
        path: "users",
        element: <UserManagementPage />
      }
    ]
  },
  {
    path: "*",
    element: <Navigate to="/" replace />
  }
]);

const App: React.FC = () => {
  const { darkMode } = useThemeStore();
  
  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
      <RouterProvider router={router} />
    </div>
  )
}

export default App