"use client";

import { useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";

const useLoadPosts = () => {
  const { user, isLoading: isUserLoading } = useUser();
  const [posts, setPosts] = useState([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  const [isLoadingUserInfo, setIsLoadingUserInfo] = useState(true);
  const [userData, setUserData] = useState({
    userName: "",
    gender: "",
    age: -1,
  });

  useEffect(() => {
    const loadPosts = async () => {
      const userId = user?.sub;
      try {
        const optionalResponse = await fetch(`api/users/${userId}`);
        const optionalData = await optionalResponse.json();
        setUserData({
          gender: optionalData.gender,
          age: optionalData.age,
          userName: optionalData.userName,
          profileName: optionalData.profileName,
        });
      } catch (error) {
        console.error("Error loading optional user data:", error);
      } finally {
        setIsLoadingUserInfo(false);
      }

      try {
        const response = await fetch(`api/profile-trip/user/${userId}`);
        const data = await response.json();
        const imageFetchPromises = data.map((post) =>
          fetch(`api/profile-trip/${post.tripId}/images`)
        );

        const imageResponses = await Promise.all(imageFetchPromises);
        const imagesData = await Promise.all(
          imageResponses.map((res) => res.json())
        );

        for (let i = 0; i < data.length; i++) {
          if (imagesData[i].length > 0) {
            data[i].images = imagesData[i];
          } else {
            data[i].images = ["https://via.placeholder.com/150"];
          }
        }
        setPosts(data);
      } catch (error) {
        console.error("Error loading posts:", error);
      } finally {
        setIsLoadingPosts(false);
      }
    };

    if (user) {
      loadPosts();
    }
  }, [user]);

  return {
    posts,
    postCount: posts.length,
    isLoading: isLoadingPosts || isLoadingUserInfo || isUserLoading,
    userData,
  };
};

export default useLoadPosts;
