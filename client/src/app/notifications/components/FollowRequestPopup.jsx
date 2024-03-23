// FollowRequests.js
"use client"
import React, { useState } from 'react';

function FollowRequests() {
  // Example static data for follow requests
  const [requests, setRequests] = useState([
    { id: 1, userName: 'adventure_await', name: 'Emily Carter' },
    { id: 2, userName: 'the_wild_outdoors', name: 'John Doe' },
    { id: 3, userName: 'snapshot_journey', name: 'Jane Smith' },
  ]);

  // Placeholder for accept and reject logic
  const handleAccept = (requestId) => {
    // Example logic to handle accept
    console.log(`Accepted request ${requestId}`);
    // Remove the request from the list
    setRequests(prev => prev.filter(request => request.id !== requestId));
  };

  const handleReject = (requestId) => {
    // Example logic to handle reject
    console.log(`Rejected request ${requestId}`);
    // Remove the request from the list
    setRequests(prev => prev.filter(request => request.id !== requestId));
  };

  return (
    <div>
      <h4 className="text-lg font-semibold mb-4">Follow Requests</h4>
      {requests.length > 0 ? (
        <ul>
          {requests.map(request => (
            <li key={request.id} className="flex justify-between items-center mb-2">
              <div>
                <p className="font-bold">{request.userName}</p>
                <p className="text-sm text-gray-600">{request.name}</p>
              </div>
              <div>
                <button
                  onClick={() => handleAccept(request.id)}
                  className="mr-2 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-700"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleReject(request.id)}
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
