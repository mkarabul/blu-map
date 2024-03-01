import React from "react";

import SocialPost from "../../social/components/social-post";

const getPost = async (postId) => {
  const response = await fetch(`/api/post/${postId}`);
  const post = await response.json();
  return post;
};

const Post = async ({ params }) => {
  const { postId } = params;
  const post = await getPost(postId);
  return <div>Post</div>;
};

export default Post;
