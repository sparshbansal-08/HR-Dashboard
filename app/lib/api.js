import { mockDepartments, mockRatings } from './mockData';


export async function fetchUserById(id) {
  try {
    const res = await fetch(`https://dummyjson.com/users/${id}`);
    const data = await res.json();
    return { ...data, department: mockDepartments[Math.floor(Math.random() * mockDepartments.length)], rating: mockRatings[Math.floor(Math.random() * mockRatings.length)] };
  } catch (error) {
    console.error('Error fetching user:', error);
        return null;
  }
}

export async function fetchUsers() {
  try {
    const res = await fetch('https://dummyjson.com/users?limit=20', {
      
      cache: 'force-cache',
    });
    const data = await res.json();
    return data.users.map((user, index) => ({
      ...user,
      department: mockDepartments[index % mockDepartments.length],
      rating: mockRatings[index % mockRatings.length],
    }));

  } catch (error) {
    console.error('Error fetching users:', error);
    return [];

  }
}