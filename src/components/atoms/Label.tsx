import React from 'react';
import { useThemeStore } from '../../store/themeStore';

interface LabelProps {
  htmlFor?: string;
  children: React.ReactNode;
  required?: boolean;
}

const Label: React.FC<LabelProps> = ({ 
  htmlFor, 
  children, 
  required = false 
}) => {
  const { darkMode } = useThemeStore();
  
  return (
    <label 
      htmlFor={htmlFor} 
      className={`block mb-2 text-sm font-medium ${
        darkMode ? 'text-gray-200' : 'text-gray-700'
      }`}
    >
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
};

export default Label;