import { useState } from 'react';

// Custom hook for suspending a user
export const useSuspendUser = () => {
  const [error, setError] = useState(null);

  const suspendUser = async (userId, isSuspended, setUsersData) => {
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
      setError(error.message);
    }
  };

  return { suspendUser, error };
};

 

// Custom hook for deleting a user
export const useDeleteUser = () => {
  const [error, setError] = useState(null);

  const deleteUser = async (userId, setUsersData) => {
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
      setError(error.message);
    }
  };

  return { deleteUser, error };

  
};
export const useAdminStatus = () => {
    const [error, setError] = useState(null);
  
    const toggleAdminStatus = async (userId, isAdmin, setUsersData) => {
      try {
        const response = await fetch(`http://localhost:5000/api/admin/${userId}/toggle-admin`, {
          method: 'PATCH',
        });
        if (!response.ok) {
          throw new Error('Failed to toggle admin status');
        }
        const updatedUser = { ...setUsersData.find(user => user.userId === userId), isAdmin: !isAdmin };
        setUsersData(prevUsers => prevUsers.map(user => user.userId === userId ? updatedUser : user));
        alert(isAdmin ? "User is demoted successfully" : "User is promoted to admin successfully");
      } catch (error) {
        console.error('Error toggling admin status:', error);
        setError(error.message);
      }
    };
  
    return { toggleAdminStatus, error };
  };
