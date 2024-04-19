"use client";
import React, { useState, useEffect } from "react";
import { SidebarButton } from "./components/SidebarButton";
import ListPosts from "./components/ListPosts";
import { SidebarSection } from "./components/SidebarSection";
import PreferencesModal from "./components/PreferencesModal";
import TripDetailsModal from "./components/TripDetailsModal";
import { useUser } from "@auth0/nextjs-auth0/client";
import LocationInterests from "./components/LocationInterests";

function SocialPage() {
  const { user } = useUser();
  const [theme, setTheme] = useState("dark");
  const [isPreferencesModalOpen, setIsPreferencesModalOpen] = useState(false);
  const [isTripDetailsModalOpen, setIsTripDetailsModalOpen] = useState(false);

  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const getPosts = async () => {
    const response = await fetch(`/api/profile-trip/`);
    const data = await response.json();
    setPosts(data);
    setFilteredPosts(data);
  };

  useEffect(() => {
    getPosts();
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const openPreferencesModal = () => setIsPreferencesModalOpen(true);
  const closePreferencesModal = () => setIsPreferencesModalOpen(false);
  const openTripDetailsModal = () => setIsTripDetailsModalOpen(true);
  const closeTripDetailsModal = () => setIsTripDetailsModalOpen(false);

  // return (
  //   <div className="container mx-auto px-4 py-4">
  //     <div className="flex flex-col md:flex-row mt-20 md:space-x-4">
  //       {/* Left Sidebar */}
  //       {user ? (
  //         <div className="w-1/6 hidden md:block">
  //           <div className="flex flex-col mb-4">
  //             <SidebarButton
  //               text="Edit Preferences"
  //               onClick={openPreferencesModal}
  //             />
  //             <SidebarButton text="Get Recommended Posts" />
  //           </div>
  //           {/* Interests Section */}
  //           <SidebarSection
  //             title="Preferences"
  //             items={[
  //               "West Lafayette",
  //               "New York City",
  //               "Los Angeles",
  //               "Paris",
  //               "London",
  //               "Berlin",
  //             ]}
  //           />
  //         </div>
  //       ) : null}
  //       {/* Main Content */}
  //       <div
  //         className={
  //           user ? "w-full md:w-2/3 px-4 md:px-0" : "flex-1 justify-center mt-0"
  //         }
  //       >
  //         <ListPosts />
  //       </div>
  //       {/* Right Sidebar */}
  //       {user ? (
  //         <div className="w-1/6 hidden md:block">
  //           <div className="flex flex-col mb-4">
  //             <SidebarButton
  //               text="Edit Current Location and Planned Trip Details"
  //               onClick={openTripDetailsModal}
  //             />
  //             <SidebarButton text="Get Posts Near Your Location" />
  //             <SidebarButton text="Get Posts Related to Your Planned Trip" />
  //           </div>
  //         </div>
  //       ) : null}
  //     </div>
  //     {/* Modals */}
  //     <PreferencesModal
  //       isOpen={isPreferencesModalOpen}
  //       onClose={closePreferencesModal}
  //     />
  //     <TripDetailsModal
  //       isOpen={isTripDetailsModalOpen}
  //       onClose={closeTripDetailsModal}
  //     />
  //   </div>
  // );

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row mt-20">
        <LocationInterests posts={posts} setFilteredPosts={setFilteredPosts} />

        {/* Middle Column: Posts */}
        <div className="flex-1 justify-center mt-0">
          <ListPosts posts={filteredPosts} />
        </div>

        {/* Right Column: Interests */}
        <div className="md:fixed md:right-4 lg:right-8 md:top-4 md:w-1/5 p-4 md:h-screen overflow-auto hidden md:block mt-14 shadow-2xl">
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
          </div>
          <hr className="border-t mx-auto w-full my-2" />
        </div>
      </div>
    </div>
  );
}

export default SocialPage;
