"use client";
import React, { useState, useEffect } from "react";
import ShareButton from "./components/share-button";

export default function Page() {
  const [theme, setTheme] = useState("dark");
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  return (
    <div>
      <ShareButton />
    </div>
  );
}
