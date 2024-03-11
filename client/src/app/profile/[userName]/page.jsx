import React from "react";
import ListPosts from "../components/ListPosts";
import ProfileHeader from "../components/ProfileHeader";

import { getSession } from "@auth0/nextjs-auth0";

const getUserData = async (user, userName) => {
  const accessToken = user?.accessToken;
  try {
    const optionalResponse = await fetch(
      `${process.env.API_URL}/api/users/username/${userName}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const optionalData = await optionalResponse.json();

    return {
      gender: optionalData.gender,
      age: optionalData.age,
      userName: optionalData.userName,
      profileName: optionalData.profileName,
    };
  } catch (error) {
    console.error("Error loading optional user data:", error);
  } finally {
  }
};

const getPosts = async (user, userName) => {
  const accessToken = user?.accessToken;
  try {
    const response = await fetch(
      `${process.env.API_URL}/api/profile-trip/public/${userName}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error loading posts:", error);
    return [];
  }
};

export default async function Page({ params }) {
  const { userName } = params;
  const user = getSession();
  const [posts, userData] = await Promise.all([
    getPosts(user, userName),
    getUserData(user, userName),
  ]);

  return (
    <div>
      <ProfileHeader
        postCount={posts.length}
        userName={userData.userName}
        gender={userData.gender}
        age={userData.age}
        profileName={userData.profileName}
        isOwner={false}
      />
      <ListPosts posts={posts} isLoading={false} />
    </div>
  );
}
