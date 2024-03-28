"use client";
import React, { useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useTheme } from "next-themes";

export default function UserTheme() {
  const { user } = useUser();
  const { theme, setTheme } = useTheme();

  const getTheme = async () => {
    try {
      const response = await fetch(`/api/users/theme/${user?.sub}`);
      const data = await response.json();

      const newTheme = data.isDarkMode ? "dark" : "light";
      setTheme(newTheme);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (user) {
      getTheme();
    }
  }, [user]);

  return null;
}
