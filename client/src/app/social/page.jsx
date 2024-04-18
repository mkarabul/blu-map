"use client";
import React, { useState, useEffect } from "react";
import { SidebarButton } from "./components/SidebarButton";
import ListPosts from "./components/ListPosts";
import { SidebarSection } from "./components/SidebarSection";
import PreferencesModal from "./components/PreferencesModal";
import TripDetailsModal from "./components/TripDetailsModal";
import { useUser } from "@auth0/nextjs-auth0/client";

function SocialPage() {
  const { user } = useUser();
  const [theme, setTheme] = useState("dark");
  const [isPreferencesModalOpen, setIsPreferencesModalOpen] = useState(false);
  const [isTripDetailsModalOpen, setIsTripDetailsModalOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const openPreferencesModal = () => setIsPreferencesModalOpen(true);
  const closePreferencesModal = () => setIsPreferencesModalOpen(false);
  const openTripDetailsModal = () => setIsTripDetailsModalOpen(true);
  const closeTripDetailsModal = () => setIsTripDetailsModalOpen(false);

  return (
    <div className="container mx-auto px-4 py-4">
      <div className="flex flex-col md:flex-row mt-20 md:space-x-4">
        {/* Left Sidebar */}
        {user ? (
          <div className="w-1/6 hidden md:block">
            <div className="flex flex-col mb-4">
              <SidebarButton
                text="Edit Preferences"
                onClick={openPreferencesModal}
              />
              <SidebarButton text="Get Recommended Posts" />
            </div>
            {/* Interests Section */}
            <SidebarSection
              title="Preferences"
              items={[
                "West Lafayette",
                "New York City",
                "Los Angeles",
                "Paris",
                "London",
                "Berlin",
              ]}
            />
          </div>
        ) : null}
        {/* Main Content */}
        <div
          className={
            user ? "w-full md:w-2/3 px-4 md:px-0" : "flex-1 justify-center mt-0"
          }
        >
          <ListPosts />
        </div>
        {/* Right Sidebar */}
        {user ? (
          <div className="w-1/6 hidden md:block">
            <div className="flex flex-col mb-4">
              <SidebarButton
                text="Edit Current Location and Planned Trip Details"
                onClick={openTripDetailsModal}
              />
              <SidebarButton text="Get Posts Near Your Location" />
              <SidebarButton text="Get Posts Related to Your Planned Trip" />
            </div>
          </div>
        ) : null}
      </div>
      {/* Modals */}
      <PreferencesModal
        isOpen={isPreferencesModalOpen}
        onClose={closePreferencesModal}
      />
      <TripDetailsModal
        isOpen={isTripDetailsModalOpen}
        onClose={closeTripDetailsModal}
      />
    </div>
  );
}

export default SocialPage;
