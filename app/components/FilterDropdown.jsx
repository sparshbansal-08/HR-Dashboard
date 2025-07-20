import { useState } from 'react';
import { mockDepartments, mockRatings } from '@/lib/mockData';

export default function FilterDropdown({ onFilter }) {
  const [departmentFilters, setDepartmentFilters] = useState([]);
  const [ratingFilters, setRatingFilters] = useState([]);


  const handleApply = () => {
    onFilter({ department: departmentFilters, rating: ratingFilters });
  };


       const toggleFilter = (value, setFilters, filters) => {
    setFilters(
      filters.includes(value)
        ? filters.filter((v) => v !== value)
        : [...filters, value]
    );
  };

  return (

    <div 
         className="w-full bg-white/10 border border-white/20 backdrop-blur-lg rounded-2xl p-4 shadow-xl shadow-cyan-500/30 text-white">
      <h3 className="text-sm font-semibold mb-2 text-cyan-300 drop-shadow-md">Filter by Department</h3>
      <div className="grid grid-cols-2 gap-1 text-sm">
        {mockDepartments.map((dept) => (
          <label key={dept} className="flex items-center gap-2 hover:text-cyan-400 transition-colors duration-200">
            <input
              type="checkbox"
              value={dept}
              checked={departmentFilters.includes(dept)}
              onChange={() => toggleFilter(dept, setDepartmentFilters, departmentFilters)}
              className="text-cyan-400 focus:ring-cyan-400"
            />
            {dept}


          </label>
        ))}
      </div>

      <h3 className="text-sm font-semibold mt-4 mb-2 text-cyan-300 drop-shadow-md">Filter by Rating</h3>
      <div className="grid grid-cols-2 gap-1 text-sm">
        {mockRatings.map((rating) => (
          <label key={rating} className="flex items-center gap-2 hover:text-cyan-400 transition-colors duration-200">
            <input
            
              type="checkbox"
              value={rating}
              checked={ratingFilters.includes(rating)}
              onChange={() => toggleFilter(rating, setRatingFilters, ratingFilters)}
              className="text-cyan-400 focus:ring-cyan-400"
            />
            {rating} Stars
          </label>
        ))}
      </div>

      <button
        className="mt-4 w-full bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white py-2 rounded-xl transition duration-300 hover:shadow-[0_0_20px_#0ff] text-sm"
        onClick={handleApply}
      >
        Apply Filters
      </button>
    </div>
  );
}