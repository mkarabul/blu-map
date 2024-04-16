"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

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
      } else {
        console.error("Unexpected response structure:", data);
      }
    };

    fetchFriends();
  }, []);

  useEffect(() => {
    searchFriends();
  }, [searchTerm]);

  const searchFriends = () => {
    if (searchTerm === "") {
      setFriends(allFriends);
    } else {
      const filteredFriends = allFriends.filter((friend) =>
        friend.userName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFriends(filteredFriends);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center relative">
      <div className="relative mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          placeholder="Search for friends"
          className="border-2 border-gray-300 bg-white h-10 px-5 pr-10 rounded-lg text-sm focus:outline-none"
        />
        <button
          onClick={() => {
            setSearchTerm("");
            setFriends(allFriends);
          }}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
        >
          X
        </button>
      </div>
      {friends.map((friend) => (
        <div className="flex items-center space-x-4 mb-4">
          <Link href={`/profile/${friend.userName}`}>
            <div className="flex items-center space-x-4">
              <img
                src={friend.userPhoto || "/default-pfp.png"}
                alt="User Profile"
                className="rounded-full border-4 border-white shadow-lg h-20 w-20 md:h-15 md:w-15"
              />
              <span>{friend.userName}</span>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
