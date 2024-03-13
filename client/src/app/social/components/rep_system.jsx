import { useState } from "react";

export const RepSystem = (initialLikes, initialDislikes, postId) => {
  const [likes, setLikes] = useState(initialLikes);
  const [dislikes, setDislikes] = useState(initialDislikes);

  const addLike = () => {
    setLikes(likes + 1);
    fetch(`/api/profile-trip/${postId}/increment-likes`, { method: "PATCH" });
  };

  const addDislike = () => {
    setDislikes(dislikes + 1);
    fetch(`/api/profile-trip/${postId}/increment-dislikes`, {
      method: "PATCH",
    });
  };

  return { likes, dislikes, addLike, addDislike };
};
