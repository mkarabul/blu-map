"use client";
import React, { useState, useEffect } from "react";
import ListPosts from "./components/list-posts";
function FeedPage() {
  const [theme, setTheme] = useState("dark");
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  // let currUser = "auth0|65df5cc6f0c1754329eca25c"; // Placeholder for current user

  // const [theme, setTheme] = useState('dark');
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   const fetchTheme = async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:5000/api/users/${currUser}`);
  //       const isDarkMode = response.data.isDarkMode;
  //       setTheme(isDarkMode ? 'dark' : 'light');
  //       document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  //     } catch (error) {
  //       console.error('Error fetching user data for theme:', error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchTheme();
  // }, []);

  const [isAccordionOpenforDestination, setIsAccordionOpenforDestination] =
    useState(false);
  const [isAccordionOpenforInterests, setIsAccordionOpenforInterests] =
    useState(false);

  const toggleAccordionforDestination = () => {
    setIsAccordionOpenforDestination(!isAccordionOpenforDestination);
  };
  const toggleAccordionforInterests = () => {
    setIsAccordionOpenforInterests(!isAccordionOpenforInterests);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row mt-20">
        {/* Middle Column: Posts */}
        <div className="flex-1 justify-center mt-0">
          <ListPosts />
        </div>
      </div>
    </div>
  );
}

export default FeedPage;
