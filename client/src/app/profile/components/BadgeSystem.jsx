import React, { useState, useEffect } from "react";

export default function Page({ userName }) {
  const [totalLikes, setTotalLikes] = useState(0);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await fetch(`/api/users/username/${userName}`);
        if (!response.ok) {
          throw new Error("Network response was not ok when fetching userId");
        }
        const data = await response.json();
        setUserId(data.userId);
      } catch (error) {
        console.error("Failed to fetch userId:", error);
      }
    };

    if (userName) {
      fetchUserId();
    }
  }, [userName]);

  useEffect(() => {
    const fetchUserLikes = async () => {
      if (!userId) return;

      try {
        const response = await fetch(`/api/likes/likescount/${userId}`);
        if (!response.ok) {
          throw new Error(
            "Network response was not ok when fetching likes count"
          );
        }
        const data = await response.json();
        setTotalLikes(data.totalLikes);
      } catch (error) {
        console.error("Failed to fetch user likes count:", error);
      }
    };

    if (userId) {
      fetchUserLikes();
    }
  }, [userId]);

  const imageStyle = {
    width: "100px",
    height: "100px",
  };

  const fiveLikesBadgeUrl = "/Badges/5-likes.jpg";
  const tenLikesBadgeUrl = "/Badges/10-likes.jpg";
  const twentyLikesBadgeUrl = "/Badges/20-likes.jpg";
  const fiftyLikesBadgeUrl = "/Badges/50-likes.jpg";

  const getBadgeUrl = (likes) => {
    if (likes >= 5 && likes <= 9) {
      return fiveLikesBadgeUrl;
    } else if (likes >= 10 && likes <= 19) {
      return tenLikesBadgeUrl;
    } else if (likes >= 20 && likes <= 49) {
      return twentyLikesBadgeUrl;
    } else if (likes >= 50) {
      return fiftyLikesBadgeUrl;
    } else {
      return null;
    }
  };

  const badgeUrl = getBadgeUrl(totalLikes);

  return (
    <div>
      {badgeUrl ? (
        <div>
          <img
            src={badgeUrl}
            alt={`${totalLikes} Likes Badge`}
            style={imageStyle}
          />
        </div>
      ) : (
        <p>Total Likes on Posts: {totalLikes}</p>
      )}
    </div>
  );
}
