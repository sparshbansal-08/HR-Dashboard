import { useState } from 'react';

export function useSearch(data) {
  const [query, setQuery] = useState('');

  const [filters, setFilters] = useState({ department: [], rating: [] });

  const filteredData = data
    ? data.filter((user) => {

     
        const firstName = user.firstName || '';
        const lastName = user.lastName || '';

        const email = user.email || '';
        const department = user.department || '';

              const matchesQuery =
          firstName.toLowerCase().includes(query.toLowerCase()) ||
          lastName.toLowerCase().includes(query.toLowerCase()) ||
          
          email.toLowerCase().includes(query.toLowerCase()) ||
          department.toLowerCase().includes(query.toLowerCase());

        const matchesDepartment =
          filters.department.length === 0 || filters.department.includes(department);
          const matchesRating =
          filters.rating.length === 0 || filters.rating.includes(Math.round(Number(user.rating)));
        

        return matchesQuery && matchesDepartment && matchesRating;
      })
    : [];

  return { filteredData, setQuery, setFilters };
}