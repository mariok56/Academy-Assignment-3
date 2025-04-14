import React, { ReactNode } from 'react';
import Navbar from '../organisms/Navbar';
import { useThemeStore } from '../../store/themeStore';

interface DashboardTemplateProps {
  children: ReactNode;
}

const DashboardTemplate: React.FC<DashboardTemplateProps> = ({ children }) => {
  const { darkMode } = useThemeStore();
  
  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
      <Navbar />
      <main className="container mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  );
};

export default DashboardTemplate;
