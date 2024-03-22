import { useState } from 'react';

export const useFollow = (user, userName) => {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollow = async () => {
    if (!user?.sub) {
      alert("User information is missing.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/admin/${user.sub}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const dataUserName = data.userName;

      const result = await fetch(`http://localhost:5000/api/follow/follow`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName: dataUserName,
          followingUserName: userName,
        }),
      });
  
      if (!result.ok) {
        throw new Error('Failed to create follow relationship');
      }
      
      alert("Follow relationship created successfully");
      setIsFollowing(true);
    } catch (error) {
      alert("Error creating follow relationship: " + error.message);
    }
  };

  return { isFollowing, handleFollow };
};
