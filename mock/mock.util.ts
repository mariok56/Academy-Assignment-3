import jwt from 'jsonwebtoken';

import { GenerateTokenParams } from './mock.type';

export const generateResponse = <T>(data: T, status = 200, message = 'success') => {
  return {
    status,
    result: {
      data,
      message,
    },
  };
};

export const getUnAuthorizedResponse = () => generateResponse({}, 401, 'Unauthorized!');

export const generateToken = ({ email, password, expiresIn }: GenerateTokenParams) => {
  return jwt.sign(
    {
      exp: expiresIn,
      data: { email, password },
    },
    'secret',
  );
};

export const validateToken = (token?: string) => {
  try {
    if (!token) {
      return false;
    }
    const decoded = jwt.verify(token.replace('Bearer ', ''), 'secret');
    return !!decoded;
  } catch {
    return false;
  }
};
