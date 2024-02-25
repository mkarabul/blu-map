"use client"

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import SearchPage from './SearchPage';

function page() {
  const [theme, setTheme] = useState('dark'); // Start with the 'dark' mode by default

  // Function to toggle theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  // Conditional classes based on the theme state
  const themeClasses = theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900';
  const toggleButtonClass = theme === 'dark' ? 'bg-blue-600 text-white' : 'bg-blue-200 text-blue-900';

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <HomePage 
            toggleTheme={toggleTheme} 
            themeClasses={themeClasses} 
            toggleButtonClass={toggleButtonClass} 
          />
        } />
        <Route path="/search" element={
          <SearchPage 
            themeClasses={themeClasses} 
            toggleTheme={toggleTheme} 
            toggleButtonClass={toggleButtonClass} 
          />
        } />
      </Routes>
    </Router>
  );
}

export default page;
