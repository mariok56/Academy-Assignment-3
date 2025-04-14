import React from 'react'
import { Navigate, Outlet, createBrowserRouter } from 'react-router-dom'
import LoginPage from '../components/pages/Login'
import DashboardPage from '../components/pages/DashboardPage'
import UserManagementPage from '../components/pages/UserManagementPage'
import AuthTemplate from '../components/templates/AuthTemplate'

export const router = createBrowserRouter([
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
])
