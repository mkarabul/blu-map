import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faUser } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { getSession } from "@auth0/nextjs-auth0";

export default async function Navbar() {
  const session = await getSession();
  const user = session?.user;

  return (
    <header className="navbar bg-base-200 w-100vw z-50 relative">
      {/* Left Section */}
      <div className="left-section flex-1">
        <Link className="btn btn-ghost text-xl" href="/">
          <img
            src="/blu-map-logo.jpeg"
            className="mr-2"
            style={{ width: "49px", height: "45px" }}
          />
          Blu-Map
        </Link>
        {/* <input
          type="text"
          placeholder="Search"
          style={{ width: "25rem" }}
          className="input input-bordered w-full md:w-auto"
        /> */}
      </div>

      {/* Right Section */}
      <div className="right-section flex-none gap-2">
        <div className="form-control"></div>
        <div className="dropdown dropdown-end" style={{ paddingTop: "0rem" }}>
          <Link href="/feed">
            <button className="btn btn-outline mr-4" style={{ width: "10rem" }}>
              Feed
            </button>
          </Link>
          <Link href="/social">
            <button className="btn btn-outline mr-4" style={{ width: "10rem" }}>
              Social
            </button>
          </Link>
          <Link href="/trips">
            <button className="btn btn-outline mr-4" style={{ width: "10rem" }}>
              Trips
            </button>
          </Link>
        </div>

        {/* Profile Section */}
        {user ? <UserDropdown /> : <LogInButton />}
      </div>
    </header>
  );
}

const LogInButton = () => {
  return (
    <a id="login" href="/api/auth/login" className="btn btn-ghost">
      Sign In
    </a>
  );
};
const UserDropdown = () => {
  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle avatar mt-0"
        id="dropdown-button"
      >
        <div className="w-10 rounded-full top-5">
          <FontAwesomeIcon icon={faUser} className="w-10 h-10" />{" "}
        </div>
      </div>
      <ul
        tabIndex={0}
        className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
        id="dropdown-menu"
      >
        <li>
          <Link id="profile-link" className="justify-between" href="/profile">
            Profile
          </Link>
        </li>
        <li>
          <Link id="settings-link" className="justify-between" href="/friends">
            Friends
          </Link>
        </li>
        <li>
          <Link id="settings-link" className="justify-between" href="/settings">
            Settings
          </Link>
        </li>

        <li>
          <Link
            id="notification-link"
            className="justify-between"
            href="/notifications"
          >
            Notifications
          </Link>
        </li>
        <li>
          <Link id="tutorial-link" className="justify-between" href="/tutorial">
            Tutorial
          </Link>
        </li>
        <li>
          <a href="/api/auth/logout">Logout</a>
        </li>
      </ul>
    </div>
  );
};
