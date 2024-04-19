import React, { useState, useEffect } from "react";

export default function Page({ userName }) {
  const [totalLikes, setTotalLikes] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
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

  //use effect to fetch user comment count
  useEffect(() => {
    const fetchUserComments = async () => {
      if (!userId) return;

      try {
        const response = await fetch(`/api/comments/commentcount/${userId}`);
        if (!response.ok) {
          throw new Error(
            "Network response was not ok when fetching comment count"
          );
        }
        const data = await response.json();
        setTotalComments(data.totalComments);
      } catch (error) {
        console.error("Failed to fetch user comment count:", error);
      }
    };

    if (userId) {
      fetchUserComments();
    }
  }, [userId]);

  const imageStyle = {
    width: "100px",
    height: "100px",
    margin: "0 5px",
  };

  const fiveLikesBadgeUrl = "/Badges/5-likes.jpg";
  const tenLikesBadgeUrl = "/Badges/10-likes.jpg";
  const twentyLikesBadgeUrl = "/Badges/20-likes.jpg";
  const fiftyLikesBadgeUrl = "/Badges/50-likes.jpg";

  const fiveCommentsBadgeUrl = "/Badges/5-comments.jpg";
  const tenCommentsBadgeUrl = "/Badges/10-comments.jpg";
  const twentyCommentsBadgeUrl = "/Badges/20-comments.jpg";
  const fiftyCommentsBadgeUrl = "/Badges/50-comments.jpg";

  const getLikesBadgeUrl = (likes) => {
    if (likes >= 5 && likes <= 9) {
      return { url: fiveLikesBadgeUrl, count: 5 };
    } else if (likes >= 10 && likes <= 19) {
      return { url: tenLikesBadgeUrl, count: 10 };
    } else if (likes >= 20 && likes <= 49) {
      return { url: twentyLikesBadgeUrl, count: 20 };
    } else if (likes >= 50) {
      return { url: fiftyLikesBadgeUrl, count: 50 };
    } else {
      return null;
    }
  };

  const getCommentsBadgeUrl = (comments) => {
    if (comments >= 5 && comments <= 9) {
      return { url: fiveCommentsBadgeUrl, count: 5 };
    } else if (comments >= 10 && comments <= 19) {
      return { url: tenCommentsBadgeUrl, count: 10 };
    } else if (comments >= 20 && comments <= 49) {
      return { url: twentyCommentsBadgeUrl, count: 20 };
    } else if (comments >= 50) {
      return { url: fiftyCommentsBadgeUrl, count: 50 };
    } else {
      return null;
    }
  };

  const badgeLike = getLikesBadgeUrl(totalLikes);
  const badgeComment = getCommentsBadgeUrl(totalComments);

  const getHoverMessage = (badgeType, count) => {
    if (badgeType === "likes") {
      return `Earn by liking ${count} posts!`;
    } else if (badgeType === "comments") {
      return `Earn by commenting on ${count} posts!`;
    } else {
      return "";
    }
  };

  const badgeContainerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "20px",
  };

  return (
    <div>
      <div style={badgeContainerStyle}>
        {badgeLike && (
          <img
            src={badgeLike.url}
            alt={`${totalLikes} Likes Badge`}
            style={imageStyle}
            title={getHoverMessage("likes", badgeLike.count)}
          />
        )}
        {badgeComment && (
          <img
            src={badgeComment.url}
            alt={`${totalComments} Comments Badge`}
            style={imageStyle}
            title={getHoverMessage("comments", badgeComment.count)}
          />
        )}
        {!badgeLike && !badgeComment && (
          <div>
            <p>Total Likes on Posts: {totalLikes}</p>
            <p>Total Comments on Posts: {totalComments}</p>
          </div>
        )}
      </div>
    </div>
  );
}
