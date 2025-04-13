export interface User {
    id: number;
    firstName: string;
    lastName: string;
    initials: string;
    email: string;
    status: 'active' | 'locked'; // Using a union type for better type safety
    dob: string;
  }