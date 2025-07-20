import { FaSearch } from 'react-icons/fa';

export default function SearchBar({ onSearch }) {
  return (
    <div className="relative w-full">
      <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        placeholder="Search by name, email, or department..."
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:text-white"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
}
