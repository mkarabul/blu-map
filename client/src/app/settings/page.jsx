"use client"
import { useState, useEffect } from 'react';
import Option from "./components/option";
import Profile from "./components/settings-profile";
import {
  faServer,
  faUser,
  faBell,
  faGlobe,
  faHeadphones,
  faRightToBracket,
  faMoon,
  faSun
} from "@fortawesome/free-solid-svg-icons";

export default function Page() {
  let currUser = "auth0|65df5cc6f0c1754329eca25c";

  const [theme, setTheme] = useState('dark');
  const [isLoading, setIsLoading] = useState(true);

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
        setIsLoading(false);
      }
    };

    fetchTheme();
  }, []);
  if (isLoading) return <div>Loading...</div>;

  const toggleTheme = async () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    try {
      const response = await fetch(`http://localhost:5000/api/users/${currUser}/toggle-darkmode`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ isDarkMode: newTheme === 'dark' })
      });
  
      if (!response.ok) {
        throw new Error('Failed to toggle dark mode');
      }
  
      setTheme(newTheme);
      document.documentElement.setAttribute('data-theme', newTheme);
    } catch (error) {
      console.error('Error toggling dark mode via API:', error);
    }
  };
  

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
          icon={theme === 'dark' ? faSun : faMoon}
          header="Dark Mode"
          context="Toggle between Light and Dark mode"
          link="settings"
          onClick={toggleTheme}
          isToggle={true}
        />
        <Option
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
