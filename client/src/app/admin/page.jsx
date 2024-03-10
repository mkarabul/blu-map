
"use client"

import React, { useState } from 'react';
import SearchPage from './components/SearchPage';
import ChartsPage from './components/Charts';
import Footer from '../components/footer';
const HomePage = () => {
  const [activePage, setActivePage] = useState('charts');

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
      <Footer></Footer>
    </div>
  );
};

export default HomePage;
