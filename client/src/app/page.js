"use client";

import React, { useState } from 'react';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';

function Page() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  if (isAuthenticated) {
    return <HomePage />;
  }

  return <LoginPage onLoginSuccess={handleLoginSuccess} />;
}

export default Page;
