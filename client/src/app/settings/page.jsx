"use client";
import { useState } from "react";
import React from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import usePublicPrivateMode from "./components/PublicPrivateMode";
import Profile from "./components/SettingsProfile";
import Option from "./components/Option";
import NotificationButton from "./components/NotificationButton";
import ThemeChanger from "./components/ThemeChanger";
import {
  faUser,
  faBell,
  faServer,
  faGlobe,
  faHeadphones,
  faRightToBracket,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import ProfilePhotoUpload from "./components/ProfilePhotoUpload";

export default function Page() {
  const { user } = useUser();
  const { mode, loading, error, toggleMode } = usePublicPrivateMode(user?.sub);
  const [refresh, setRefresh] = useState(0);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Profile refresh={refresh} />
      <ProfilePhotoUpload refresh={refresh} setRefresh={setRefresh} />
      <h1 className="text-2xl font-semibold mb-6">Settings</h1>
      <div className="space-y-4">
        <Option
          icon={faUser}
          header="Account"
          context="Privacy, security, change email or number"
          link="/settings/account"
        />
        <Option
          icon={mode === "public" ? faEye : faEyeSlash}
          header="Public/Private Mode"
          context="Toggle between Public and Private modes"
          link="/settings/mode"
          onClick={toggleMode}
          isToggle={true}
        />
        <ThemeChanger />
        <NotificationButton
          icon={faBell}
          header="Notifications"
          context="Message & Trip Notifications"
          link="/settings/notifications"
        />
        <Option
          icon={faServer}
          header="Data & Preferences"
          context="User Data, Preferences, Downloaded Trips"
          link="/settings/data"
        />
        <Option
          icon={faGlobe}
          header="Region and Language"
          context="Region & Language"
          link="/settings/region"
        />
        <Option
          icon={faHeadphones}
          header="Customer Support"
          context="Contact Us, About Us, FAQs"
          link="/settings/support"
        />
        <Option
          icon={faRightToBracket}
          header="Log Out"
          context="Log Out of Account"
          link="/settings/logout"
        />
      </div>
    </div>
  );
}
