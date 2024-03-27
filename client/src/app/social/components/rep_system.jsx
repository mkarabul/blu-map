import { useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";

export const RepSystem = (initialLikes, initialDislikes, postId) => {
  const { user } = useUser();
  const [likes, setLikes] = useState(initialLikes);
  const [dislikes, setDislikes] = useState(initialDislikes);
  const userId = user?.sub;

  const addLike = async () => {
    const newLike = {
      postId,
      userId,
    };
    await fetch(`/api/likes/post/${postId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newLike),
    });
    setLikes(likes + 1);
  };
  const addDislike = async () => {
    const newDislike = {
      postId,
      userId,
    };
    await fetch(`/api/dislikes/post/${postId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newDislike),
    });
    setDislikes(dislikes + 1);
  };

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const response = await fetch(`/api/likes/post/${postId}`);
        const data = await response.json();
        setLikes(data.length);
      } catch (error) {
        console.error("Error fetching likes:", error);
      }
    };

    const fetchDislikes = async () => {
      try {
        const response = await fetch(`/api/dislikes/post/${postId}`);
        const data = await response.json();
        setDislikes(data.length);
      } catch (error) {
        console.error("Error fetching dislikes:", error);
      }
    };

    fetchLikes();
    fetchDislikes();
  }, [postId]);

  return { likes, dislikes, addLike, addDislike };
};
