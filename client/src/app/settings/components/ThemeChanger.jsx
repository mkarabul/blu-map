"use client";

import { useState, useEffect } from "react";
import Option from "./Option";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function ThemeChanger() {
  const { user } = useUser();
  const [theme, setTheme] = useState("dark");
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
  }, []);

  const toggleTheme = async () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    await fetch(`/api/users/theme/${user?.sub}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ newTheme }),
    });
  };

  return (
    <Option
      icon={theme === "dark" ? faMoon : faSun}
      header="Dark Mode"
      context="Toggle between Light and Dark mode"
      link="settings"
      onClick={toggleTheme}
      isToggle={true}
    />
  );
}
