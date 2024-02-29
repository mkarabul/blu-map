import { useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";

const useLoadPosts = () => {
  const { user, isLoading: isUserLoading } = useUser();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({
    userName: "",
    gender: "",
    age: -1,
  });

  useEffect(() => {
    const loadPosts = async () => {
      setIsLoading(true);
      const userId = user?.sub;
      try {
        const response = await fetch(`api/profile-trip/${userId}`);
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error loading posts:", error);
      } finally {
        setIsLoading(false);
      }

      try {
        const optionalResponse = await fetch(`api/users/${userId}`);
        const optionalData = await optionalResponse.json();
        setUserData({
          gender: optionalData.gender,
          age: optionalData.age,
          userName: optionalData.userName,
        });
      } catch (error) {
        console.error("Error loading optional user data:", error);
      }
    };

    if (user) {
      loadPosts();
    }
  }, [user]);

  return {
    posts,
    postCount: posts.length,
    isLoading: isLoading || isUserLoading,
    userData,
  };
};

export default useLoadPosts;
