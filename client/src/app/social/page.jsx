"use client";
import React, { useState, useEffect } from "react";
import SocialPost from "./components/social-post";
import ListPosts from "./components/list-posts";
import axios from "axios";
function SocialPage() {

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
        {/* Accordion sections for smaller screens */}
        <div className="md:hidden">
          {/* Popular Destinations Accordion */}
          <div className="w-full">
            <button
              className="accordion btn btn-outline w-full mb-2"
              onClick={toggleAccordionforDestination}
            >
              Popular Destinations
            </button>
            <div
              className={`${
                isAccordionOpenforDestination ? "block" : "hidden"
              } p-4 border`}
            >
              {/* Content of Accordion */}
              {/* North America Section for accordian */}
              <h3 className="font-semibold text-lg mb-2">North America</h3>
              <div className="w-full mb-2">
                <button className="btn btn-outline w-full mb-2 rounded-full">
                  West Lafayette
                </button>
                <button className="btn btn-outline w-full mb-2 rounded-full">
                  New York City
                </button>
                <button className="btn btn-outline w-full mb-2 rounded-full">
                  Los Angeles
                </button>
                <button className="btn btn-outline w-full mb-2 rounded-full">
                  Houston
                </button>
              </div>
              <hr className="border-t mx-auto w-full my-2" />

              {/* Europe Section for accordian*/}
              <h3 className="font-semibold text-lg mb-2">Europe</h3>
              <div className="w-full mb-2">
                <button className="btn btn-outline w-full mb-2 rounded-full">
                  Paris
                </button>
                <button className="btn btn-outline w-full mb-2 rounded-full">
                  London
                </button>
                <button className="btn btn-outline w-full mb-2 rounded-full">
                  Berlin
                </button>
              </div>
              <hr className="border-t mx-auto w-full my-2" />

              {/* Asia Section for accordian */}
              <h3 className="font-semibold text-lg mb-2">Asia</h3>
              <div className="w-full mb-2">
                <button className="btn btn-outline w-full mb-2 rounded-full">
                  Istanbul
                </button>
                <button className="btn btn-outline w-full mb-2 rounded-full">
                  Tokyo
                </button>
                <button className="btn btn-outline w-full mb-2 rounded-full">
                  Seoul
                </button>
              </div>
              <hr className="border-t mx-auto w-full my-2" />
            </div>
          </div>

          {/* Interests Accordion */}
          <div className="w-full mb-4">
            <button
              className="accordion btn btn-outline w-full mb-2"
              onClick={toggleAccordionforInterests}
            >
              Interests
            </button>
            <div
              className={`${
                isAccordionOpenforInterests ? "block" : "hidden"
              } p-4 border`}
            >
              {/* Attraction section for accordian */}
              <h3 className="font-semibold text-lg mb-2">Attractions</h3>
              <div className="w-full mb-2">
                <button className="btn btn-outline w-full mb-2 rounded-full">
                  Campuses
                </button>
                <button className="btn btn-outline w-full mb-2 rounded-full">
                  Landscapes
                </button>
                <button className="btn btn-outline w-full mb-2 rounded-full">
                  Buildings
                </button>
              </div>
              <hr className="border-t mx-auto w-full my-2" />

              {/* Sports Section for accordian */}
              <h3 className="font-semibold text-lg mb-2">Sports</h3>
              <div className="w-full mb-2">
                <button className="btn btn-outline w-full mb-2 rounded-full">
                  Hiking
                </button>
                <button className="btn btn-outline w-full mb-2 rounded-full">
                  Sailing
                </button>
                <button className="btn btn-outline w-full mb-2 rounded-full">
                  Swimming
                </button>
              </div>
              <hr className="border-t mx-auto w-full my-2" />

              {/* Culture Section for accordian */}
              <h3 className="font-semibold text-lg mb-2">Culture</h3>
              <div className="w-full">
                <button className="btn btn-outline w-full mb-2 rounded-full">
                  Museums
                </button>
                <button className="btn btn-outline w-full mb-2 rounded-full">
                  Restaurants
                </button>
                <button className="btn btn-outline w-full mb-2 rounded-full">
                  Theaters
                </button>
              </div>
              <hr className="border-t mx-auto w-full my-2" />
            </div>
          </div>
        </div>

        {/* Left Column: Popular Destinations */}
        <div className="md:fixed md:left-4 lg:left-8 md:top-4 md:w-1/5 p-4 border-r md:pl-0 md:h-screen overflow-auto hidden md:block mt-12">
          <h2 className="font-bold text-xl mb-4">Popular Destinations</h2>

          {/* North America Section */}
          <h3 className="font-semibold text-lg mb-2">North America</h3>
          <div className="w-full mb-2">
            <button className="btn btn-outline w-full mb-2 rounded-full">
              West Lafayette
            </button>
            <button className="btn btn-outline w-full mb-2 rounded-full">
              New York City
            </button>
            <button className="btn btn-outline w-full mb-2 rounded-full">
              Los Angeles
            </button>
            <button className="btn btn-outline w-full mb-2 rounded-full">
              Houston
            </button>
          </div>
          <hr className="border-t mx-auto w-full my-2" />

          {/* Europe Section */}
          <h3 className="font-semibold text-lg mb-2">Europe</h3>
          <div className="w-full mb-2">
            <button className="btn btn-outline w-full mb-2 rounded-full">
              Paris
            </button>
            <button className="btn btn-outline w-full mb-2 rounded-full">
              London
            </button>
            <button className="btn btn-outline w-full mb-2 rounded-full">
              Berlin
            </button>
          </div>
          <hr className="border-t mx-auto w-full my-2" />

          {/* Asia Section */}
          <h3 className="font-semibold text-lg mb-2">Asia</h3>
          <div className="w-full mb-2">
            <button className="btn btn-outline w-full mb-2 rounded-full">
              Istanbul
            </button>
            <button className="btn btn-outline w-full mb-2 rounded-full">
              Tokyo
            </button>
            <button className="btn btn-outline w-full mb-2 rounded-full">
              Seoul
            </button>
          </div>
          <hr className="border-t mx-auto w-full my-2" />
        </div>

        {/* Middle Column: Posts */}
        <div className="flex-1 justify-center mt-0">
          <ListPosts />
        </div>

        {/* Right Column: Interests */}
        <div className="md:fixed md:right-4 lg:right-8 md:top-4 md:w-1/5 p-4 border-l md:h-screen overflow-auto hidden md:block mt-12">
          <h2 className="font-bold text-xl mb-4">Interests</h2>
          {/* Attractions Section */}
          <h3 className="font-semibold text-lg mb-2">Attractions</h3>
          <div className="w-full mb-2">
            <button className="btn btn-outline w-full mb-2 rounded-full">
              Campuses
            </button>
            <button className="btn btn-outline w-full mb-2 rounded-full">
              Landscapes
            </button>
            <button className="btn btn-outline w-full mb-2 rounded-full">
              Buildings
            </button>
          </div>
          <hr className="border-t mx-auto w-full my-2" />

          {/* Sports Section */}
          <h3 className="font-semibold text-lg mb-2">Sports</h3>
          <div className="w-full mb-2">
            <button className="btn btn-outline w-full mb-2 rounded-full">
              Hiking
            </button>
            <button className="btn btn-outline w-full mb-2 rounded-full">
              Sailing
            </button>
            <button className="btn btn-outline w-full mb-2 rounded-full">
              Swimming
            </button>
          </div>
          <hr className="border-t mx-auto w-full my-2" />

          {/* Culture Section */}
          <h3 className="font-semibold text-lg mb-2">Culture</h3>
          <div className="w-full">
            <button className="btn btn-outline w-full mb-2 rounded-full">
              Museums
            </button>
            <button className="btn btn-outline w-full mb-2 rounded-full">
              Restaurants
            </button>
            <button className="btn btn-outline w-full mb-2 rounded-full">
              Theaters
            </button>
          </div>
          <hr className="border-t mx-auto w-full my-2" />
        </div>
      </div>
    </div>
  );
}

export default SocialPage;
