import React from 'react';

interface AvatarProps {
  initials: string;
  size?: 'sm' | 'md' | 'lg';
}

const Avatar: React.FC<AvatarProps> = ({ 
  initials, 
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-12 h-12 text-base',
    lg: 'w-16 h-16 text-xl',
  };
  
  return (
    <div className={`${sizeClasses[size]} rounded-full bg-primary flex items-center justify-center text-white font-bold`}>
      {initials}
    </div>
  );
};

export default Avatar;