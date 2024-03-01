import React from "react";
import { getSession } from "@auth0/nextjs-auth0";

import SocialPost from "../../social/components/social-post";

const getPost = async (postId) => {
  const user = await getSession();

  const response = await fetch(
    `${process.env.API_URL}/api/profile-trip/${postId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.accessToken}`,
      },
    }
  );

  const post = await response.json();
  return post;
};

const Post = async ({ params }) => {
  const { postId } = params;
  const post = await getPost(postId);

  if (!post) {
    return;
  }

  return (
    <div className="container mx-auto">
      <SocialPost
        header={post.header}
        description={post.description}
        tripDate={new Date(post.tripDate).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
        userName={post.userName}
      />
    </div>
  );
};

export default Post;
