"use client";
import React, { useState, useEffect } from 'react';
import SearchPage from './components/SearchPage';
import { Bar, Pie, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement, ArcElement } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement
);

const HomePage = ({ themeClasses }) => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState([]);
  const [theme, setTheme] = useState('dark');
  const [isLoadingTheme, setIsLoadingTheme] = useState(true);
  const [hasAccess, setAccess] = useState(false);

  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/users/auth0|65df5cc6f0c1754329eca25c`);
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        const isDarkMode = data.isDarkMode;
        setTheme(isDarkMode ? 'dark' : 'light');
        document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
      } catch (error) {
        console.error('Error fetching user data for theme:', error);
      } finally {
        setIsLoadingTheme(false);
      }
    };

    fetchTheme();
  }, []);

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/users/');
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setUserData(data);
        const currentUserData = data.find(user => user.userId === 'auth0|65df5cc6f0c1754329eca25c');
        if (currentUserData && currentUserData.isAdmin) {
          setAccess(true);
        } else {
          setUserData(null);
          throw new Error("Not Admin");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsersData();
  }, []);
  
  const getAgeDemographicsData = () => {
    const ageGroups = {
      '18-24': 0,
      '25-34': 0,
      '35-44': 0,
      '45-54': 0,
      '55-64': 0,
      '65+': 0,
    };

    userData.forEach(user => {
      const age = user.age;
      if (age >= 18 && age <= 24) ageGroups['18-24']++;
      else if (age >= 25 && age <= 34) ageGroups['25-34']++;
      else if (age >= 35 && age <= 44) ageGroups['35-44']++;
      else if (age >= 45 && age <= 54) ageGroups['45-54']++;
      else if (age >= 55 && age <= 64) ageGroups['55-64']++;
      else if (age >= 65) ageGroups['65+']++;
    });

    return {
      labels: Object.keys(ageGroups),
      datasets: [{
        label: 'Age Demographics',
        data: Object.values(ageGroups),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)', // 18-24
          'rgba(54, 162, 235, 0.6)', // 25-34
          'rgba(255, 206, 86, 0.6)', // 35-44
          'rgba(75, 192, 192, 0.6)', // 45-54
          'rgba(153, 102, 255, 0.6)', // 55-64
          'rgba(255, 159, 64, 0.6)', // 65+
        ],
      }],
    };
  };

  const getSuspendedUsersData = () => {
    const suspendedCount = userData.filter(user => user.isSuspended).length;
    const activeCount = userData.length - suspendedCount;

    return {
      labels: ['Suspended', 'Active'],
      datasets: [{
        label: 'User Status',
        data: [suspendedCount, activeCount],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)', // Color for Suspended
          'rgba(54, 162, 235, 0.6)', // Color for Active
        ],
      }],
    };
  };

  const getGenderDistributionData = () => {
    const genderCounts = {
      Female: 0,
      Male: 0,
      Other: 0,
    };

    userData.forEach(user => {
      if (genderCounts.hasOwnProperty(user.gender)) {
        genderCounts[user.gender]++;
      } else {
        genderCounts['Other']++; // Increment 'Other' if gender is not recognized
      }
    });

    return {
      labels: Object.keys(genderCounts),
      datasets: [{
        label: 'Gender Distribution',
        data: Object.values(genderCounts),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'], // Colors for Female, Male, Other
        hoverOffset: 4,
      }],
    };
  };

  const ageDemographicsChartData = getAgeDemographicsData();
  const suspendedUsersChartData = getSuspendedUsersData();
  const genderDistributionData = getGenderDistributionData();

  const chartOptions = {
    responsive: true,
    animation: {
      duration: 2000,
      easing: 'easeInOutCubic',
    },
    plugins: {
      legend: {
        labels: {
          color: '#000000',
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#000000',
        },
        grid: {
          color: 'rgba(0,0,0,0.1)',
        },
      },
      y: {
        ticks: {
          color: '#000000',
        },
        grid: {
          color: 'rgba(0,0,0,0.1)',
        },
      },
    },
  };

  const rowOneChartOptions = {
    ...chartOptions,
    aspectRatio: 1,
  };

  if (loading) {
    return (
      <div className="p-5 min-h-screen flex justify-center items-center">
        <h2 className="text-xl font-bold">Checking access permissions...</h2>
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div className="p-5 min-h-screen flex justify-center items-center">
        <h2 className="text-xl font-bold">You do not have permission to access this page.</h2>
      </div>
    );
  }
  if (!loading && hasAccess) {
  return (
    <div className={`p-5 min-h-screen ${themeClasses} transition-colors duration-500`}>

      {/* Content Section */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4'>
        {/* Age Demographics Card */}
        <div className='bg-white shadow rounded p-4'>
          <h3 className='text-xl font-semibold mb-2 text-black'>Age Demographics</h3>
          <div style={{ height: '400px' }}>
            <Bar data={ageDemographicsChartData} options={rowOneChartOptions} />
          </div>
        </div>

        {/* Gender Demographics Card */}
        <div className='bg-white shadow rounded p-4'>
          <h3 className='text-xl font-semibold mb-2 text-black'>Gender Demographics</h3>
          <Pie data={genderDistributionData} options={rowOneChartOptions} />
        </div>

        {/* User Status Card */}
        <div className='bg-white shadow rounded p-4'>
          <h3 className='text-xl font-semibold mb-2 text-black'>User Status</h3>
          <Doughnut data={suspendedUsersChartData} options={rowOneChartOptions} />
        </div>
      </div>
      <SearchPage></SearchPage>

    </div>
  );
};

};
export default HomePage;
