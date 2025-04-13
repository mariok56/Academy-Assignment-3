import React, { useEffect } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAuthStore } from '../store/authStore';
import { useThemeStore } from '../store/themeStore';

interface AuthLayoutProps {}

const AuthLayout: React.FC<AuthLayoutProps> = () => {
  const { checkAuth, isAuthenticated } = useAuthStore();
  const { darkMode } = useThemeStore();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if token is valid on component mount
    const isValid = checkAuth();
    if (!isValid) {
      navigate('/login');
    }
  }, [checkAuth, navigate]);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
      <Navbar />
      <main className="container mx-auto px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;