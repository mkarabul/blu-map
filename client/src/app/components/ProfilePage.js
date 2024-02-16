import React, { useState, useEffect } from 'react';

function ProfilePage() {
  const [profileData, setProfileData] = useState(null);
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
        setProfileData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching profile data:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading profile...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!profileData) {
    return <div>No profile data found.</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Profile</h1>
      <div><strong>Username:</strong> {profileData.username}</div>
      <div><strong>Name:</strong> {profileData.name}</div>
      <div><strong>Followers:</strong> {profileData.followers}</div>
      <div><strong>Following:</strong> {profileData.following}</div>
      <div><strong>Description:</strong> {profileData.profile_description}</div>
    </div>
  );
}

export default ProfilePage;
