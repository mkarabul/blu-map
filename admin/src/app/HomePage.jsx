import React from 'react';
import Navbar from './Navbar';
import { Doughnut, Bar, Line, Pie } from 'react-chartjs-2';
import usersData from './data';
import Footer from './Footer';


import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
} from 'chart.js';

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

const getAgeDemographicsData = () => {
  const ageGroups = {
    '18-24': 0,
    '25-34': 0,
    '35-44': 0,
    '45-54': 0,
    '55-64': 0,
    '65+': 0,
  };

  usersData.forEach(user => {
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

// Function to extract data for suspended/unsuspended users for a graph
const getSuspendedUsersData = () => {
  const suspendedCount = usersData.filter(user => user.is_suspended).length;
  const activeCount = usersData.length - suspendedCount;

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
    Transgender: 0,
    Other: 0,
  };

  usersData.forEach(user => {
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
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#E7E9ED'], // Colors for Female, Male, Transgender, Other
      hoverOffset: 4,
    }],
  };
};

// Function to get the data for the reports chart
const getReportsData = () => {
  // Assuming 'amount_of_reports' is a number
  const reportCounts = usersData.map(user => user.amount_of_reports);
  return {
    labels: usersData.map((_, index) => `User ${index + 1}`),
    datasets: [{
      label: 'Reports',
      data: reportCounts,
      // add other dataset properties required by your charting library
    }],
  };
};

// Function to get the data for user creation chart
const getUserCreationData = () => {
  const creationCounts = {}; // e.g., { 'Jan 2021': 20, 'Feb 2021': 25, ... }
  usersData.forEach(user => {
    const monthYear = new Date(user.created_at).toLocaleString('default', { month: 'short', year: 'numeric' });
    creationCounts[monthYear] = (creationCounts[monthYear] || 0) + 1;
  });
  return {
    labels: Object.keys(creationCounts),
    datasets: [{
      label: 'Sign Ups',
      data: Object.values(creationCounts),
    }],
  };
};

const HomePage = ({ toggleTheme, themeClasses, toggleButtonClass }) => {
  const isDarkMode = themeClasses.includes('bg-gray-900');

  const reportsChartData = getReportsData();
  const userCreationChartData = getUserCreationData();
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
          color: '#000000', // Legend text color
        },
      },
      
    },
    scales: {
      x: {
        ticks: {
          color: '#000000', // X-axis ticks color
        },
        grid: {
          color: 'rgba(0,0,0,0.1)', // X-axis grid line color
        },
      },
      y: {
        ticks: {
          color: '#000000', // Y-axis ticks color
        },
        grid: {
          color: 'rgba(0,0,0,0.1)', // Y-axis grid line color
        },
      },
    },
  };

  const userCreationChartOptions = {
    ...chartOptions,
    aspectRatio: 2, // Adjust the aspect ratio for user creation chart
  };
  
  const reportsChartOptions = {
    ...chartOptions,
    aspectRatio: 2, // Adjust the aspect ratio for reports chart
  };
  
  const rowOneChartOptions = {
    ...chartOptions,
    aspectRatio: 1,
  }
  
  
  return (
    <div className={`p-5 min-h-screen ${themeClasses} transition-colors duration-500`}>
      <Navbar toggleTheme={toggleTheme} themeClasses={themeClasses} />

      {/* Content Section */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4'>
        {/* Age Demographics Card */}
        <div className='bg-white shadow rounded p-4'>
            <h3 className='text-xl font-semibold mb-2 text-black'>Age Demographics</h3>
            <div style={{ height: '400px' }}> {/* Adjust the height as needed */}
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

      {/* <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='bg-white shadow rounded p-4'>
            <h3 className='text-xl font-semibold mb-2 text-black'>User Sign Ups</h3>
            <Line data={userCreationChartData} options={userCreationChartOptions} />
        </div>

        <div className='bg-white shadow rounded p-4'>
            <h3 className='text-xl font-semibold mb-2 text-black'>Reports</h3>
            <Bar data={reportsChartData} options={reportsChartOptions} />
        </div>
        </div> */}

        <Footer theme={themeClasses.includes('bg-gray-900') ? 'dark' : 'light'} />

    </div>
  );
};

export default HomePage;
