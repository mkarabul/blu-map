import React, { useState, useEffect } from 'react';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';

function AdminPage() {
  const [usersData, setUsersData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [view, setView] = useState('search');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    if (event.target.value === '') {
      setFilteredUsers(usersData);
    } else {
      setFilteredUsers(usersData.filter(user => user.username.toLowerCase().includes(event.target.value.toLowerCase())));
    }
  };

  useEffect(() => {
    fetch('http://localhost:8000/api/home')
      .then(response => response.json())
      .then(data => {
        setUsersData(data.users);
        setFilteredUsers(data.users); // Initialize filteredUsers with all users
      })
      .catch(error => console.error('Error fetching profile data:', error));
  }, []);

  const handleSuspend = (username) => {
    alert(`user: ${username} suspended`);
  };

  const handleDelete = (username) => {
    alert(`user: ${username} deleted`);
  };


  const handleUnsuspend = (username) => {
    alert(`user: ${username} unsuspended`);
  };

  const getGenderDistribution = (users) => {
    const genderCounts = users.reduce((acc, user) => {
      acc[user.gender] = (acc[user.gender] || 0) + 1;
      return acc;
    }, {});
  
    return {
      labels: Object.keys(genderCounts),
      datasets: [{
        label: 'Gender Distribution',
        data: Object.values(genderCounts),
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
        borderWidth: 1,
      }]
    };
  };

  const genderChartData = getGenderDistribution(usersData);


  const styles = {
    pageContainer: {
      padding: '20px',
      fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
      backgroundColor: '#007bff', // Set the background to blue
      minHeight: '100vh', // Ensure full vertical height
      color: 'white', // Text color contrast against the blue background
    },
    title: {
      color: 'white',
      textAlign: 'center',
      marginBottom: '20px',
      fontSize: '24px',
      fontWeight: 'bold',
    },
    navBar: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '20px',
    },
    navButton: {
      padding: '10px 20px',
      fontSize: '16px',
      margin: '0 10px',
      cursor: 'pointer',
      backgroundColor: '#0056b3',
      border: 'none',
      borderRadius: '5px',
      color: 'black',

    },
    searchInput: {
      marginBottom: '20px',
      padding: '10px',
      fontSize: '16px',
      border: '2px solid #0056b3',
      borderRadius: '5px',
      color: 'black',
    },
    card: {
      marginBottom: '20px',
      backgroundColor: '#ffffff',
      color: 'black',
      borderRadius: '5px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    cardTitle: { // New style for card titles
      backgroundColor: '#0056b3',
      color: 'white',
      borderRadius: '5px 5px 0 0', // Rounded corners on the top
      padding: '10px',
      fontSize: '18px',
      fontWeight: 'bold',
    },
    cardBody: {
      padding: '20px',
    },
    cardText: {
      marginBottom: '10px',
      lineHeight: '1.5',
    },
  };
  

  return (
    <div style={styles.pageContainer}>
      <h1 style={styles.title}>Admin Dashboard</h1>
      <div style={styles.navBar}>
        <button style={styles.navButton} onClick={() => setView('search')}>Search Users</button>
        <button style={styles.navButton} onClick={() => setView('general')}>General Admin</button>
      </div>
      {view === 'search' && (
        <>
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={handleSearch}
            style={styles.searchInput}
          />
         {filteredUsers.map((user, index) => (
          <div key={index} style={styles.card}>
            <div style={styles.cardTitle}>{user.name} ({user.username})</div>
            <div style={styles.cardBody}>
              <p style={styles.cardText}>Followers: {user.followers} - Following: {user.following}</p>
              <p style={styles.cardText}>Description: {user.profile_description}</p>
              <p style={styles.cardText}>Created At: {user.created_at} - Gender: {user.gender} - Phone: {user.phone_number}</p>
              <p style={styles.cardText}>Age: {user.age} - Reports: {user.amount_of_reports}</p>
              <p style={styles.cardText}>Suspended: {user.is_suspended ? 'Yes' : 'No'} - Deleted: {user.is_deleted ? 'Yes' : 'No'}</p>
              {user.is_suspended ? (
                <button onClick={() => handleUnsuspend(user.username)} style={{ ...styles.navButton, backgroundColor: '#28a745' }}>Unsuspend</button>
              ) : (
                <button onClick={() => handleSuspend(user.username)} style={{ ...styles.navButton, backgroundColor: '#ffc107' }}>Suspend</button>
              )}
              <button onClick={() => handleDelete(user.username)} style={{ ...styles.navButton, backgroundColor: '#dc3545', marginLeft: '10px' }}>Delete</button>
            </div>
          </div>
        ))}

        </>
      )}
      {view === 'general' && (
         <div style={styles.pageContainer}>
         <h1 style={styles.title}>Admin Dashboard</h1>
         <div style={styles.navBar}>
           {/* Navigation buttons */}
         </div>
   
         {view === 'general' && (
           <div style={{ width: '400px', height: '300px' }}>
           <Doughnut data={genderChartData} />
          </div>
         )}
   
       </div>
      )}
    </div>
  );
}

export default AdminPage;
