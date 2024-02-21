import Option from "./components/option";
import Profile from "./components/settings-profile";
import {
  faServer,
  faUser,
  faBell,
  faGlobe,
  faHeadphones,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FiToggleLeft, FiToggleRight } from 'react-icons/fi';


export default function Page() {
  const isDarkMode = true;
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
            icon={faHeadphones}
            header="Dark Mode"
            context="Toggle dark mode"
            link="#"
          >
            {isDarkMode ? <FiToggleRight/> : <FiToggleLeft />}
          </Option>
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
