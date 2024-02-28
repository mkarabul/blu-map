import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import axios from 'axios'; // Import Axios library

const SearchPage = ({ themeClasses, toggleTheme }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('none');
  const [showingUsers, setShowingUsers] = useState(15);
  const [usersData, setUsersData] = useState([]); // State to store fetched users data

  useEffect(() => {
    // Function to fetch users data from the API
    const fetchUsersData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/');
        setUsersData(response.data); // Set fetched users data to state
      } catch (error) {
        console.error('Error fetching users data:', error);
      }
    };

    fetchUsersData(); // Fetch users data when component mounts
  }, []); // Empty dependency array ensures the effect runs only once

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const toggleSuspend = (username) => {
    alert('Suspend user here');
  };

  const forceDelete = async (username) => {
    try {
      alert(`http://localhost:5000/api/users/${username}`);
      await axios.delete(`http://localhost:5000/api/users/${username}`);
      alert("at least here?");

      setUsersData((prevUsers) => prevUsers.filter((user) => user.username !== username));
      console.log('User deleted successfully');
      alert("Deleted the user");
    } catch (error) {
      alert(error);
      console.error('Error deleting user:', error);
    }
  };
  

  const filteredUsers = usersData.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sorting logic based on selected option
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (sortBy === 'alphabetical') {
      return a.username.localeCompare(b.username);
    } else if (sortBy === 'alphabeticalEmail') {
      return a.email.localeCompare(b.email);
    } else if (sortBy === 'suspended') {
      return b.isSuspended - a.isSuspended;
    }
    // Default sorting: no sorting applied
    return 0;
  });

  const paginatedUsers = sortedUsers.slice(0, showingUsers);

  const loadMore = () => {
    setShowingUsers((prev) => prev + 15);
  };

  const inputClasses = themeClasses.includes('bg-gray-900')
    ? 'bg-gray-700 text-white'
    : 'bg-white text-gray-900';
  const textColor = themeClasses.includes('bg-gray-900')
    ? 'text-gray-300'
    : 'text-gray-700';
  const cardBgColor = themeClasses.includes('bg-gray-900')
    ? 'bg-gray-800'
    : 'bg-gray-200';

  return (
    <div className={`p-5 min-h-screen ${themeClasses} transition-colors duration-500`}>
      <Navbar toggleTheme={toggleTheme} themeClasses={themeClasses} />
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search by username..."
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
              <option value="alphabetical">Alphabetical (Username)</option>
              <option value="alphabeticalEmail">Alphabetical (Email)</option>
              <option value="suspended">Suspended Accounts</option>
            </select>
          </div>
        </div>
        <div className="mt-4">
          {paginatedUsers.length > 0 ? (
            paginatedUsers.map((user, index) => (
              <div
                key={index}
                className={`mb-4 p-4 rounded shadow-lg ${cardBgColor} ${textColor} space-y-2`}
              >
                <h2 className="text-2xl font-bold">{user.username}</h2>
                <p>Email: {user.email}</p>
                <p>Age: {user.age}</p>
                <p>Gender: {user.gender}</p>
                <p>Status: {user.isSuspended ? 'Suspended' : 'Active'}</p>
                <button
                  onClick={() => toggleSuspend(user.username)}
                  className={`px-4 py-2 rounded ${
                    user.isSuspended ? 'bg-green-500' : 'bg-yellow-500'
                  } text-white mr-2`}
                >
                  {user.isSuspended ? 'Unsuspend' : 'Suspend'}
                </button>
                <button
                  onClick={() => forceDelete(user.username)} // Call forceDelete function on button click
                  className="px-4 py-2 rounded bg-red-500 text-white"
                >
                  Force Delete
                </button>
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
      <div className="mt-auto">
        <Footer theme={themeClasses.includes('bg-gray-900') ? 'dark' : 'light'} />
      </div>
    </div>
  );
};

export default SearchPage;
