"use client";
import React from "react";
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
        profileName={userData.profileName}
        gender={userData.gender}
        age={userData.age}
        isOwner={true}
      />
      <ListPosts posts={posts} isLoading={isLoading} isOwner={true} userName={userData.userName} />
    </div>
  );
}
