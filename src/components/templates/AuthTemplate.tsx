import React, { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useThemeStore } from '../../store/themeStore';

interface AuthTemplateProps {
  children: ReactNode;
}

const AuthTemplate: React.FC<AuthTemplateProps> = ({ children }) => {
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
    return null; // Will be redirected in useEffect
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
      {children}
    </div>
  );
};

export default AuthTemplate;