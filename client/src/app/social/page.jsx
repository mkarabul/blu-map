"use client";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faThumbsDown,
  faMapMarkedAlt,
  faPaperPlane,
  faPlus,
  faCommentDots,
} from "@fortawesome/free-solid-svg-icons";

function SocialPage() {
  const [posts, setPosts] = useState([]);
  const [isAccordionOpenforDestination, setIsAccordionOpenforDestination] =
    useState(false);
  const [isAccordionOpenforInterests, setIsAccordionOpenforInterests] =
    useState(false);

  const sampleTrip = {
    title: "Trip to West Lafayette",
    description:
      "West Lafayette is beautiful city! This trip allowed me to explore Purdue University's stunning campus, enjoy a delicious steak at Irish Brothers, unwind at Celery Bog Nature Area, and catch a stunning sunset at Prophetstown State Park.",
    maker: "Mert Karabulut",
    date: "15 April 2023",
  };

  useEffect(() => {
    setPosts([sampleTrip]);
  }, []);

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

        {/* Middle Column: Posts */}
        <div className="card w-full sm:w-11/12 md:w-1/2 bg-white border mx-auto mt-5 mb-5">
          <div className="card-body p-5">
            {/* user profile icon */}
            <div className="flex justify-start mb-4">
              <img
                src="/default-pfp.png"
                alt="User Profile"
                className="rounded-full border-4 border-white shadow-lg h-20 w-20 md:h-15 md:w-15"
              />
            </div>
            {/* Images Row */}
            <div className="flex justify-between space-x-4 mb-4">
              <img
                src="https://via.placeholder.com/150"
                alt="Image 1"
                className="w-1/2 rounded-lg"
              />
              <img
                src="https://via.placeholder.com/150"
                alt="Image 2"
                className="w-1/2 rounded-lg"
              />
            </div>
            {/* Trip description */}
            <div className="text-lg text-gray-700">
              {sampleTrip.description}
            </div>
            <div className="text-2xl text-bold text-gray-700 mt-3">
              {sampleTrip.title}
            </div>
            <div className="text-xl text-sm font-medium text-gray-600 mt-1">
              Date: {sampleTrip.date} | Posted by: {sampleTrip.maker}
            </div>
            {/* Buttons on the bottom of a post */}
            <div className="flex flex-col md:flex-row justify-start items-center mt-4">
              <div className="flex flex-grow space-x-2 mb-2 md:mb-0">
                <button className="btn btn-outline rounded-full">
                  <FontAwesomeIcon icon={faThumbsUp} />
                </button>
                <button className="btn btn-outline rounded-full">
                  <FontAwesomeIcon icon={faThumbsDown} />
                </button>
                <button className="btn btn-outline rounded-full">
                  <FontAwesomeIcon icon={faMapMarkedAlt} />
                </button>
                <button className="btn btn-outline rounded-full">
                  <FontAwesomeIcon icon={faPaperPlane} />
                </button>
                <button className="btn btn-outline rounded-full">
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
              {/* Separate div for the last button (right-most) */}
              <div className="flex justify-end flex-grow">
                <button className="btn btn-outline rounded-full">
                  <FontAwesomeIcon icon={faCommentDots} />
                </button>
              </div>
            </div>
          </div>
        </div>

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
