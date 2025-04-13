import React, { JSX } from 'react';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  darkMode: boolean;
}

function SearchBar({ searchTerm, setSearchTerm, darkMode }: SearchBarProps): JSX.Element {
  return (
    <div className="mb-6 flex justify-start">
      <input
        type="text"
        placeholder="Search users..."
        className={`w-full sm:w-64 p-2 border rounded-md ${
          darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
        } info`}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;