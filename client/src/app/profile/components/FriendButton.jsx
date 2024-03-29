"use client";

import { useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function FriendButton({ userName }) {
  const [isFriend, setIsFriend] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [isRequesting, setIsRequesting] = useState(false);
  const [isError, setIsError] = useState(false);
  const { user } = useUser();

  const checkFriendStatus = async () => {
    try {
      const response = await fetch(
        `/api/friend/${userName}/${user?.sub}/is-friend`
      );
      const data = await response.json();
      console.log("data", data);
      if (data && Object.keys(data).length !== 0) {
        setIsFriend(data.isFriend);
        setIsPending(data.isPending);
      }
    } catch (error) {
      console.error("Error checking friend status:", error);
      setIsError(true);
    }
  };

  useEffect(() => {
    checkFriendStatus();
  }, []);

  const handleFriendRequest = async () => {
    setIsRequesting(true);
    try {
      const response = await fetch(`/api/friend/${userName}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user?.sub }),
      });
      const data = await response.json();
      if (data && Object.keys(data).length !== 0) {
        setIsPending(true);
      }
    } catch (error) {
      console.error("Error sending friend request:", error);
      setIsError(true);
    }
    setIsRequesting(false);
  };

  const handleFriendAccept = async () => {
    setIsRequesting(true);
    try {
      const response = await fetch(
        `${process.env.API_URL}/api/friends/accept/${userName}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = await response.json();
      if (data && Object.keys(data).length !== 0) {
        setIsFriend(true);
        setIsPending(false);
      }
    } catch (error) {
      console.error("Error accepting friend request:", error);
      setIsError(true);
    }
    setIsRequesting(false);
  };

  const handleFriendReject = async () => {
    setIsRequesting(true);
    try {
      const response = await fetch(
        `${process.env.API_URL}/api/friends/reject/${userName}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = await response.json();
      if (data && Object.keys(data).length !== 0) {
        setIsFriend(false);
        setIsPending(false);
      }
    } catch (error) {
      console.error("Error rejecting friend request:", error);
      setIsError(true);
    }
    setIsRequesting(false);
  };

  return (
    <div>
      {isFriend ? (
        <button
          onClick={handleFriendReject}
          disabled={isRequesting}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Unfriend
        </button>
      ) : isPending ? (
        <button
          onClick={handleFriendAccept}
          disabled={isRequesting}
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
        >
          Pending Friend Request
        </button>
      ) : (
        <button
          onClick={handleFriendRequest}
          disabled={isRequesting}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Friend
        </button>
      )}
    </div>
  );
}
