import { useState, useEffect } from "react";

export const RepSystem = (initialLikes, initialDislikes, postId) => {
  // use local storage to prevent the user from refreshing and bloating the database
  const [likes, setLikes] = useState(initialLikes);
  const [dislikes, setDislikes] = useState(initialDislikes);
  const [hasLiked, setHasLiked] = useState(
    localStorage.getItem(`hasLiked-${postId}`) === "true"
  );
  const [hasDisliked, setHasDisliked] = useState(
    localStorage.getItem(`hasDisliked-${postId}`) === "true"
  );
  const [firstLike, setFirstLike] = useState(
    localStorage.getItem(`firstLike-${postId}`) !== "false"
  );
  const [firstDislike, setFirstDislike] = useState(
    localStorage.getItem(`firstDislike-${postId}`) !== "false"
  );

  // update localStorage whenever these states change (additional check to prevent user from bloating the database with likes/dislikes)
  useEffect(() => {
    localStorage.setItem(`likes-${postId}`, likes.toString());
    localStorage.setItem(`dislikes-${postId}`, dislikes.toString());
    localStorage.setItem(`hasLiked-${postId}`, hasLiked.toString());
    localStorage.setItem(`hasDisliked-${postId}`, hasDisliked.toString());
    localStorage.setItem(`firstLike-${postId}`, firstLike.toString());
    localStorage.setItem(`firstDislike-${postId}`, firstDislike.toString());
  }, [likes, dislikes, hasLiked, hasDisliked, firstLike, firstDislike, postId]);

  const addLike = () => {
    if (!hasLiked) {
      setLikes((likes) => likes + 1);
      setHasLiked(true);
      if (firstLike) {
        fetch(`/api/profile-trip/${postId}/increment-likes`, {
          method: "PATCH",
        });
        setFirstLike(false);
      }

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
        setFirstDislike(false);
      }

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
