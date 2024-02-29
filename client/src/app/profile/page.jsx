"use client";
import React, { useState, useEffect } from "react";
import ShareButton from "./components/share-button";
import axios from "axios";
export default function Page() {

  
  let currUser = "auth0|65df5cc6f0c1754329eca25c"; // Placeholder for current user

  const [theme, setTheme] = useState('dark');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/${currUser}`);
        const isDarkMode = response.data.isDarkMode;
        setTheme(isDarkMode ? 'dark' : 'light');
        document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
      } catch (error) {
        console.error('Error fetching user data for theme:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTheme();
  }, []);


  const themeClasses =
    theme === "dark" ? "text-white bg-black" : "text-black bg-white";



  return (
    <div>
      <h1>yo</h1>
      <ShareButton />
    </div>
  );
}
