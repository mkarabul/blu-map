"use client";

import { useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";

export default function FriendNotification({
  userName,
  onResponse,
  setConfirmationMessage,
  setErrorMessage,
}) {
  const [isRequesting, setIsRequesting] = useState(false);

  const { user } = useUser();

  const handleFriendAccept = async () => {
    setIsRequesting(true);
    try {
      const response = await fetch(`/api/friend/${userName}/accept-friend`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user?.sub }),
      });
      const data = await response.json();
      if (data && Object.keys(data).length !== 0) {
        setConfirmationMessage("Friend request accepted.");
        setErrorMessage("");
        onResponse(userName);
      }
    } catch (error) {
      console.error("Error accepting friend request:", error);
      setConfirmationMessage("");
      setErrorMessage("Failed to accept friend request.");
      onResponse(userName);
    }
    setIsRequesting(false);
  };

  const handleFriendReject = async () => {
    setIsRequesting(true);
    try {
      const response = await fetch(`/api/friend/${userName}/reject-friend`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user?.sub }),
      });
      const data = await response.json();
      if (data && Object.keys(data).length !== 0) {
        setConfirmationMessage("Friend request rejected.");
        setErrorMessage("");
      }
    } catch (error) {
      console.error("Error rejecting friend request:", error);
      setConfirmationMessage("");
      setErrorMessage("Failed to recejt friend request.");
    }
    setIsRequesting(false);
  };

  return (
    <div>
      <Link href={`/profile/${userName}`}>
        <div className="flex items-center space-x-4">
          <img
            src="/default-pfp.png"
            alt="User Profile"
            className="rounded-full border-4 border-white shadow-lg h-20 w-20 md:h-15 md:w-15"
          />
          <span>{userName}</span>
        </div>
      </Link>
      <div style={{ textAlign: "right" }}>
        <button
          onClick={() => {
            handleFriendAccept();
          }}
          disabled={isRequesting}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
        >
          Accept
        </button>
        <button
          onClick={() => {
            handleFriendReject();
          }}
          disabled={isRequesting}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Reject
        </button>
      </div>
    </div>
  );
}
