"use client";
import React, { useState, useEffect } from "react";

import ShareButton from "./components/ShareButton";
import ListPosts from "./components/ListPosts";
import ProfileHeader from "./components/ProfileHeader";
import useLoadPosts from "./components/ProfilePostsHook";

export default function Page() {
  const currUser = "auth0|65df5cc6f0c1754329eca25c";

  const [theme, setTheme] = useState('dark');
  const [isLoadingTheme, setIsLoadingTheme] = useState(true);

  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/users/${currUser}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        const isDarkMode = data.isDarkMode;
        setTheme(isDarkMode ? 'dark' : 'light');
        document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
      } catch (error) {
        console.error('Error fetching user data for theme:', error);
      } finally {
        setIsLoadingTheme(false);
      }
    };

    fetchTheme();
  }, []);

  const { posts, userName, postCount, isLoadingPosts } = useLoadPosts();

  return (
    <div>
      {isLoadingTheme ? (
        <div>Loading theme...</div>
      ) : (
        <>
          <ProfileHeader postCount={postCount} userName={userName} />
          <ListPosts posts={posts} isLoading={isLoadingPosts} />
        </>
      )}
      <ShareButton />
    </div>
  );
}
