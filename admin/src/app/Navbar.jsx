import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

const Navbar = ({ toggleTheme, theme }) => {
  const navbarBgColor = theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200';
  const textColor = theme === 'dark' ? 'text-white' : 'text-gray-800';
  const hoverBgColor = theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-300';
  const themeIcon = theme === 'dark' ? faSun : faMoon;

  return (
    <nav className={`${navbarBgColor} flex items-center justify-between mb-5 px-4 py-2 shadow-md transition duration-500 ease-in-out`}>
      <Link to="/" className={`${textColor} hover:text-opacity-80 transition duration-150 ease-in-out`}>
        <img src="blu-map-logo.jpeg" alt="Blu-Map Logo" className="h-12" />
      </Link>

      <h1 className={`text-xl font-semibold ${textColor} flex-grow text-center`}>
        Admin Dashboard
      </h1>

      <div className="flex items-center">

      <Link to="/" className={`px-4 py-2 ${textColor} ${hoverBgColor} rounded-full transition duration-150 ease-in-out`}>
          Home
        </Link>
        <Link id="search-button" to="/search" className={`px-4 py-2 ${textColor} ${hoverBgColor} rounded-full transition duration-150 ease-in-out`}>
          Search
        </Link>
        <button
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          className={`ml-4 px-4 py-2 rounded-full shadow-inner flex items-center justify-center ${textColor} ${hoverBgColor} transition duration-150 ease-in-out`}
        >
          <FontAwesomeIcon icon={themeIcon} />
        </button>

      </div>
    </nav>
  );
};

export default Navbar;
