"use client";
import React, { useState, useEffect } from "react";

function SocialPage() {
  const [posts, setPosts] = useState([]);

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

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-row min-h-screen">
        {/* Left Column: Popular Destinations */}
        <div className="w-1/5 p-4 border-r pl-0">
          <h2 className="font-bold text-xl mb-4">Popular Destinations</h2>
          <button className="btn btn-outline w-full mb-2 rounded-full">
            West Lafayette
          </button>

          {/* Add content here */}
        </div>

        {/* Middle Column: Posts */}
        <div className="w-3/5 p-4 ml-5">
          <div className="border-b pb-4 mb-4">
            <h2 className="font-bold text-xl mb-2">{sampleTrip.title}</h2>
            <p className="text-gray-700 mb-4">{sampleTrip.description}</p>
            <div className="text-sm font-medium text-gray-600">
              <div>Posted by: {sampleTrip.maker}</div>
              <div>Date: {sampleTrip.date}</div>
            </div>
          </div>
          {/* More posts could be added here */}
        </div>

        {/* Right Column: Interests */}
        <div className="w-1/5 p-4 border-l">
          <h2 className="font-bold mb-4">Interests</h2>
          {/* Add content here */}
        </div>
      </div>
    </div>
  );
}

export default SocialPage;
