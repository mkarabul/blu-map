// FollowRequests.js
"use client";
import React, { useState, useEffect } from 'react';
import { useUser } from "@auth0/nextjs-auth0/client";

function FollowRequests({ username }) {
  const [requests, setRequests] = useState([]);
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(true);

  // Fetch follow requests on component mount
  useEffect(() => {
    const fetchFollowRequests = async () => {
      setIsLoading(true);
      try {
        const userNameResponse = await fetch(`/api/admin/${user?.sub}`);
        const { userName } = await userNameResponse.json();
        
        const response = await fetch(`/api/follow-request/following/${userName}`);
        if (!response.ok) throw new Error('Failed to fetch follow requests');
        const data = await response.json();
        setRequests(data);
      } catch (error) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFollowRequests();
  }, [user]);

  const handleAccept = async (requestId, followingUserName) => {
    try {
      const userNameResponse = await fetch(`/api/admin/${user?.sub}`);
      const { userName } = await userNameResponse.json();

      const response = await fetch('/api/follow/follow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName: followingUserName,
          followingUserName: userName,
        }),
      });

      if (!response.ok) throw new Error('Failed to accept follow request');

      const responseTwo = await fetch('/api/follow-request/cancel-request', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName: followingUserName,
          followingUserName: userName,
        }),
      });

      if (!responseTwo.ok) throw new Error('Error deleting follow request');

      setRequests(prev => prev.filter(request => request.id !== requestId));
    } catch (error) {
      alert("Failed to accept follow request");
      console.error(error.message);
    }
  };

  const handleReject = async (requestId, followingUserName) => {
    try {
      const userNameResponse = await fetch(`/api/admin/${user?.sub}`);
      const { userName } = await userNameResponse.json();
      const responseTwo = await fetch('/api/follow-request/cancel-request', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userName: followingUserName,
            followingUserName: userName,
          }),
      });
      if (!responseTwo.ok) throw new Error('Error deleting follow request');
      setRequests(prev => prev.filter(request => request.id !== requestId));
    } catch (error) {
      alert("Failed to reject follow request");
      console.error(error.message);
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h4 className="text-lg font-semibold mb-4">Follow Requests</h4>
      {requests.length > 0 ? (
        <ul>
          {requests.map(request => (
            <li key={request.id} className="flex justify-between items-center mb-2">
              <div>
                <p className="font-bold">{request.userName}</p>
              </div>
              <div>
                <button
                  onClick={() => handleAccept(request.id, request.userName)}
                  className="mr-2 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-700"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleReject(request.id, request.userName)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-700"
                >
                  Reject
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No follow requests</p>
      )}
    </div>
  );
}

export default FollowRequests;
