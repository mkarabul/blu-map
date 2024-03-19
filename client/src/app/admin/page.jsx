"use client";

import React, { useState, useEffect } from 'react';
import SearchPage from './components/SearchPage';
import ChartsPage from './components/Charts';
import { useUser } from "@auth0/nextjs-auth0/client";
import Footer from '../components/footer';

const HomePage = () => {
  const [activePage, setActivePage] = useState('charts');
  const [loading, setLoading] = useState(true);
  const [hasAccess, setAccess] = useState(false);
  const { user, error } = useUser();

  useEffect(() => {    
    const fetchUsersData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/admin/${user?.sub}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        
        const currentUserData = await response.json();
        
        if (currentUserData.isAdmin) {
          setAccess(true);
        } else {
          throw new Error("Not Admin");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); 
      }
    };

    if (user) {
      fetchUsersData();
    }
  }, [user]);
  
  if (error) {
    return (
      <div className="p-5 min-h-screen flex justify-center items-center">
        <h2 className="text-xl font-bold">You are not logged in.</h2>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-5 min-h-screen flex justify-center items-center">
        <h2 className="text-xl font-bold">Checking access permissions...</h2>
      </div>
    );
  }
  
  if (!hasAccess) {
    return (
      <div className="p-5 min-h-screen flex justify-center items-center">
        <h2 className="text-xl font-bold">You do not have permission to access this page.</h2>
      </div>
    );
  }
  
  return (
    <div>
      <nav className="flex justify-between items-center bg-gray-800 text-white py-2 px-4 rounded-full m-4">
        <h1 className="text-lg font-semibold">Admin Dashboard</h1>
        <div className="flex gap-4">
          <button
            className={`px-4 py-2 rounded-full ${activePage === 'charts' ? 'bg-gray-700' : 'bg-gray-900'} hover:bg-gray-600`}
            onClick={() => setActivePage('charts')}
          >
            Charts
          </button>
          <button
            className={`px-4 py-2 rounded-full ${activePage === 'search' ? 'bg-gray-700' : 'bg-gray-900'} hover:bg-gray-600`}
            onClick={() => setActivePage('search')}
          >
            Search
          </button>
        </div>
      </nav>
      <div>
        {activePage === 'charts' && <ChartsPage />}
        {activePage === 'search' && <SearchPage />}
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
