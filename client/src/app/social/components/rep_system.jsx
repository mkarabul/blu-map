import { useState, useEffect } from "react";

export function reputationSystem(initialLikes, initialDislikes, uuid) {
  const storedLikes = localStorage.getItem(`likes-${uuid}`);
  const storedDislikes = localStorage.getItem(`dislikes-${uuid}`);

  const [likes, setLikes] = useState(
    storedLikes ? parseInt(storedLikes, 10) : initialLikes || 0
  );
  const [dislikes, setDislikes] = useState(
    storedDislikes ? parseInt(storedDislikes, 10) : initialDislikes || 0
  );
  const [userAction, setUserAction] = useState(null);

  useEffect(() => {
    localStorage.setItem(`likes-${uuid}`, likes.toString());
    localStorage.setItem(`dislikes-${uuid}`, dislikes.toString());
  }, [likes, dislikes]);

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
