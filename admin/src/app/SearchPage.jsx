import React, { useState } from 'react';
import Navbar from './Navbar'; // Ensure the path to Navbar is correct
import usersData from './data'; // Make sure the path to your data file is correct
import Footer from './Footer';

const SearchPage = ({ themeClasses, toggleTheme }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('none');
  const [showingUsers, setShowingUsers] = useState(15);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const toggleSuspend = (username) => {
    alert("suspend user here");
  };

  const forceDelete = (username) => {
    alert("force delete user here");
  };

  const filteredUsers = usersData.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedUsers = sortBy ? [...filteredUsers].sort((a, b) => {
    if (sortBy === 'alphabetical') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'reports') {
      return b.amount_of_reports - a.amount_of_reports;
    } else if (sortBy === 'suspended') {
      return b.is_suspended - a.is_suspended;
    }
  }) : filteredUsers;

  const paginatedUsers = sortedUsers.slice(0, showingUsers);

  const loadMore = () => {
    setShowingUsers(prev => prev + 15);
  };

  // Adjusting input classes for better contrast in light/dark mode
  const inputClasses = themeClasses.includes('bg-gray-900') ? 'bg-gray-700 text-white' : 'bg-white text-gray-900';
  const textColor = themeClasses.includes('bg-gray-900') ? 'text-gray-300' : 'text-gray-700';
  const cardBgColor = themeClasses.includes('bg-gray-900') ? 'bg-gray-800' : 'bg-gray-200';

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
          style={{ minWidth: '200px' }} // Adjust the minimum width as needed
        />
        <div className="flex items-center mb-4">
          <label htmlFor="sortBy" className={`mr-2 ${textColor}`}>Sort By:</label>
          <select
            id="sortBy"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={`p-2 rounded ${inputClasses}`}
          >
            <option value="">None</option>
            <option value="alphabetical">Alphabetical</option>
            <option value="reports">Amount of Reports</option>
            <option value="suspended">Suspended Accounts</option>
          </select>
        </div>
      </div>
        {/* Display filtered and sorted user data */}
        <div className="mt-4">
          {paginatedUsers.length > 0 ? (
            paginatedUsers.map((user, index) => (
              <div key={index} className={`mb-4 p-4 rounded shadow-lg ${cardBgColor} ${textColor} space-y-2`}>
                <h2 className="text-2xl font-bold">{user.name}</h2>
                <p>Username: {user.username}</p>
                <p>Followers: {user.followers} - Following: {user.following}</p>
                <p>Description: {user.profile_description}</p>
                <p>Joined: {user.created_at}</p>
                <p>Gender: {user.gender} - Age: {user.age}</p>
                <p>Phone: {user.phone_number}</p>
                <p>Reports: {user.amount_of_reports}</p>
                <p>Status: {user.is_suspended ? 'Suspended' : 'Active'}, {user.is_deleted ? 'Deleted' : 'Active'}</p>
                <button onClick={() => toggleSuspend(user.username)} className={`px-4 py-2 rounded ${user.is_suspended ? 'bg-green-500' : 'bg-yellow-500'} text-white mr-2`}>
                  {user.is_suspended ? 'Unsuspend' : 'Suspend'}
                </button>
                <button onClick={() => forceDelete(user.username)} className="px-4 py-2 rounded bg-red-500 text-white">
                  Force Delete
                </button>
              </div>
            ))
          ) : (
            <p className={`${textColor}`}>No users found.</p>
          )}
          
        </div>
        
      </div>
      <div className="max-w-4xl mx-auto mb-10"> {/* Adjust mb-10 to the amount of margin you need */}
        {filteredUsers.length > showingUsers && (
          <button onClick={loadMore} className="bg-blue-500 text-white px-4 py-2 rounded">
            Load More
          </button>
        )}
      </div>

      {/* Footer should stick to the bottom now with the space above */}
      <div className="mt-auto">
        <Footer theme={themeClasses.includes('bg-gray-900') ? 'dark' : 'light'} />
      </div>
    
    </div>
  );
};

export default SearchPage;
