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
    };
  } catch (error) {
    console.error("Error loading optional user data:", error);
  } finally {
  }
};

const getPosts = async (user, userName, attemptsLeft = 2) => {
  // It doesn't work first try for me, but always for second attempt...
  const accessToken = user?.accessToken;
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

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
    if (data && Object.keys(data).length !== 0) {
      return data;
    } else if (attemptsLeft > 1) {
      await delay(500);
      return getPosts(user, userName, attemptsLeft - 1);
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error loading posts:", error);
    if (attemptsLeft > 1) {
      await delay(500);
      return getPosts(user, userName, attemptsLeft - 1);
    } else {
      return [];
    }
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
        isOwner={false}
      />
      <ListPosts posts={posts} isLoading={false} />
    </div>
  );
}