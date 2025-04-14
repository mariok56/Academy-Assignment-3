import React from 'react';
import DashboardTemplate from '../templates/DashboardTemplate';
import UserList from '../organisms/UserList';

const DashboardPage: React.FC = () => {
  return (
    <DashboardTemplate>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Manage users and their information
        </p>
      </div>
      
      <UserList />
    </DashboardTemplate>
  );
};

export default DashboardPage;