"use client";

import React, { useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import CommentDeleteButton from "./CommentDeleteButton";

const CommentView = ({ userName, comment }) => {
  const { user } = useUser();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!user) return;

    const checkAdmin = async () => {
      try {
        const response = await fetch(`/api/users/${user.sub}`);
        const data = await response.json();
        setIsAdmin(data.isAdmin);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    checkAdmin();
  }, [user]);

  return (
    <div className=" flex justify-between hover:scale-110 duration-200 join">
      <div className="text-left p-2 bg-blue-500 text-white rounded-lg shadow-lg join-item flex-grow">
        <strong>{userName}</strong>: {comment}
      </div>
      {isAdmin && <CommentDeleteButton />}
    </div>
  );
};

export default CommentView;
