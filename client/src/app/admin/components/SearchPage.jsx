"use client"
import React, { useState, useEffect } from 'react';
import { useUser } from "@auth0/nextjs-auth0/client";

const SearchPage = ({ themeClasses }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('none');
  const [showingUsers, setShowingUsers] = useState(15);
  const [usersData, setUsersData] = useState([]);
  const [hasAccess, setAccess] = useState(false);
  const { user } = useUser();
  const userID = user?.sub;


  const [isReportModalOpen, setReportModalOpen] = useState(false);
  const [reportsData, setReportsData] = useState([]);
  const [currentReportIndex, setCurrentReportIndex] = useState(0);



  useEffect(() => {    
    const fetchUsersData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/admin/');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
  
        const data = await response.json();
        setUsersData(data);
        const currentUserData = data.find(user => user.userId === userID);
        if (currentUserData && currentUserData.isAdmin) {
          setAccess(true);
        } else {
          setUsersData(null);
          throw new Error("Not Admin");
        }
      } catch (error) {
        console.error(error);
      } 
    };
    fetchUsersData();
  }, [userID]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };


  const toggleSuspend = async (userId, isSuspended) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/${userId}/toggle-suspend`, {
        method: 'PATCH',
      });
      if (!response.ok) {
        throw new Error('Failed to toggle user suspension');
      }
      const updatedUser = { ...usersData.find(user => user.userId === userId), isSuspended: !isSuspended };
      setUsersData(prevUsers => prevUsers.map(user => user.userId === userId ? updatedUser : user));
      alert(isSuspended ? "User is unsuspended successfully" : "User is suspended successfully");
    } catch (error) {
      console.error('Error toggling user suspension:', error);
      alert(`Error toggling user suspension: ${error.message}`);
    }
  };
  
  const viewReports = async (userId) => {
    // Fetch reports data from the API
    try {
     const response = await fetch(`http://localhost:5000/api/reports/all/${userId}`);

      if (!response.ok) {
        throw new Error('Failed to fetch reports');
      }
      const data = await response.json();
      setReportsData(data);
      setCurrentReportIndex(0);
      setReportModalOpen(true);
    } catch (error) {
      console.error('Error fetching reports:', error);
    }
  };
  
  const ReportModal = ({ isOpen, onClose, reports }) => {
    if (!isOpen || reports.length === 0) return null;

    const currentReport = reports[currentReportIndex];
    const totalReports = reports.length;

    const nextReport = () => {
      setCurrentReportIndex((prevIndex) => (prevIndex + 1) % totalReports); // Loop back to the first report
    };
    const deleteReport = async () => {
      try {
        await fetch(`http://localhost:5000/api/admin/${currentReport.reportedUserName}/decrement-report`, {
          method: 'PATCH',
        });
    
        await fetch(`http://localhost:5000/api/reports/${currentReport.reportId}`, {
          method: 'DELETE',
        });
    
        const updatedReports = reportsData.filter(report => report.reportId !== currentReport.reportId);
        setReportsData(updatedReports);
    
        setUsersData(users => users.map(user => {
          if (user.userId === currentReport.reportedUserId) {
            return { ...user, reportNum: Math.max(user.reportNum - 1, 0) }; 
          }
          return user;
        }));
    
        if (currentReportIndex >= updatedReports.length - 1) {
          setCurrentReportIndex(prevIndex => Math.max(0, prevIndex - 1));
        }
    
        if (updatedReports.length === 0) {
          onClose();
        }
    
        alert("Report resolved successfully");
      } catch (error) {
        console.error('Error resolving report:', error);
        alert(`Error: ${error.message}`);
      }
    };
    

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-5 rounded-lg">
          <h2 className="text-xl font-bold">{currentReport.header}</h2>
          <p>Description: {currentReport.description}</p>
          <p>Report Type: {currentReport.reportType}</p>

          <p>Reported on: {currentReport.createdAt}</p>
          <p>Reported by ID: {currentReport.reporterUserID}</p>

          <div className="flex justify-between items-center">
            <button onClick={onClose} className="px-4 py-2 rounded bg-red-500 text-white mt-4">Close</button>
            {totalReports > 1 && (
              <button onClick={nextReport} className="px-4 py-2 rounded bg-blue-500 text-white mt-4">
                Next ({currentReportIndex + 1}/{totalReports})
              </button>
            )}
            <button onClick={deleteReport} className="px-4 py-2 rounded bg-green-500 text-white mt-4">Resolve</button>
          </div>
        </div>
      </div>
    );
  };



  const toggleAdminStatus = async (userId, isAdmin) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/${userId}/toggle-admin`, {
        method: 'PATCH',
      });
      if (!response.ok) {
        throw new Error('Failed to toggle admin status');
      }
      const updatedUser = { ...usersData.find(user => user.userId === userId), isAdmin: !isAdmin };
      setUsersData(prevUsers => prevUsers.map(user => user.userId === userId ? updatedUser : user));
      alert(isAdmin ? "User is demoted successfully" : "User is promoted to admin successfully");
    } catch (error) {
      console.error('Error toggling admin status:', error);
      alert(`Error toggling admin status: ${error.message}`);
    }
  };

  const forceDelete = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/${userId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
      setUsersData(prevUsers => prevUsers.filter(user => user.userId !== userId));
      alert("User is deleted successfully");
    } catch (error) {
      console.error('Error deleting user:', error);
      alert(`Error deleting user: ${error.message}`);
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
      case 'reports':
        return b.reportNum - a.reportNum;
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
              <option value="reports">Number of Reports</option>

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
        <p>Public Mode: {user.isPublic ? 'True' : 'False'}</p>
        <p>Number of Reports: {user.reportNum}</p>

     
  
        {/* Only show action buttons if the user is not the current user */}
        {userID !== user.userId && (

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
            {userID !== user.userId && (
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
                className="px-4 py-2 rounded bg-red-500 text-white mr-2"
              >
                Force Delete
              </button>
            )}

            {user.reportNum > 0 && (
              <button
                id="viewReports"
                onClick={() => viewReports(user.userName)}
                className="px-4 py-2 rounded bg-blue-500 text-white"
              >
                View Reports
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
      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => setReportModalOpen(false)}
        reports={reportsData}
      />
  
    </div>
  );
};

export default SearchPage;
