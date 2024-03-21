import { useState } from "react";

export const RepSystem = (initialLikes, initialDislikes, uuid) => {
  const [likes, setLikes] = useState(initialLikes);
  const [dislikes, setDislikes] = useState(initialDislikes);

  const addLike = async () => {
    try {
      const response = await fetch("/api/likes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId: uuid }),
      });
      if (response.ok) {
        setLikes(likes + 1);
      } else {
        console.error("Failed to add like");
      }
    } catch (error) {
      console.error("Error adding like:", error);
    }
    fetch(`/api/likes`, {
      method: "PATCH",
    });
  };

  const addDislike = async () => {
    try {
      const response = await fetch("/api/dislikes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId: uuid }),
      });
      if (response.ok) {
        setDislikes(dislikes + 1);
      } else {
        console.error("Failed to add dislike");
      }
    } catch (error) {
      console.error("Error adding dislike:", error);
    }
  };

  return { likes, dislikes, addLike, addDislike };
};
