import { useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";

export const RepSystem = (initialLikes, initialDislikes, postId) => {
  const { user } = useUser();
  const [likes, setLikes] = useState(initialLikes);
  const [dislikes, setDislikes] = useState(initialDislikes);
  const [userLiked, setUserLiked] = useState(false);
  const [userDisliked, setUserDisliked] = useState(false);
  const userId = user?.sub;

  const updateLikesAndDislikes = async (actionType) => {
    const actionUrl =
      actionType === "like"
        ? `/api/likes/post/${postId}`
        : `/api/dislikes/post/${postId}`;
    const updateType =
      actionType === "like"
        ? {
            setLikes,
            otherSet: setDislikes,
            setUserAction: setUserLiked,
            clearUserAction: setUserDisliked,
          }
        : {
            setLikes: setDislikes,
            otherSet: setLikes,
            setUserAction: setUserDisliked,
            clearUserAction: setUserLiked,
          };

    const response = await fetch(actionUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postId, userId }),
    });

    if (response.status === 201) {
      updateType.setLikes((prev) => prev + 1);
      updateType.otherSet((prev) => (prev > 0 ? prev - 1 : 0));
      updateType.setUserAction(true);
      updateType.clearUserAction(false);
    } else if (response.status === 204) {
      updateType.setLikes((prev) => prev - 1);
      updateType.setUserAction(false);
    }
  };

  const addLike = () => updateLikesAndDislikes("like");
  const addDislike = () => updateLikesAndDislikes("dislike");

  useEffect(() => {
    const fetchData = async () => {
      const fetchLikes = async () => {
        const response = await fetch(`/api/likes/post/${postId}`);
        const data = await response.json();
        setLikes(data.length);
        // check if the user's ID is in the list of likes
        const likedByUser = data.some((like) => like.userId === userId);
        setUserLiked(likedByUser);
      };

      const fetchDislikes = async () => {
        const response = await fetch(`/api/dislikes/post/${postId}`);
        const data = await response.json();
        setDislikes(data.length);
        // check if the user's ID is in the list of dislikes
        const dislikedByUser = data.some(
          (dislike) => dislike.userId === userId
        );
        setUserDisliked(dislikedByUser);
      };

      await fetchLikes();
      await fetchDislikes();
    };

    fetchData();
  }, [postId, userId]);

  return { likes, dislikes, addLike, addDislike, userLiked, userDisliked };
};
