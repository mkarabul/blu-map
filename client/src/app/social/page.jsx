"use client";
import React, { useState, useEffect } from "react";
import ListPosts from "./components/ListPosts";
import LocationInterests from "./components/LocationInterests";
import SeasonalPreferences from "./components/SeasonalPreferences";
import LocationFinder from "./components/LocationFinder";
import PlannedTripDetails from "./components/PlannedTripDetails";
import { useUser } from "@auth0/nextjs-auth0/client";

function SocialPage() {
  const { user } = useUser();
  const [theme, setTheme] = useState("dark");
  const [locationFilter, setLocationFilter] = useState({});
  const [seasonFilter, setSeasonFilter] = useState({});

  const [locationInterests, setLocationInterests] = useState({});
  const [checkedCities, setCheckedCities] = useState([]);

  const [checkedSeasons, setCheckedSeasons] = useState([]);

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
        const locationMatches =
          Object.keys(locationFilter).length === 0
            ? true
            : locationFilter.hasOwnProperty(postLocation);

        const allUncheckedSeason = Object.values(seasonFilter).every(
          (val) => val === false
        );
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
          locationInterests={locationInterests}
          setLocationInterests={setLocationInterests}
          checkedCities={checkedCities}
          setCheckedCities={setCheckedCities}
        />

        {/* Middle Column: Posts */}
        <div className="flex-1 justify-center mt-0">
          <LocationFinder
            locationInterests={locationInterests}
            setCheckedCities={setCheckedCities}
            setLocationFilter={setLocationFilter}
          />
          {user ? (
            <PlannedTripDetails
              locationInterests={locationInterests}
              setCheckedCities={setCheckedCities}
              setLocationFilter={setLocationFilter}
              setCheckedSeasons={setCheckedSeasons}
              checkedSeasons={checkedSeasons}
              setSeasonFilter={setSeasonFilter}
            />
          ) : null}
          <ListPosts posts={filteredPosts} />
        </div>

        <SeasonalPreferences
          posts={posts}
          setSeasonFilter={setSeasonFilter}
          checkedSeasons={checkedSeasons}
          setCheckedSeasons={setCheckedSeasons}
        />
      </div>
    </div>
  );
}

export default SocialPage;
