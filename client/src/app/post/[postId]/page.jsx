import React, { use } from "react";
import { getSession } from "@auth0/nextjs-auth0";

import SocialPost from "../../social/components/social-post";
import CommentSection from "./components/commentSection";
import { getPosts } from "../../profile/[userName]/page";

const getPostAndUser = async (postId, session) => {
  const response = await fetch(
    `${process.env.API_URL}/api/profile-trip/${postId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.accessToken}`,
      },
    }
  );

  const post = await response.json();

  const uuid = post.userId;
  const usernameResponse = await fetch(
    `${process.env.API_URL}/api/users/${uuid}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.accessToken}`,
      },
    }
  );

  const { username } = await usernameResponse.json();

  return { post, username };
};

const Post = async ({ params }) => {
  const { postId } = params;
  const session = await getSession();
  const { post, username } = await getPostAndUser(postId, session);

  if (!post) {
    return null;
  }

  return (
    <div className="container mx-auto h-screen">
      <div className="flex-1 flex justify-center items-center">
        <SocialPost
          header={post.header}
          description={post.description}
          tripDate={new Date(post.tripDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
          userName={post.userName}
          likes={post.likes}
          dislikes={post.dislikes}
        />
      </div>
      <CommentSection userName={username} postId={postId} />
    </div>
  );
};

export default Post;
