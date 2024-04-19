import React, { useState, useEffect } from "react";
import SocialPost from "../../social/components/SocialPost";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function ListPosts() {
  const [posts, setPosts] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    async function fetchPostsAndFollowings() {
      const userID = user?.sub;
      const userNameResponse = await fetch(`/api/admin/${userID}`);
      const { userName } = await userNameResponse.json();

      const followingResponse = await fetch(
        `/api/follow/following/${userName}`
      );
      const followingData = await followingResponse.json();

      const followingUserNames = followingData.map(
        (following) => following.followingUserName
      );

      const postsResponse = await fetch("/api/profile-trip/");
      const allPosts = await postsResponse.json();

      const filteredPosts = allPosts.filter((post) =>
        followingUserNames.includes(post.userName)
      );

      setPosts(filteredPosts);
    }

    fetchPostsAndFollowings();
  }, [user?.sub]);

  return posts.length > 0 ? (
    <div>
      {posts.map((post) => (
        <SocialPost
          key={post.id}
          uuid={post.uuid}
          header={post.header}
          description={post.description}
          tripDate={new Date(post.tripDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
          userName={post.userName}
          tripId={post.tripId}
          clickable={true}
          images={post.images}
          userPhoto={post.userPhoto}
          isSocialPage={false}
          city={post.city}
          country={post.country}
        />
      ))}
    </div>
  ) : (
    <div></div>
  );
}
