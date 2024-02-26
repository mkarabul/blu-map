"use client";

import React, { useState, useEffect } from "react";

const Trips = () => {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const themeClasses =
    theme === "dark" ? "text-white bg-black" : "text-black bg-white";

  return (
    // <div className={themeClasses}>
    <div>
      <h3>Trips</h3>
      <p>Here you can see all the trips</p>
      <p>You currently have no trips</p>
    </div>
  );
};

export default Trips;
