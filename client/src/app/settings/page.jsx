"use client";
import React from "react";
import { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import usePublicPrivateMode from "./components/PublicPrivateMode";
import Profile from "./components/SettingsProfile";
import Option from "./components/Option";
import NotificationButton from "./components/NotificationButton";
import ThemeChanger from "./components/ThemeChanger";
import EmailVerificationButton from "./components/EmailVerificationButton";

import {
  faUser,
  faBell,
  faServer,
  faGlobe,
  faHeadphones,
  faRightToBracket,
  faEye,
  faEyeSlash,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import ProfilePhotoUpload from "./components/ProfilePhotoUpload";

export default function Page() {
  const { user } = useUser();
  const { mode, loading, error, toggleMode } = usePublicPrivateMode(user?.sub);
  const [refresh, setRefresh] = useState(0);

  const handleContactUsClick = () => {
    window.open("mailto:blumap9@gmail.com", "_blank");
  };

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
      <div className="space-y-5">
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
        <EmailVerificationButton
          icon={faEnvelope} // Changed to faEnvelope to indicate email
          header="Verify Email"
          context="Confirm your email address to ensure account security "
          link="/settings/verify-email"
        />
        <Option
          icon={faHeadphones}
          header="Customer Support"
          context="Contact Us, Ask Us Anything"
          link="/settings/support"
          onClick={handleContactUsClick}
        />
        <Option
          icon={faRightToBracket}
          header="Log Out"
          context="Log Out of Account"
          link="/api/auth/logout"
        />
      </div>
    </div>
  );
}
