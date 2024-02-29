import React, { useState, useEffect } from 'react';

import axios from 'axios';

const SearchPage = ({ themeClasses, toggleTheme }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('none');
  const [showingUsers, setShowingUsers] = useState(15);
  const [usersData, setUsersData] = useState([]);
  let currUser = "testUser3" // CHANGE THIS LATER
 

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/');
        setUsersData(response.data);
      } catch (error) {
        throw new Error(error);
      }
    };
    fetchUsersData();
  }, []);


  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  
  const toggleSuspend = async (userId, isSuspended) => {
    try {
      await axios.patch(`http://localhost:5000/api/users/${userId}/toggle-suspend`);
  
      let message = isSuspended ? "User is unsuspended successfully" : "User is suspended successfully";
      alert(message);
      setUsersData((prevUsers) => prevUsers.map((user) => {
        if (user.userId === userId) {
          return { ...user, isSuspended: !user.isSuspended };
        }
        return user;
      }));
    } catch (error) {
      console.error('Error toggling user suspension:', error);
      alert(`Error toggling user suspension: ${error}`);
    }
  };
  const toggleAdminStatus = async (userId, isAdmin) => {
    try {
      await axios.patch(`http://localhost:5000/api/users/${userId}/toggle-admin`);
  
      let message = isAdmin ? "User is demoted successfully" : "User is promoted to admin successfully";
      alert(message);
      setUsersData((prevUsers) => prevUsers.map((user) => {
        if (user.userId === userId) {
          return { ...user, isAdmin: !user.isAdmin };
        }
        return user;
      }));
    } catch (error) {
      console.error('Error toggling user suspension:', error);
      alert(`Error toggling user suspension: ${error}`);
    }
  };
  const forceDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${userId}`);
      setUsersData((prevUsers) => prevUsers.filter((user) => user.userId !== userId));
      alert("User is deleted successfully");
    } catch (error) {
      console.error('Error deleting user:', error);
      alert(`Error deleting user: ${error}`);
    }
  };
  


  const filteredUsers = usersData.filter((user) =>
    user.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    switch (sortBy) {
      case 'alphabetical':
        return a.userName.localeCompare(b.userName);
      case 'alphabeticalEmail':
        return a.email.localeCompare(b.email);
      case 'userId':
        return a.userId - b.userId;
      case 'suspended':
        return b.isSuspended - a.isSuspended;
      default:
        return 0;
    }
  });

  const paginatedUsers = sortedUsers.slice(0, showingUsers);

  const loadMore = () => {
    setShowingUsers((prev) => prev + 15);
  };

  const inputClasses = themeClasses && themeClasses.includes('bg-gray-900')
  ? 'bg-gray-700 text-white'
  : 'bg-white text-gray-900';
const textColor = themeClasses && themeClasses.includes('bg-gray-900')
  ? 'text-gray-300'
  : 'text-gray-700';
const cardBgColor = themeClasses && themeClasses.includes('bg-gray-900')
  ? 'bg-gray-800'
  : 'bg-gray-200';


  return (
    <div className={`p-5 min-h-screen ${themeClasses} transition-colors duration-500 justify-center`}>
      <h1 className="text-3xl font-bold mb-6">User Search</h1>

      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search by userName..."
            value={searchTerm}
            onChange={handleSearchChange}
            className={`flex-grow p-2 text-lg rounded ${inputClasses} border-transparent focus:border-transparent focus:ring-0 mb-4 mr-2`}
            style={{ minWidth: '200px' }}
          />
          <div className="flex items-center mb-4">
            <label htmlFor="sortBy" className={`mr-2 ${textColor}`}>
              Sort By:
            </label>
            <select
              id="sortBy"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={`p-2 rounded ${inputClasses}`}
            >
              <option value="none">None</option>
              <option value="alphabetical">Alphabetical (userName)</option>
              <option value="alphabeticalEmail">Alphabetical (Email)</option>
              <option value="userId">User ID</option>
              <option value="suspended">Suspended Accounts</option>
            </select>
          </div>
        </div>
        <div className="mt-4">
  {paginatedUsers.length > 0 ? (
    paginatedUsers.map((user, index) => (
      <div
        id="search-users"
        key={index}
        className={`userName-class mb-4 p-4 rounded shadow-lg ${cardBgColor} ${textColor} space-y-2`}
      >
        <h2 className="userName-name text-2xl font-bold">{user.userName}</h2>
        <p>User ID: {user.userId}</p>
        <p>Email: {user.email}</p>
        <p>Age: {user.age}</p>
        <p>Gender: {user.gender}</p>
        <p>Status: {user.isSuspended ? 'Suspended' : 'Active'}</p>
        <p>Admin: {user.isAdmin ? 'True' : 'False'}</p>
        
        {/* Only show action buttons if the user is not the current user */}
        {currUser !== user.userId && (
          <>
            {/* Only allow suspension/unsuspension if the user is not an admin */}
            {!user.isAdmin && (
              <button
                id="suspendOrUnsuspend"
                onClick={() => toggleSuspend(user.userId, user.isSuspended)}
                className={`px-4 py-2 rounded ${user.isSuspended ? 'bg-green-500' : 'bg-yellow-500'} text-white mr-2`}
              >
                {user.isSuspended ? 'Unsuspend' : 'Suspend'}
              </button>
            )}
            
            {/* Toggle Admin Status Button, ensuring not to self-manage or to demote/promote other admins if not allowed */}
            {currUser !== user.userId && (
              <button
                id="adminaccessornot"
                onClick={() => toggleAdminStatus(user.userId, user.isAdmin)}
                className={`px-4 py-2 rounded ${user.isAdmin ? 'bg-red-500' : 'bg-green-500'} text-white mr-2`}
              >
                {user.isAdmin ? 'Demote from Admin' : 'Promote to Admin'}
              </button>
            )}

            {/* Delete Button, ensuring it's not possible to delete an admin */}
            {!user.isAdmin && (
              <button
                id="delete_user"
                onClick={() => forceDelete(user.userId)}
                className="px-4 py-2 rounded bg-red-500 text-white"
              >
                Force Delete
              </button>
            )}
          </>
        )}
      </div>
    ))
  ) : (
    <p className={`${textColor}`}>No users found.</p>
  )}
</div>

      </div>
      <div className="max-w-4xl mx-auto mb-10">
        {filteredUsers.length > showingUsers && (
          <button onClick={loadMore} className="bg-blue-500 text-white px-4 py-2 rounded">
            Load More
          </button>
        )}
      </div>
  
    </div>
  );
};

export default SearchPage;
