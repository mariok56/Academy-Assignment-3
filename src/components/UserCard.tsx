import React, { JSX } from 'react';
import { User } from '../types/User';

interface UserCardProps {
  user: User;
  darkMode: boolean;
}

function UserCard({ user, darkMode }: UserCardProps): JSX.Element {
  return (
    <div className={`rounded-lg shadow-md overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 flex flex-col`}>
      {/* Circle with initials */}
      <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xl mb-4 mx-auto">
        {user.initials}
      </div>
      
      {/* User information */}
      <div className="w-full text-left">
        <h3 className="text-lg font-semibold">{user.firstName} {user.lastName}</h3>
        <p className="info">Email: {user.email}</p>
        <p className="info">
          Status: <span className={user.status === 'active' ? 'text-green-500' : 'text-red-500'}>{user.status}</span>
        </p>
        <p className="info">Date of Birth: {user.dob}</p>
      </div>

      {/* Buttons */}
      <div className="mt-4 flex justify-end space-x-2">
        <button className="bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark transition">
          Edit
        </button>
        <button className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition">
          Delete
        </button>
      </div>
    </div>
  );
}

export default UserCard;