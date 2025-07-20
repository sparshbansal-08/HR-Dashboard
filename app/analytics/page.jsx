'use client';

import { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from 'chart.js';

  import { Bar, Pie, Line } from 'react-chartjs-2';
import { fetchUsers } from 'app/lib/api';
import { mockPerformanceHistory } from 'app/lib/mockData'; 




ChartJS.register(
  CategoryScale,
  LinearScale,

  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);


const generateAnalyticsData = (users) => {
  const departmentCounts = {};
   const departmentRatings = {};
      const performanceDistribution = [0, 0, 0, 0, 0];
  
     let totalRating = 0;

 
  const performanceHistory = users.map(() => mockPerformanceHistory());
     const bookmarkTrends = Array(5).fill(0); // Last 5 months
    const months = ['2024-10-01', '2024-11-01', '2024-12-01', '2025-01-01', '2025-02-01'];

  users.forEach((user, index) => {

    
    departmentCounts[user.department] = (departmentCounts[user.department] || 0) + 1;

 
    
      departmentRatings[user.department] = departmentRatings[user.department] || { sum: 0, count: 0 };
      departmentRatings[user.department].sum += user.rating;
    departmentRatings[user.department].count += 1;

    // Performance distribution
    if (user.rating >= 1 && user.rating <= 5) {
      performanceDistribution[Math.floor(user.rating) - 1]++;
    }

    totalRating += user.rating;

  
    const userHistory = performanceHistory[index];
    userHistory.forEach((entry) => {
      const entryMonth = entry.date.slice(0, 7); 
      const monthIndex = months.findIndex((m) => m.slice(0, 7) === entryMonth);
      if (monthIndex !== -1 && entry.rating >= 4) {
        bookmarkTrends[monthIndex]++;
      }
    });
  });


  Object.keys(departmentRatings).forEach((dept) => {
        departmentRatings[dept] = departmentRatings[dept].sum / departmentRatings[dept].count;
  });


  const topDepartment = Object.keys(departmentRatings).reduce(
     (a, b) => (departmentRatings[a] > departmentRatings[b] ? a : b),
    Object.keys(departmentRatings)[0]
  );


  const topPerformers = users
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3)
    .map((user) => ({

      id: user.id,
        firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      performance: user.rating,
      company: { department: user.department },

    }));

  return {
    departments: Object.keys(departmentCounts),
    departmentCounts,

    departmentRatings,
    performanceDistribution,
    totalEmployees: users.length,
    averageRating: totalRating / users.length,
    topDepartment,
    topPerformers,
    bookmarkTrends,
  };
};

