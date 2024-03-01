"use client";

import React, { useState, useEffect } from "react";
import Trips from "./components/Trips";
import UseItineraryButton from "./components/NewItineraryButton";

const Page = () => {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const themeClasses =
    theme === "dark" ? "text-white bg-black" : "text-black bg-white";

  return (
    <div className={`container mx-auto px-8 my-8`}>
      <h1 className="text-center text-4xl font-bold mb-4">Trips</h1>
      <Trips />
      <UseItineraryButton />
    </div>
  );
};

export default Page;
