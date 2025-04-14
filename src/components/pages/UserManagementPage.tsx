import React, { useState } from 'react';
import DashboardTemplate from '../templates/DashboardTemplate';
import UserList from '../organisms/UserList';
import Button from '../atoms/Button';

const UserManagementPage: React.FC = () => {
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);
  
  const handleOpenModal = () => {
    setShowCreateUserModal(true);
  };
  
  const handleCloseModal = () => {
    setShowCreateUserModal(false);
  };
  
  return (
    <DashboardTemplate>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">User Management</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Manage users and their information
          </p>
        </div>
        
        <Button variant="primary" onClick={handleOpenModal}>
          Create User
        </Button>
      </div>
      
      <UserList />
      
      {/* This would be replaced with a proper modal component */}
      {showCreateUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Create User</h2>
            <p>Modal implementation would go here</p>
            <div className="mt-4 flex justify-end">
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </DashboardTemplate>
  );
};

export default UserManagementPage;