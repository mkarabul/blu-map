import { useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";

const useLoadPosts = () => {
  const { user, isLoading: isUserLoading } = useUser();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [postCount, setPostCount] = useState(0);

  useEffect(() => {
    const loadPosts = async () => {
      setIsLoading(true);
      try {
        const userId = user?.sub;
        const response = await fetch(`api/profile-trip/${userId}`);
        const data = await response.json();
        setPosts(data);
        setPostCount(data.length);
        setUserName(data[0].userName);
      } catch (error) {
        console.error("Error loading posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      loadPosts();
    }
  }, [user]);

  return { posts, userName, postCount, isLoading: isLoading || isUserLoading };
};

export default useLoadPosts;
