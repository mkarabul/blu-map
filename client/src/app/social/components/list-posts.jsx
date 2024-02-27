import React, { useState, useEffect } from "react";
import SocialPost from "./social-post";

export default function ListPosts() {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    const response = await fetch("/api/profile-trip/");
    const data = await response.json();
    setPosts(data);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return posts !== null ? (
    <>
      {posts.map((post) => (
        <SocialPost
          key={post.id}
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
    </>
  ) : (
    ""
  );
}
