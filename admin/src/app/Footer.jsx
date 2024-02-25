// Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

const Footer = ({ theme }) => {
  const footerBgColor = theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200';
  const textColor = theme === 'dark' ? 'text-white' : 'text-gray-800';

  return (
    <footer className={`${footerBgColor} flex items-center justify-between px-4 py-2 shadow-md transition duration-500 ease-in-out`}>
        
      
      <div className="text-center flex-grow">
        <p className={textColor}>
          &copy; {new Date().getFullYear()} BluMap. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
