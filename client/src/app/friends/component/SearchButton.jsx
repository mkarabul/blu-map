"use client";

import { useState, useEffect } from "react";
import ListFriends from "./ListFriends";

export default function SearchButton() {
  const [searchTerm, setSearchTerm] = useState("");
  const [friends, setFriends] = useState([]);
  const [allFriends, setAllFriends] = useState([]);

  useEffect(() => {
    const fetchFriends = async () => {
      const response = await fetch(`/api/users/usernames`);
      const data = await response.json();
      if (Array.isArray(data)) {
        setAllFriends(data);
        setFriends(data);
      } else {
        console.error("Unexpected response structure:", data);
      }
    };

    fetchFriends();
  }, []);

  const searchFriends = (currentSearchTerm) => {
    if (currentSearchTerm === "") {
      setFriends(allFriends);
    } else {
      const filteredFriends = allFriends.filter((friend) =>
        friend.userName.toLowerCase().includes(currentSearchTerm.toLowerCase())
      );
      setFriends(filteredFriends);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          searchFriends(e.target.value); // Use the current value directly
        }}
        placeholder="Search for friends"
        className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
      />
      <button
        onClick={() => searchFriends(searchTerm)}
        className="absolute right-0 top-0 mt-2 mr-2"
      >
        {/* SVG for search icon */}
      </button>
      <ListFriends friends={friends} />
    </div>
  );
}
