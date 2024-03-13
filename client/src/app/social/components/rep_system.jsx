import { useState } from "react";

export const RepSystem = (initialLikes, initialDislikes, postId) => {
  const [likes, setLikes] = useState(initialLikes);
  const [dislikes, setDislikes] = useState(initialDislikes);
  const [hasLiked, setHasLiked] = useState(false);
  const [hasDisliked, setHasDisliked] = useState(false);
  const [firstLike, setFirstLike] = useState(true);
  const [firstDislike, setFirstDislike] = useState(true);

  const addLike = () => {
    if (!hasLiked) {
      setLikes((likes) => likes + 1);
      setHasLiked(true);
      if (firstLike) {
        fetch(`/api/profile-trip/${postId}/increment-likes`, {
          method: "PATCH",
        });
      }
      setFirstLike(false);

      if (hasDisliked) {
        setDislikes((dislikes) => dislikes - 1);
        setHasDisliked(false);
        fetch(`/api/profile-trip/${postId}/decrement-dislikes`, {
          method: "PATCH",
        });
      }
    } else {
      setLikes((likes) => likes - 1);
      setHasLiked(false);
      fetch(`/api/profile-trip/${postId}/decrement-likes`, { method: "PATCH" });
    }
  };

  const addDislike = () => {
    if (!hasDisliked) {
      setDislikes((dislikes) => dislikes + 1);
      setHasDisliked(true);
      if (firstDislike) {
        fetch(`/api/profile-trip/${postId}/increment-dislikes`, {
          method: "PATCH",
        });
      }
      setFirstDislike(false);

      if (hasLiked) {
        setLikes((likes) => likes - 1);
        setHasLiked(false);
        fetch(`/api/profile-trip/${postId}/decrement-likes`, {
          method: "PATCH",
        });
      }
    } else {
      setDislikes((dislikes) => dislikes - 1);
      setHasDisliked(false);
      fetch(`/api/profile-trip/${postId}/decrement-dislikes`, {
        method: "PATCH",
      });
    }
  };

  return { likes, dislikes, addLike, addDislike };
};
