import React from "react";
import { getSession } from "@auth0/nextjs-auth0";

import SocialPost from "../../social/components/SocialPost";
import CommentSection from "./components/commentSection";

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
    return null;
  }

  return (
    <div className="container mx-auto h-screen">
      <div className="flex-1 flex justify-center items-center">
        <SocialPost
          uuid={postId}
          ket={postId}
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
          tripId={post.tripId}
          clickable={false}
          images={post.images}
          userPhoto={post.userPhoto}
          isSocialPage={false}
        />
      </div>
      <CommentSection
        //userName={userName}
        //userId={post.?userId}
        postId={postId}
      />
    </div>
  );
};

export default Post;
