"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import React, { useState, useEffect } from "react";
import { useReportLogic } from "./ReportHook";
import { useFollow } from "./FollowHook";

export default function ProfileHeader({
  postCount,
  userName,
  gender,
  age,
  isOwner,
}) {

  const { user } = useUser();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [genderNew, setGenderNew] = useState('');
  const [ageNew, setAgeNew] = useState(0);

  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  const { isFollowing, handleFollow } = useFollow(user, userName);

  const openEditDialog = () => setIsEditOpen(true);
  const closeEditDialog = () => setIsEditOpen(false);

  const {
    isReportOpen,
    header,
    description,
    reportType,
    setHeader,
    setDescription,
    setReportType,
    openReportDialog,
    closeReportDialog,
    handleReportSubmit,
  } = useReportLogic(user, userName);

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/follow/followers/${userName}`);
        if (response.ok) {
          const data = await response.json();
          setFollowersCount(data.length); // Assuming the response is an array of followers
        } else {
          throw new Error('Failed to fetch followers');
        }
      } catch (error) {
        console.error('Error fetching followers:', error);
      }
    };

    const fetchFollowing = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/follow/following/${userName}`);
        if (response.ok) {
          const data = await response.json();
          setFollowingCount(data.length); // Assuming the response is an array of following
        } else {
          throw new Error('Failed to fetch following');
        }
      } catch (error) {
        console.error('Error fetching following:', error);
      }
    };

    fetchFollowers();
    fetchFollowing();
  }, [userName]); // Ensure useEffect runs when userName changes

  const handleSubmit = async (event) => {
    event.preventDefault();

    const updateUserResponse = await fetch(`/api/users/${user?.sub}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ genderNew, ageNew }),
    });

    if (updateUserResponse.ok) {
      setGenderNew("");
      setAgeNew(0);
      setIsOpen(false);
    } else {
      console.error("Error updating user fields");
    }
  };

  return (
    <div id="background" class="profile-header bg-gradient-to-r from-blue-500 to-indigo-600 w-full text-center py-10 relative flex flex-col items-center justify-center rounded-lg shadow-lg">
    <div class="avatar mb-4 group">
      <div class="w-24 h-24 rounded-full overflow-hidden group-hover:ring-2 group-hover:ring-indigo-300">
        <img src="/default-pfp.png" alt="Profile avatar" class="rounded-full transition duration-300 ease-in-out" />
      </div>
    </div>
    <h1 className="text-white text-3xl font-semibold">{userName}</h1>
    <div className="flex space-x-4 text-white mt-4">
      <div className="info-chip bg-white bg-opacity-20 py-1 px-3 rounded-full shadow inline-flex items-center cursor-pointer">
        <i className="fas fa-user-friends mr-2"></i>
        <span>Followers: {followersCount}</span>
      </div>
      <div className="info-chip bg-white bg-opacity-20 py-1 px-3 rounded-full shadow inline-flex items-center cursor-pointer">
        <i className="fas fa-user-plus mr-2"></i>
        <span>Following: {followingCount}</span>
      </div>
    </div>
  
    <div class="flex space-x-4 text-white mt-4">
      <div class="info-chip bg-white bg-opacity-20 py-1 px-3 rounded-full shadow inline-flex items-center">
        <i class="fas fa-pencil-alt mr-2"></i>
        <span>Posts: {postCount}</span>
      </div>
    </div>
    <div class="mt-4">
      <div class="info-chip bg-white bg-opacity-20 py-1 px-3 rounded-full shadow inline-flex items-center mr-2">
        <span>Gender: {gender}</span>
      </div>
      <div class="info-chip bg-white bg-opacity-20 py-1 px-3 rounded-full shadow inline-flex items-center">
        <span>Age: {age}</span>
      </div>
    </div>
    {!isOwner && (
      <div className="flex mt-6 space-x-3">
        <button onClick={handleFollow} className="btn-follow transition duration-150 ease-in-out">
          <i className="fas fa-user-plus mr-2"></i>
          Follow
        </button>
          <button onClick={openReportDialog} className="btn-report-issue transition duration-150 ease-in-out">
            <i className="fas fa-exclamation-triangle mr-2"></i>
            Report Issue
          </button>
        </div>
      )}
    {isOwner && (
      <div class="flex space-x-3 mt-6">
        <button onClick={openEditDialog} class="btn-edit-profile transition duration-150 ease-in-out">
          <i class="fas fa-edit mr-2"></i>
          Edit Profile
        </button>
      </div>
    )}
  
    <dialog open={isEditOpen} class="modal">
      <form onSubmit={handleSubmit} class="modal-box">
        <button onClick={closeEditDialog} class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        <div class="flex flex-col mt-4">
          <label for="genderNew" class="text-white text-base">Gender:</label>
          <input type="text" id="genderNew" class="input input-bordered" value={genderNew} onChange={(e) => setGenderNew(e.target.value)} placeholder="Enter your gender" />
        </div>
        <div class="flex flex-col mt-4">
          <label for="ageNew" class="text-white text-base">Age:</label>
          <input type="number" id="ageNew" class="input input-bordered" value={ageNew} onChange={(e) => setAgeNew(parseInt(e.target.value))} placeholder="Enter your age" />
        </div>
        <button type="submit" class="btn btn-primary mt-4">Submit</button>
      </form>
    </dialog>
  
    <dialog open={isReportOpen} class="modal">
      <form onSubmit={handleReportSubmit} class="modal-box">
        <button onClick={closeReportDialog} class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        <div class="flex flex-col mt-4">
          <label for="header" class="text-white text-base">Header:</label>
          <input type="text" id="header" class="input input-bordered" value={header} onChange={(e) => setHeader(e.target.value)} required placeholder="Report Header" />
        </div>
        <div class="flex flex-col mt-4">
          <label for="description" class="text-white text-base">Description:</label>
          <textarea id="description" class="textarea textarea-bordered" value={description} onChange={(e) => setDescription(e.target.value)} required placeholder="Report Description"></textarea>
        </div>
        <div class="flex flex-col mt-4">
          <label for="reportType" class="text-white text-base">Type of Report:</label>
          <select id="reportType" class="select select-bordered" value={reportType} onChange={(e) => setReportType(e.target.value)} required>
            <option value="">Select a type</option>
            <option value="Conduct Issue">Conduct Issue</option>
            <option value="Spam">Spam</option>
            <option value="Inappropriate Content">Inappropriate Content</option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary mt-4">Submit Report</button>
      </form>
    </dialog>
  </div>
  
  
  );
}