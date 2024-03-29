"use client";

import { useEffect, useState } from "react";
import FriendButton from "../../profile/components/FriendButton";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";

export default function ListFriends() {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      fetchFriends();
    }
  }, [user]);

  const fetchFriends = async () => {
    setLoading(true);
    const response = await fetch(`/api/friend/${user?.sub}/friends`);
    const data = await response.json();
    setFriends(data);
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center">
      {loading ? (
        <div className="flex justify-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        friends.map((friend) => (
          <div className="flex items-center space-x-4">
            <Link href={`/profile/${friend.userName}`}>
              <div className="flex items-center space-x-4">
                <img
                  src="/default-pfp.png"
                  alt="User Profile"
                  className="rounded-full border-4 border-white shadow-lg h-20 w-20 md:h-15 md:w-15"
                />
                <span>{friend.userName}</span>
              </div>
            </Link>
            <FriendButton userName={friend.userName} />
          </div>
        ))
      )}
    </div>
  );
}
