import React, { ReactNode } from 'react';
import { useThemeStore } from '../../store/themeStore';
import Label from '../atoms/Label';
import Input from '../atoms/Input';

interface FormGroupProps {
  label: string;
  id?: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  children?: ReactNode;
}

const FormGroup: React.FC<FormGroupProps> = ({
  label,
  id,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  error,
  children,
}) => {
  const { darkMode } = useThemeStore();
  
  return (
    <div className="mb-4">
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      
      {children || (
        <Input
          type={type}
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
        />
      )}
      
      {error && (
        <p className={`mt-1 text-sm text-red-600 ${darkMode ? 'text-red-400' : ''}`}>
          {error}
        </p>
      )}
    </div>
  );
};

export default FormGroup;