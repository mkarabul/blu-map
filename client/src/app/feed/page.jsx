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
