"use client";

import React, { useState, useEffect } from "react";
import Trips from "./components/Trips";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCircle } from "@fortawesome/free-solid-svg-icons";


const page = () => {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const themeClasses =
    theme === "dark" ? "text-white bg-black" : "text-black bg-white";

  const handleCreateItinerary = async () => {
    const response = await fetch("/api/itineraries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <div className="container mx-auto px-8 my-8">
      <h1 className="text-center text-4xl font-bold mb-4">Trips</h1>
      <Trips />
      <button
        className="btn btn-circle btn-secondary fixed bottom-8 right-8 border-2 align-middle"
        onClick={handleCreateItinerary}
      >
        <FontAwesomeIcon icon={faPlus} className="p-3" size="xl" />        
      </button>
    </div>
  );
};

export default page;
