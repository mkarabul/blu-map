import { useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";

const useCreatePost = () => {
  const { user } = useUser();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const response = await fetch(`api/users/${user?.sub}`);
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error occurred while creating post: ", error);
      }
    };
    if (user) {
      loadUserData();
    }
  }, [user]);

  const createUserPost = async (postData) => {
    try {
      const response = await fetch(`api/profile-trip/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });
      if (!response.ok) {
        throw new Error("Error creating post");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };
  return { userData, createUserPost };
};

export default useCreatePost;
