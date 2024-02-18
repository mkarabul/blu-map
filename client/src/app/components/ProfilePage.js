import React, { useState, useEffect } from 'react';

function ProfilePage() {
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:8000/api/home')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        if(data && data.users) {
          setUsersData(data.users);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching profile data:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading profiles...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!usersData || usersData.length === 0) {
    return <div>No profile data found.</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Profiles</h1>
      {usersData.map((user, index) => (
        <div key={index} style={{ marginBottom: '20px' }}>
          <div><strong>Username:</strong> {user.username}</div>
          <div><strong>Name:</strong> {user.name}</div>
          <div><strong>Followers:</strong> {user.followers}</div>
          <div><strong>Following:</strong> {user.following}</div>
          <div><strong>Description:</strong> {user.profile_description}</div>
        </div>
      ))}
    </div>
  );
}

export default ProfilePage;
