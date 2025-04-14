import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { User } from '../../types/User';
import SearchBar from '../molecules/SearchBar';
import UserCard from './UserCard';
import Spinner from '../atoms/Spinner';

interface UserListProps {}

const UserList: React.FC<UserListProps> = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  
  const { accessToken, logout, checkAuth } = useAuthStore();
  const navigate = useNavigate();

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    setError('');
    
    // Verify token is valid before making request
    if (!checkAuth()) {
      navigate('/login');
      return;
    }
    
    try {
      const url = searchTerm 
        ? `/api/users?search=${encodeURIComponent(searchTerm)}` 
        : '/api/users';
        
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      
      if (!response.ok) {
        // Handle HTTP errors
        if (response.status === 401) {
          setError('Unauthorized! Your session has expired. Please login again.');
          logout();
          navigate('/login');
          return;
        }
        throw new Error(`Server returned ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      const transformedUsers = data.result.data.users.map((user: any) => ({
        id: parseInt(user.id),
        firstName: user.firstName,
        lastName: user.lastName || '',
        initials: getInitials(user.firstName, user.lastName),
        email: user.email,
        status: user.status.toLowerCase() === 'active' ? 'active' : 'locked',
        dob: user.dateOfBirth
      }));
      
      setUsers(transformedUsers);
    } catch (err) {
      if (err instanceof Error) {
        setError(`Failed to fetch users: ${err.message}`);
      } else {
        setError('Failed to fetch users. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [searchTerm, accessToken, checkAuth, logout, navigate]);
  
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  
  const getInitials = (firstName: string, lastName?: string): string => {
    const firstInitial = firstName.charAt(0);
    const lastInitial = lastName ? lastName.charAt(0) : '';
    return `${firstInitial}${lastInitial}`.toUpperCase();
  };
  
  // Delete user handler
  const handleDeleteUser = useCallback((userId: number) => {
    setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
  }, []);

  // Render the content based on loading, error, and users state
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center py-10">
          <Spinner size="lg" />
        </div>
      );
    }

    if (error) {
      return (
        <div className="p-4 rounded-md bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-100">
          {error}
        </div>
      );
    }

    if (users.length === 0) {
      return (
        <div className="p-4 rounded-md bg-gray-100 dark:bg-gray-800">
          No users found matching your search criteria.
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {users.map(user => (
          <UserCard 
            key={user.id} 
            user={user} 
            onDelete={handleDeleteUser}
          />
        ))}
      </div>
    );
  };

  return (
    <div>
      {/* SearchBar is always rendered at the top, regardless of other conditions */}
      <div className="mb-6">
        <SearchBar 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </div>
      
      {/* Content area changes based on state */}
      {renderContent()}
    </div>
  );
};

export default UserList;