"use client";

import React from "react";
import { useState, useEffect } from "react";
import Option from "./Option";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useTheme } from "next-themes";

export default function ThemeChanger() {
  const { user } = useUser();
  const [uiTheme, uiSetTheme] = useState(null);

  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (typeof window !== "undefined") {
      uiSetTheme(theme);
    }
  }, []);

  const toggleTheme = async () => {
    const newTheme = uiTheme === "dark" ? "light" : "dark";
    uiSetTheme(newTheme);
    setTheme(newTheme);

    await fetch(`/api/users/theme/${user?.sub}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ newTheme }),
    });
  };

  return (
    <Option
      icon={faMoon}
      header="Dark Mode"
      context="Toggle between Light and Dark mode"
      link="settings"
      onClick={toggleTheme}
      isToggle={true}
    />
  );
}
