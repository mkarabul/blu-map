"use client";

import { useState, useEffect } from "react";
import Option from "./Option";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

export default function ThemeChanger() {
  const [theme, setTheme] = useState("dark");
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <Option
      icon={theme === "dark" ? faSun : faMoon}
      header="Dark Mode"
      context="Toggle between Light and Dark mode"
      link="settings"
      onClick={toggleTheme}
      isToggle={true}
    />
  );
}
