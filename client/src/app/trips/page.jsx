"use client";

import React, { useState, useEffect } from "react";
import Trips from "./components/Trips";
import UseItineraryButton from "./components/NewItineraryButton";
import axios from "axios";

const Page = () => {
  let currUser = "auth0|65df5cc6f0c1754329eca25c";

  const [theme, setTheme] = useState("dark");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/${currUser}`);
        const isDarkMode = response.data.isDarkMode;
        setTheme(isDarkMode ? "dark" : "light");
        document.documentElement.setAttribute("data-theme", isDarkMode ? "dark" : "light");
      } catch (error) {
        console.error("Error fetching user data for theme:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTheme();
  }, []);

  const themeClasses = theme === "dark" ? "text-white bg-black" : "text-black bg-white";

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className={`container mx-auto px-8 my-8 ${themeClasses}`}>
      <h1 className="text-center text-4xl font-bold mb-4">Trips</h1>
      <Trips />
      <UseItineraryButton />
    </div>
  );
};

export default Page;
