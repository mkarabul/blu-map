"use client"
import { useState, useEffect } from "react";
import Option from "./components/Option";
import Profile from "./components/SettingsProfile";
import NotificationButton from "./components/NotificationButton";
import {
  faServer,
  faUser,
  faBell,
  faGlobe,
  faHeadphones,
  faRightToBracket,
  faMoon,
  faSun,
  faEye,
  faEyeSlash
} from "@fortawesome/free-solid-svg-icons";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function Page() {
  const { user } = useUser();
  const userID = user?.sub;

  const [theme, setTheme] = useState("dark");
  const [mode, setMode] = useState("public");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserMode = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/admin/${userID}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const userData = await response.json();
        setMode(userData.isPublic ? 'public' : 'private');
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  
    fetchUserMode();
  }, [userID]);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const toggleMode = async () => {
    try {
      const newMode = mode === "public" ? "private" : "public";
      const response = await fetch(`http://localhost:5000/api/users/${userID}/toggle-public`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ mode: newMode })
      });

      if (!response.ok) {
        throw new Error('Failed to toggle mode');
      }

      setMode(newMode);
      alert(`You are now in ${newMode} mode`);
    } catch (error) {
      console.error('Error toggling mode:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Display loading message
  }

  return (
    <div className="container mx-auto p-4">
      <Profile />
      <h1 className="text-2xl font-semibold mb-6">Settings</h1>
      <div className="space-y-4">
        <Option
          icon={faUser}
          header="Account"
          context="Privacy, security, change email or number"
          link="settings"
        />
        <Option
          icon={theme === "dark" ? faSun : faMoon}
          header="Dark Mode"
          context="Toggle between Light and Dark mode"
          link="settings"
          onClick={toggleTheme}
          isToggle={true}
        />
        <Option
          icon={mode === "public" ? faEye : faEyeSlash}
          header="Public/Private Mode"
          context="Toggle between Public and Private modes"
          link="settings"
          onClick={toggleMode}
          isToggle={true}
        />
        <NotificationButton
          icon={faBell}
          header="Notifications"
          context="Message & Trip Notifications"
          link="settings"
        />
        <Option
          icon={faServer}
          header="Data & Preferences"
          context="User Data, Preferencesm Downloaded Trips"
          link="settings"
        />
        <Option
          icon={faGlobe}
          header="Region and Language"
          context="Region & Language"
          link="settings"
        />
        <Option
          icon={faHeadphones}
          header="Customer Support"
          context="Contact Us, About Us, FAQs"
          link="settings"
        />
        <Option
          icon={faRightToBracket}
          header="Log Out"
          context="Log Out of Account"
          link="settings"
        />
      </div>
    </div>
  );
}
