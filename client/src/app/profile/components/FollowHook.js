
import { useState } from 'react';

export const useFollow = (user, userName) => {
  const handleFollow = async () => {
    if (!user?.sub) {
      alert("User information is missing.");
      return;
    }

    try {
      const response = await fetch(`/api/admin/${user.sub}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const dataUserName = data.userName;

      const responseUsers = await fetch(`/api/users`);
      const usersData = await responseUsers.json();
      const userProfile = usersData.find(user => user.userName === userName);

      
      if (userProfile.isPublic) {
        const result = await fetch(`/api/follow/follow`, {
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
        
        alert("Follow request successful");
      }
      else {
        const req = await fetch(`/api/follow-request/following/${userName}`);
        
        const followRequestData = await req.json();
        console.log(followRequestData);
        console.log(dataUserName);

        const userProfile = followRequestData.find(user => user.followingUserName === userName);
        if (userProfile) {
          alert("You already sent the request");
          return;
        }
        const result = await fetch(`/api/follow-request/send-request`, {
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
        
        alert("Request sent");

      }
    } catch (error) {
      alert("Error creating follow relationship: " + error.message);
    }
  };

  const handleUnfollow = async () => {
    if (!user?.sub) {
      alert("User information is missing.");
      return;
    }

    try {
      const response = await fetch(`/api/admin/${user.sub}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const dataUserName = data.userName;

      const result = await fetch(`/api/follow/unfollow`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName: dataUserName,
          followingUserName: userName,
        }),
      });

      if (!result.ok) {
        throw new Error('Failed to delete follow relationship');
      }
      
      alert("Follow relationship deleted successfully");
    } catch (error) {
      alert("Error deleting follow relationship: " + error.message);
    }
  };

  return { handleFollow, handleUnfollow };
};

