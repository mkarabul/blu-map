"use client";
import React, { useState, useEffect } from 'react';
import { Bar, Pie, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement, ArcElement, TimeScale } from 'chart.js';
import { useUser } from "@auth0/nextjs-auth0/client";
import chartOptions from './chartOptions';
import getTheme from './themeOptions';
import { Line } from 'react-chartjs-2';

import 'chartjs-adapter-date-fns'; // Import the adapter

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
  TimeScale // Register TimeScale
);

const ChartsPage = ({ themeClasses }) => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState([]);
  const [theme] = useState(getTheme());
  const { user } = useUser();
  const [socialTripData, setSocialTripData] = useState([]);

  const userID = user?.sub;

  useEffect(() => {    
    const fetchUsersData = async () => {
      if (typeof window !== 'undefined') {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
      }
      try {
        const response = await fetch('/api/admin/');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        
        const data = await response.json();
        setUserData(data);

        const response2 = await fetch('/api/profile-trip/');
        if (!response2.ok) {
          throw new Error('Failed to fetch data');
        }
        
        const data2 = await response.json();
        setSocialTripData(data2);

      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); 
      }
    };
    fetchUsersData();
  }, [userID]);




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


 const getTimeSeriesData = () => {
  const sortedData = [...userData].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  const counts = sortedData.reduce((acc, cur) => {
    const date = cur.createdAt.split('T')[0]; // Get only the date part
    if (acc.length > 0 && acc[acc.length - 1].x === date) {
      acc[acc.length - 1].y += 1;
    } else {
      acc.push({ x: date, y: acc.length > 0 ? acc[acc.length - 1].y + 1 : 1 });
    }
    return acc;
  }, []);

  return {
    labels: counts.map(point => point.x),
    datasets: [{
      label: 'Users Created Over Time',
      data: counts,
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
    }]
  };
};

const getProfileTripTimeSeriesData = () => {
  const sortedData = [...socialTripData].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  const counts = sortedData.reduce((acc, cur) => {
    const date = cur.createdAt.split('T')[0]; // Get only the date part
    if (acc.length > 0 && acc[acc.length - 1].x === date) {
      acc[acc.length - 1].y += 1;
    } else {
      acc.push({ x: date, y: acc.length > 0 ? acc[acc.length - 1].y + 1 : 1 });
    }
    return acc;
  }, []);

  return {
    labels: counts.map(point => point.x),
    datasets: [{
      label: 'Profile Trips Over Time',
      data: counts,
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    }]
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
        genderCounts['Other']++;
      }
    });

    return {
      labels: Object.keys(genderCounts),
      datasets: [{
        label: 'Gender Distribution',
        data: Object.values(genderCounts),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'], 
        hoverOffset: 4,
      }],
    };
  };
  const getVerificationStatusData = () => {
    const verifiedCount = userData.filter(user => user.isVerified).length;
    const unverifiedCount = userData.length - verifiedCount;

    return {
      labels: ['Verified', 'Unverified'],
      datasets: [{
        label: 'Verification Status',
        data: [verifiedCount, unverifiedCount],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)', // Color for Verified
          'rgba(255, 99, 132, 0.6)', // Color for Unverified
        ],
      }],
    };
  };

  const rowOneChartOptions = {
    ...chartOptions,
    aspectRatio: 1,
  };

  const xyChartOptions = {
    responsive: true,
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day'
        },
        title: {
          display: true,
          text: 'Date'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Number of Users'
        }
      }
    }
  };

  return (
    <div className={`p-1 min-h-screen ${themeClasses} transition-colors duration-1`}>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4'>
        <div className='bg-white shadow rounded p-4'>
          <h3 className='text-xl font-semibold mb-2 text-black'>Age Demographics</h3>
          <div style={{ height: '300px' }}>
            <Bar data={getAgeDemographicsData()} options={rowOneChartOptions} />
          </div>
        </div>
        <div className='bg-white shadow rounded p-4'>
          <h3 className='text-xl font-semibold mb-2 text-black'>Gender Demographics</h3>
          <div style={{ height: '300px' }}>
            <Pie data={getGenderDistributionData()} options={rowOneChartOptions} />
          </div>
        </div>
        <div className='bg-white shadow rounded p-4'>
          <h3 className='text-xl font-semibold mb-2 text-black'>User Status</h3>
          <div style={{ height: '300px' }}>
            <Doughnut data={getSuspendedUsersData()} options={rowOneChartOptions} />
          </div>
        </div>
        <div className='bg-white shadow rounded p-4'>
          <h3 className='text-xl font-semibold mb-2 text-black'>Verification Status</h3>
          <div style={{ height: '300px' }}>
            <Bar data={getVerificationStatusData()} options={rowOneChartOptions} />
          </div>
        </div>
      </div>
  
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
        <div className='bg-white shadow rounded p-6'>
          <h3 className='text-xl font-semibold mb-2 text-black'>User Creation Time Series</h3>
          <div style={{ height: '300px', width: '100%' }}>
            <Line data={getTimeSeriesData()} options={xyChartOptions} />
          </div>
        </div>
        <div className='bg-white shadow rounded p-6'>
          <h3 className='text-xl font-semibold mb-2 text-black'>Profile Trip Time Series</h3>
          <div style={{ height: '300px', width: '100%' }}>
            <Line data={getProfileTripTimeSeriesData()} options={xyChartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
  
  };
export default ChartsPage;

