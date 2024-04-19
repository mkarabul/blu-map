"use client";
import React, { useState, useEffect } from "react";
import ListPosts from "./components/ListPosts";
import { useUser } from "@auth0/nextjs-auth0/client";
import LocationInterests from "./components/LocationInterests";
import SeasonalPreferences from "./components/SeasonalPreferences";

function SocialPage() {
  const { user } = useUser();
  const [theme, setTheme] = useState("dark");
  const [isPreferencesModalOpen, setIsPreferencesModalOpen] = useState(false);
  const [isTripDetailsModalOpen, setIsTripDetailsModalOpen] = useState(false);
  const [lastChangerLocation, setLastChangerLocation] = useState(true);
  const [locationFilter, setLocationFilter] = useState({});
  const [seasonFilter, setSeasonFilter] = useState({});

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

  useEffect(() => {
    const allUncheckedSeason = Object.values(seasonFilter).every(
      (val) => val === false
    );

    if (Object.keys(locationFilter).length === 0 && allUncheckedSeason) {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter((post) => {
        const postLocation = post.city;

        const postMonth = new Date(post.tripDate).toLocaleString("default", {
          month: "long",
        });
        console.log(locationFilter);
        const locationMatches =
          Object.keys(locationFilter).length === 0
            ? true
            : locationFilter.hasOwnProperty(postLocation);

        const allUncheckedSeason = Object.values(seasonFilter).every(
          (val) => val === false
        );
        console.log(seasonFilter);
        const seasonMatches = allUncheckedSeason
          ? true
          : seasonFilter.hasOwnProperty(postMonth);

        return locationMatches && seasonMatches;
      });

      setFilteredPosts(filtered);
    }
  }, [locationFilter, seasonFilter, posts]);

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row mt-20">
        <LocationInterests
          posts={posts}
          setLocationFilter={setLocationFilter}
        />

        {/* Middle Column: Posts */}
        <div className="flex-1 justify-center mt-0">
          <ListPosts posts={filteredPosts} />
        </div>

        <SeasonalPreferences posts={posts} setSeasonFilter={setSeasonFilter} />
      </div>
    </div>
  );
}

export default SocialPage;
