// rep_system.jsx
import { useState } from "react";

export function reputationSystem(initialLikes, initialDislikes) {
  const [likes, setLikes] = useState(initialLikes || 0);
  const [dislikes, setDislikes] = useState(initialDislikes || 0);
  const [userAction, setUserAction] = useState(null);

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
