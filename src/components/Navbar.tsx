import React, { JSX } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useThemeStore } from '../store/themeStore';

function Navbar(): JSX.Element {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const { darkMode, toggleTheme } = useThemeStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-primary text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">User Management</h1>
        <div className="flex space-x-2">
          <button 
            className="bg-white text-primary font-semibold py-2 px-4 rounded hover:bg-gray-100 transition"
          >
            Create User
          </button>
          <button 
            onClick={handleLogout}
            className="bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
          <button 
            onClick={toggleTheme}
            className="bg-primary text-white font-semibold py-2 px-4 rounded hover:bg-primary-dark transition"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;