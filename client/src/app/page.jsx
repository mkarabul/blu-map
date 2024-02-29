"use client"

import React from "react";
import Footer from "./components/footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faPersonHiking } from "@fortawesome/free-solid-svg-icons";
import { faCar } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from 'react';
import axios from "axios";

export default function Home() {

  let currUser = "testUser3"; // Placeholder for current user

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

  if (isLoading) return <div>Loading...</div>;


  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow font-serif" style={{ overflowY: "auto" }}>
        <div className="container py-5 px-8 max-w-full flex flex-wrap md:flex-nowrap justify-center mx-auto gap-16 content-center items-center">
          {/* Left Section */}
          <div className="left text-4xl flex flex-col justify-center">
            <h1 className="text-6xl mt-6">
              Plan Your Next Daily <br /> Trip In A Few Steps
            </h1>

            <div className="flex items-center mt-16">
              <FontAwesomeIcon
                icon={faLocationDot}
                style={{ width: "50px", height: "50px" }}
                className="text-white"
              />
              <div className="ml-4">
                <p className="text-2xl font-bold">Choose Destination</p>
                <p className="text-xl">
                  Choose the date and the destination you want to make a trip
                  to.
                </p>
              </div>
            </div>

            <div className="flex items-center mt-16">
              <FontAwesomeIcon
                icon={faPersonHiking}
                style={{ width: "50px", height: "50px" }}
                className="text-white"
              />
              <div className="ml-4">
                <p className="text-2xl font-bold">Choose Activities</p>
                <p className="text-xl">
                  Choose activities you want to do or places you want to visit
                  and when.
                </p>
              </div>
            </div>

            <div className="flex items-center mt-16">
              <FontAwesomeIcon
                icon={faCar}
                style={{ width: "50px", height: "50px" }}
                className="text-white"
              />
              <div className="ml-4">
                <p className="text-2xl font-bold">Get a Complete Trip</p>
                <p className="text-xl">
                  Get a complete trip timeline as well as options and
                  recommendations to optimize or design the trip.
                </p>
              </div>
            </div>
          </div>
          {/* Right Section */}
          <div
            className="right text-4xl justify-center"
            style={{ minWidth: "300px" }}
          >
            <img
              src="/landing_page_trip.png"
              alt="Sample Trip"
              style={{
                width: "300px",
                height: "350px",
                borderRadius: "25px",
              }}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
