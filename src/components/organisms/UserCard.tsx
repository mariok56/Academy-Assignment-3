import React, { useCallback } from 'react';
import { useThemeStore } from '../../store/themeStore';
import Avatar from '../atoms/Avatar';
import UserInfo from '../molecules/UserInfo';
import ActionButtons from '../molecules/ActionButtons';
import { User } from '../../types/User';

interface UserCardProps {
  user: User;
  onDelete: (userId: number) => void;
}

const UserCard: React.FC<UserCardProps> = React.memo(({ user, onDelete }) => {
  const { darkMode } = useThemeStore();
  
  const handleDelete = useCallback(() => {
    onDelete(user.id);
  }, [user.id, onDelete]);
  
  const handleEdit = useCallback(() => {
    // Edit functionality would go here
    console.log('Edit user:', user.id);
  }, [user.id]);

  return (
    <div className={`rounded-lg shadow-md overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 flex flex-col`}>
      {/* Avatar with initials */}
      <div className="flex justify-center mb-4">
        <Avatar initials={user.initials} size="lg" />
      </div>
      
      {/* User information */}
      <UserInfo
        firstName={user.firstName}
        lastName={user.lastName}
        email={user.email}
        status={user.status}
        dob={user.dob}
      />

      {/* Action buttons */}
      <ActionButtons 
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
});

UserCard.displayName = 'UserCard';

export default UserCard;