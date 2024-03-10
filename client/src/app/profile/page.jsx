"use client";
import React, { useState, useEffect } from "react";
import ShareButton from "./components/ShareButton";
import ListPosts from "./components/ListPosts";
import ProfileHeader from "./components/ProfileHeader";
import useLoadPosts from "./components/ProfilePostsHook";

export default function Page() {
  const { posts, postCount, isLoading, userData } = useLoadPosts();

  return (
    <div>
      <ProfileHeader
        postCount={postCount}
        userName={userData.userName}
        gender={userData.gender}
        age={userData.age}
        isOwner={true}
      />
      <ListPosts posts={posts} isLoading={isLoading} />
    </div>
  );
}
