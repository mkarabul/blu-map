"use client";

import React from "react";
import Link from "next/link";
import { RiMenu3Line } from "@react-icons/all-files/ri/RiMenu3Line.js";

export default function Navbar() {
  return (
    <header className="flex flex-row bg-base-200 w-full min-h-16 p-2">
      {/* Left Section */}
      <div className="left-section flex-1 flex flex-row basis-3/5">
        <Link className="btn btn-ghost text-xl mr-4" href="/">
          <img
            src="/blu-map-logo.jpeg"
            className="mr-2"
            style={{ width: "49px", height: "45px" }}
          />
          <div className="hidden md:block">Blu-Map</div>
        </Link>
        <input
          type="text"
          placeholder="Search"
          // style={{ width: "25rem" }}
          className="input input-bordered min-w-40 w-full mr-4"
        />
      </div>

      {/* Right Section */}
      <div className="right-section basis-2/5 gap-2 flex flex-end justify-end">
        <div className="hidden md:flex flex-row basis-5/6">
          <Link href="/social" className="w-full flex flex-1 flex-grow">
            <button className="btn btn-outline mr-4 flex-1 flex-grow">
              Social
            </button>
          </Link>
          <Link href="/trips" className="w-full flex flex-1 flex-grow">
            <button className="btn btn-outline mr-4 flex-1 flex-grow">
              Trips
            </button>
          </Link>
<<<<<<< HEAD
          <Link href="/profile">
            <button className="btn btn-outline" style={{ width: "10rem" }}>
=======
          <Link href="/profile" className="w-full flex flex-1 flex-grow">
            <button className="btn btn-outline mr-4 flex-1 flex-grow">
>>>>>>> 0eff0a59eef58808b96106651894ab89cb3390f0
              Profile
            </button>
          </Link>
        </div>

        <div className="self-center btn btn-ghost btn-circle flex md:hidden dropdown dropdown-end flex-1 basis-2/3 justify-end">
          <RiMenu3Line color="#fff" size={27} tabIndex={1} />
          <ul
            tabIndex={1}
            className="mt-40 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <Link className="justify-between" href="/social">
                Social
              </Link>
            </li>
            <li>
              <Link className="justify-between" href="/trips">
                Trips
              </Link>
            </li>
            <li>
              <Link className="justify-between" href="/profile">
                Profile
              </Link>
            </li>
          </ul>
        </div>

        {/* Profile Section */}
        <div className="dropdown dropdown-end flex-1 flex justify-end md:justify-center basis-1/6">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar mt-0"
          >
            <div className="w-10 rounded-full top-5">
              <img alt="Tailwind CSS Navbar component" src="/default-pfp.png" />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="mt-12 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <Link className="justify-between" href="/settings">
                Settings
              </Link>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
