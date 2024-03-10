import { useState, useEffect } from "react";

export function reputationSystem(initialLikes, initialDislikes, uuid) {
  const [likes, setLikes] = useState(initialLikes || 0);
  const [dislikes, setDislikes] = useState(initialDislikes || 0);
  const [userAction, setUserAction] = useState(null);

  const saveLikes = async (likes) => {
    const response = await fetch(`/post/${uuid}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uuid, likes }),
    });
    if (!response.ok) {
      throw new Error("Failed to save likes");
    }
  };

  const saveDislikes = async (dislikes) => {
    const response = await fetch(`/post/${uuid}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uuid, dislikes }),
    });
    if (!response.ok) {
      throw new Error("Failed to save dislikes");
    }
  };

  useEffect(() => {
    saveLikes(likes);
  }, [likes]);

  useEffect(() => {
    saveDislikes(dislikes);
  }, [dislikes]);

  const addLike = () => {
    if (userAction !== "liked") {
      setLikes(likes + 1);
      setUserAction("liked");
      if (userAction === "disliked") {
        setDislikes(dislikes - 1);
      }
    }
  };

  const addDislike = () => {
    if (userAction !== "disliked") {
      setDislikes(dislikes + 1);
      setUserAction("disliked");
      if (userAction === "liked") {
        setLikes(likes - 1);
      }
    }
  };

  return { likes, dislikes, addLike, addDislike };
}
