"use client";

import React, { useEffect, useState } from "react";
import { handleBlockUser } from "./BlockUser";
import { useUser } from "@auth0/nextjs-auth0/client";

const BlockButton = ({ isOwner, user, userName }) => {
  const [isBlocked, setIsBlocked] = useState(false);
  //const { user } = useUser();

  useEffect(() => {
    const fetchBlockStatus = async () => {
      try {
        const response = await fetch(`/api/block/${userName}/${user.sub}`);

        const isBlocked = await response.json();
        setIsBlocked(isBlocked);
      } catch (error) {
        console.error("Error fetching block status:", error);
      }
    };

    if (!isOwner && user) {
      fetchBlockStatus();
    }
  }, [isOwner, isBlocked]);

  const handleBlockToggle = async () => {
    try {
      const response = await handleBlockUser(user, userName, !isBlocked);

      console.log("Response:", response);
      console.log("Response status:", response.status);

      if (response.ok) {
        setIsBlocked(!isBlocked);
      } else {
        throw new Error(`Failed to toggle block status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error toggling block status:", error);
    }
  };

  return (
    <>
      {!isOwner && (
        <button
          onClick={handleBlockToggle}
          className="btn btn-error w-full rounded-full shadow mt-4"
        >
          {isBlocked ? "Unblock User" : "Block User"}
        </button>
      )}
    </>
  );
};

export default BlockButton;