export default function AnalyticsPage() {
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);
  const [analyticsData, setAnalyticsData] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const users = await fetchUsers();
        if (users.length === 0) {
          throw new Error('No users fetched');

        }
        const data = generateAnalyticsData(users);
        setAnalyticsData(data);
      } catch (err) {
        setError('Failed to load analytics data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

 

  const getBookmarkTrendsData = () => {
    const labels = ['Oct 2024', 'Nov 2024', 'Dec 2024', 'Jan 2025', 'Feb 2025'];
    return {
      labels,
      datasets: [
        {

          label: 'Bookmarked Employees (Rating ≥ 4)',
          data: analyticsData?.bookmarkTrends || [],
          borderColor: 'rgba(139, 92, 246, 1)',
          backgroundColor: 'rgba(139, 92, 246, 0.6)',
          tension: 0.3,
        },
      ],
    };
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top', labels: { color: 'rgba(255, 255, 255, 0.8)' } },
      title: { display: true, text: 'Department Performance Ratings', color: 'rgba(34, 211, 238, 0.8)', font: { size: 18, weight: 'bold' } },
    },
    scales: {
      y: {

        beginAtZero: true,
        max: 5,
          ticks: { stepSize: 1, color: 'rgba(255, 255, 255, 0.8)' },
        grid: { color: 'rgba(255, 255, 255, 0.2)' },
        title: { display: true, text: 'Average Rating (0-5)', color: 'rgba(255, 255, 255, 0.8)' },
      },
      x: { ticks: { color: 'rgba(255, 255, 255, 0.8)' }, grid: { color: 'rgba(255, 255, 255, 0.2)' } },
    },
    maintainAspectRatio: false,
  };

  const pieOptions = {
    responsive: true,
    plugins: {
       legend: { position: 'top', labels: { color: 'rgba(255, 255, 255, 0.8)' } },
      title: { display: true, text: 'Performance Rating Distribution', color: 'rgba(34, 211, 238, 0.8)', font: { size: 18, weight: 'bold' } },
    },
    maintainAspectRatio: false,
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top', labels: { color: 'rgba(255, 255, 255, 0.8)' } },
      title: { display: true, text: 'Bookmark Trends (Last 5 Months, Rating ≥ 4)', color: 'rgba(34, 211, 238, 0.8)', font: { size: 18, weight: 'bold' } },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { precision: 0, color: 'rgba(255, 255, 255, 0.8)' },
        grid: { color: 'rgba(255, 255, 255, 0.2)' },
        title: { display: true, text: 'Number of Bookmarks', color: 'rgba(255, 255, 255, 0.8)' },
      },
      x: { ticks: { color: 'rgba(255, 255, 255, 0.8)' }, grid: { color: 'rgba(255, 255, 255, 0.2)' } },
    },
    maintainAspectRatio: false,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#141e30] to-[#243b55] p-4 relative text-white overflow-hidden">
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-cyan-400/20 rounded-full blur-2xl animate-pulse" />
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-cyan-300 drop-shadow-md">Analytics Dashboard</h1>
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !analyticsData) 
    {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#141e30] to-[#243b55] p-4 relative text-white overflow-hidden">
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-cyan-400/20 rounded-full blur-2xl animate-pulse" />
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-cyan-300 drop-shadow-md">Analytics Dashboard</h1>
          <div className="bg-red-100/20 border border-red-400/20 text-red-400 px-4 py-3 rounded relative my-4">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {error || 'Failed to load analytics data'}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#141e30] to-[#243b55] p-4 relative text-white overflow-hidden">
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-cyan-400/20 rounded-full blur-2xl animate-pulse" />
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-cyan-300 drop-shadow-md">Analytics Dashboard</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
   
          <div className="bg-white/10 border border-white/20 backdrop-blur-lg rounded-2xl p-6 shadow-xl shadow-cyan-500/30">
            <h2 className="text-xl font-semibold mb-4">Performance Summary</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-500/20 rounded-lg p-4">
                <p className="text-sm text-cyan-400">Average Rating</p>
                <p className="text-3xl font-bold text-cyan-300">{analyticsData.averageRating.toFixed(1)}</p>
              </div>
              <div className="bg-green-500/20 rounded-lg p-4">
                <p className="text-sm text-green-400">Top Department</p>
                <p className="text-3xl font-bold text-green-300">{analyticsData.topDepartment}</p>
              </div>
              <div className="bg-purple-500/20 rounded-lg p-4">
                <p className="text-sm text-purple-400">Total Employees</p>
                <p className="text-3xl font-bold text-purple-300">{analyticsData.totalEmployees}</p>
              </div>
              <div className="bg-yellow-500/20 rounded-lg p-4">
                <p className="text-sm text-yellow-400">Bookmarked</p>
                <p className="text-3xl font-bold text-yellow-300">{analyticsData.bookmarkTrends[analyticsData.bookmarkTrends.length - 1]}</p>
              </div>
            </div>
          </div>

       
       

          <div className="bg-white/10 border border-white/20 backdrop-blur-lg rounded-2xl p-6 shadow-xl shadow-cyan-500/30">
            <h2 className="text-xl font-semibold mb-4">Department Breakdown</h2>
            <div className="h-64">
              <Pie
                data={{
                  labels: analyticsData.departments,
                  datasets: [
                    {
                      label: 'Employees',
                      data: Object.values(analyticsData.departmentCounts),
                      backgroundColor: [
                        'rgba(255, 99, 132, 0.5)',
                        'rgba(54, 162, 235, 0.5)',
                        'rgba(255, 206, 86, 0.5)',
                        'rgba(75, 192, 192, 0.5)',
                        'rgba(153, 102, 255, 0.5)',
                      ],
                  
                      borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                      ],
                      borderWidth: 1,
                    },
                  ],
                }}
                options={{
                  ...pieOptions,
                  plugins: {
                    ...pieOptions.plugins,
                    legend: { position: 'right', labels: { color: 'rgba(255, 255, 255, 0.8)' } },
                    title: { display: true, text: 'Employees by Department', color: 'rgba(34, 211, 238, 0.8)', font: { size: 18, weight: 'bold' } },
                  },
                }}
              />
            </div>
          </div>
        </div>

      
      
        <div className="bg-white/10 border border-white/20 backdrop-blur-lg rounded-2xl p-6 mb-8 shadow-xl shadow-cyan-500/30">
          <h2 className="text-xl font-semibold mb-4">Department Performance</h2>
          <div className="h-80">
            <Bar
              data={{
                labels: analyticsData.departments,
                datasets: [
                  {
                    label: 'Average Rating',
                    data: Object.values(analyticsData.departmentRatings),
                    backgroundColor: 'rgba(34, 211, 238, 0.6)',
                    borderColor: 'rgba(34, 211, 238, 1)',
                    borderWidth: 1,
                  },
                ],
              }}
              options={barOptions}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      
      
          <div className="bg-white/10 border border-white/20 backdrop-blur-lg rounded-2xl p-6 shadow-xl shadow-cyan-500/30">
            <h2 className="text-xl font-semibold mb-4">Performance Distribution</h2>
            <div className="h-64">
              <Pie
                data={{
                  labels: ['Poor (1)', 'Needs Improvement (2)', 'Average (3)', 'Good (4)', 'Excellent (5)'],
                  datasets: [
                    {
                      label: 'Employees',
                      data: analyticsData.performanceDistribution,
                      backgroundColor: [
                        'rgba(255, 99, 132, 0.5)',
                        'rgba(255, 159, 64, 0.5)',
                        'rgba(255, 206, 86, 0.5)',
                        'rgba(75, 192, 192, 0.5)',
                        'rgba(54, 162, 235, 0.5)',
                      ],
                      borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(54, 162, 235, 1)',
                      ],
                      borderWidth: 1,
                    },
                  ],
                }}
                options={pieOptions}
              />
            </div>
          </div>


          <div className="bg-white/10 border border-white/20 backdrop-blur-lg rounded-2xl p-6 shadow-xl shadow-cyan-500/30">
            <h2 className="text-xl font-semibold mb-4">Bookmark Trends</h2>
            <div className="h-64">
              <Line
                data={getBookmarkTrendsData()}
                options={lineOptions}
              />
            </div>
          </div>
        </div>


        <div className="bg-white/10 border border-white/20 backdrop-blur-lg rounded-2xl p-6 shadow-xl shadow-cyan-500/30">
          <h2 className="text-xl font-semibold mb-4">Top Performers</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-white/20">
              <thead className="bg-white/5">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Employee</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Department</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Rating</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/20">
                {analyticsData.topPerformers.map((employee) => (
                  <tr key={employee.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={`https://ui-avatars.com/api/?name=${employee.firstName}+${employee.lastName}`}
                            alt=""
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium">{employee.firstName} {employee.lastName}</div>
                          <div className="text-sm text-gray-400">{employee.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{employee.company.department}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{employee.performance.toFixed(1)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-500/30 text-green-400">
                        Top Performer
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}