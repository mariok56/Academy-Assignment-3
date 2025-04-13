import { MockMethod } from 'vite-plugin-mock';

import { ApiHeaders } from './mock.type';
import { generateResponse, getUnAuthorizedResponse, validateToken } from './mock.util';
import usersData from './users.json';

const mock: MockMethod[] = [
  {
    url: '/api/users',
    method: 'get',
    timeout: 2000,
    response: ({ query, headers }: { query: { search?: string }; headers: ApiHeaders }) => {
      if (validateToken(headers.authorization)) {
        let users = [...usersData.users];

        const { search } = query;
        const lowerCaseSearch = search?.toLowerCase() || '';

        if (lowerCaseSearch) {
          users = usersData.users.filter(
            (user) =>
              user.firstName.toLowerCase().includes(lowerCaseSearch) ||
              (user.lastName && user.lastName.toLowerCase().includes(lowerCaseSearch)) ||
              user.email.toLowerCase().includes(lowerCaseSearch),
          );
        }
        return generateResponse({ users });
      }
      return getUnAuthorizedResponse();
    },
  },
];

export default mock;
