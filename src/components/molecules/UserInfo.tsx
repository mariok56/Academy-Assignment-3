import React from 'react';
import StatusBadge from '../atoms/StatusBadge';

interface UserInfoProps {
  firstName: string;
  lastName: string;
  email: string;
  status: 'active' | 'locked';
  dob: string;
}

const UserInfo: React.FC<UserInfoProps> = ({
  firstName,
  lastName,
  email,
  status,
  dob,
}) => {
  return (
    <div className="w-full text-left">
      <h3 className="text-lg font-semibold">{firstName} {lastName}</h3>
      <p className="info">Email: {email}</p>
      <p className="info">
        Status: <StatusBadge status={status} />
      </p>
      <p className="info">Date of Birth: {dob}</p>
    </div>
  );
};

export default UserInfo;