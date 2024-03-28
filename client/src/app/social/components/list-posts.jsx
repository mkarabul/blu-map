import React, { useState, useEffect } from "react";
import SocialPost from "./social-post";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function ListPosts() {
  const [posts, setPosts] = useState([]);
  const { user } = useUser();
  useEffect(() => {
    async function fetchPostsAndFollowings() {
      const postsResponse = await fetch("/api/profile-trip/");
      const allPosts = await postsResponse.json();
      console.log(allPosts);
  
      const updatedPosts = allPosts
      .filter(post => post.isPublic)
      .map(post => ({
        ...post,
      }));

    setPosts(updatedPosts);
      }
  
    fetchPostsAndFollowings();
  }, []);
  
  

  return posts.length > 0 ? (
    <div>
      {posts.map(post => (
        <SocialPost
          key={post.uuid}
          uuid={post.uuid}
          header={post.header}
          description={post.description}
          tripDate={new Date(post.tripDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
          userName={post.userName}
        />
      ))}
    </div>
  ) : (
    <div></div>
  );
}
