import React, { useState, useEffect, JSX } from 'react';
import { useNavigate } from 'react-router-dom';
import UserCard from './UserCard';
import SearchBar from './SearchBar';
import { User } from '../types/User';
import { useAuthStore } from '../store/authStore';
import { useThemeStore } from '../store/themeStore';

function UserGrid(): JSX.Element {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  
  const { accessToken, logout, checkAuth } = useAuthStore();
  const { darkMode } = useThemeStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
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
        
        // Transform API users to match our User interface
        const transformedUsers = data.result.data.users.map((user: any) => ({
          id: parseInt(user.id),
          firstName: user.firstName,
          lastName: user.lastName || '',
          initials: getInitials(user.firstName, user.lastName),
          email: user.email,
          status: user.status.toLowerCase(),
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
    };
    
    fetchUsers();
  }, [searchTerm, accessToken, checkAuth, logout, navigate]);

  // Helper function to get initials
  const getInitials = (firstName: string, lastName?: string): string => {
    const firstInitial = firstName.charAt(0);
    const lastInitial = lastName ? lastName.charAt(0) : '';
    return `${firstInitial}${lastInitial}`.toUpperCase();
  };

  return (
    <div>
      <SearchBar 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        darkMode={darkMode}
      />
      
      {isLoading ? (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : error ? (
        <div className={`p-4 rounded-md ${darkMode ? 'bg-red-900 text-red-100' : 'bg-red-100 text-red-700'}`}>
          {error}
        </div>
      ) : users.length === 0 ? (
        <div className={`p-4 rounded-md ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
          No users found matching your search criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {users.map(user => (
            <UserCard key={user.id} user={user} darkMode={darkMode} />
          ))}
        </div>
      )}
    </div>
  );
}

export default UserGrid;