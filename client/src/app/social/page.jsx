"use client";
import React, { useState, useEffect } from "react";
import SocialPost from "./components/social-post";

function SocialPage() {
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
      <div className="flex flex-col md:flex-row">
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
        <div className="w-1/5 p-4 border-r pl-0 flex flex-col items-center hidden md:block">
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

        <SocialPost />

        {/* Right Column: Interests */}
        <div className="w-1/5 p-4 border-l hidden md:block">
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
