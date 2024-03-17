"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import React, { useState, useEffect } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function ProfileHeader({
  postCount,
  userName,
  gender,
  age,
  isOwner,
}) {
  const { user } = useUser();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [genderNew, setGenderNew] = useState('');
  const [ageNew, setAgeNew] = useState(0);
  const [header, setHeader] = useState('');
  const [description, setDescription] = useState('');
  const [reportType, setReportType] = useState('');
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  const fetchUserCounts = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/username/${userName}`, {
        method: 'GET',
      });
      const data = await response.json();
      setFollowersCount(data.followers);
      setFollowingCount(data.following);
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserCounts();
    }
  }, [user, userName]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    alert(genderNew);
    alert(ageNew);

    const updateUserResponse = await fetch(`/api/users/${user?.sub}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ gender: genderNew, age: ageNew }),
    });

    if (updateUserResponse.ok) {
      setGenderNew("");
      setAgeNew(0);
      setIsEditOpen(false);
    } else {
      console.error("Error updating user fields");
    }
  };

  const handleReportSubmit = async (event) => {
    event.preventDefault();
    try {
      const userID = user?.sub;
      await fetch(`http://localhost:5000/api/admin/${userID}/increment-report`, {
        method: 'PATCH',
      });
    }
    catch (error) {
      console.error('Error resolving report:', error);
      alert(`Error: ${error.message}`);
    }

    const reportResponse = await fetch(`/api/reports`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        reporterUserId: user?.sub,
        reportedUserId: user?.sub,
        header,
        description,
        reportType,
      }),
    });

    if (reportResponse.ok) {
      setHeader("");
      setDescription("");
      setReportType("");
      setIsReportOpen(false);
      alert("The report was successfully submitted");
    } else {
      console.error("Error submitting report");
      alert("There was an error, try again later");
    }
  };

  const openEditDialog = () => setIsEditOpen(true);
  const closeEditDialog = () => setIsEditOpen(false);
  const openReportDialog = () => setIsReportOpen(true);
  const closeReportDialog = () => setIsReportOpen(false);

  const [isFollowing, setIsFollowing] = useState(false);
  const toggleFollow = () => setIsFollowing(!isFollowing);

  const followButton = isOwner && (
    <button
      className={`text-white text-base cursor-pointer px-4 py-2 rounded-lg shadow-md transition-all ease-in-out duration-300 ${
        isFollowing ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"
      }`}
      onClick={toggleFollow}
    >
      {isFollowing ? "Unfollow" : "Follow"}
    </button>
  );

  return (
    <div id="background" className="profile-header bg-gradient-to-r from-blue-500 to-indigo-600 w-full text-center py-10 relative flex flex-col items-center justify-center rounded-lg shadow-lg">
      <div className="avatar mb-4 group">
        <div className="w-24 h-24 rounded-full overflow-hidden group-hover:ring-2 group-hover:ring-indigo-300">
          <img src="/default-pfp.png" alt="Profile avatar" className="rounded-full transition duration-300 ease-in-out" />
        </div>
      </div>
      <h1 className="text-white text-3xl font-semibold">{userName}</h1>
      <div className="flex space-x-4 text-white mt-4">
        <div className="info-chip bg-white bg-opacity-20 py-1 px-3 rounded-full shadow inline-flex items-center">
          <i className="fas fa-user-friends mr-2"></i>
          <span>Followers: {followersCount}</span>
        </div>
        <div className="info-chip bg-white bg-opacity-20 py-1 px-3 rounded-full shadow inline-flex items-center">
          <i className="fas fa-user-plus mr-2"></i>
          <span>Following: {followingCount}</span>
        </div>
      </div>

      <div className="flex space-x-4 text-white mt-4">
        <div className="info-chip bg-white bg-opacity-20 py-1 px-3 rounded-full shadow inline-flex items-center">
          <i className="fas fa-pencil-alt mr-2"></i>
          <span>Posts: {postCount}</span>
        </div>
      </div>
      <div className="mt-4">
        <div className="info-chip bg-white bg-opacity-20 py-1 px-3 rounded-full shadow inline-flex items-center mr-2">
          <span>Gender: {gender}</span>
        </div>
        <div className="info-chip bg-white bg-opacity-20 py-1 px-3 rounded-full shadow inline-flex items-center">
          <span>Age: {age}</span>
        </div>
      </div>
      {!isOwner && (
        <button onClick={openReportDialog} className="btn-report-issue transition duration-150 ease-in-out mt-6">
          <i className="fas fa-exclamation-triangle mr-2"></i>
          Report Issue
        </button>
      )}
      {isOwner && (
        <div className="flex space-x-3 mt-6">
          <button onClick={openEditDialog} className="btn-edit-profile transition duration-150 ease-in-out">
            <i className="fas fa-edit mr-2"></i>
            Edit Profile
          </button>
        </div>
      )}

      <dialog open={isEditOpen} className="modal">
        <form onSubmit={handleSubmit} className="modal-box">
          <button onClick={closeEditDialog} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          <div className="flex flex-col mt-4">
            <label htmlFor="genderNew" className="text-white text-base">Gender:</label>
            <input type="text" id="genderNew" className="input input-bordered" value={genderNew} onChange={(e) => setGenderNew(e.target.value)} placeholder="Enter your gender" />
          </div>
          <div className="flex flex-col mt-4">
            <label htmlFor="ageNew" className="text-white text-base">Age:</label>
            <input type="number" id="ageNew" className="input input-bordered" value={ageNew} onChange={(e) => setAgeNew(parseInt(e.target.value))} placeholder="Enter your age" />
          </div>
          <button type="submit" className="btn btn-primary mt-4">Submit</button>
        </form>
      </dialog>

      <dialog open={isReportOpen} className="modal">
        <form onSubmit={handleReportSubmit} className="modal-box">
          <button onClick={closeReportDialog} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          <div className="flex flex-col mt-4">
            <label htmlFor="header" className="text-white text-base">Header:</label>
            <input type="text" id="header" className="input input-bordered" value={header} onChange={(e) => setHeader(e.target.value)} required placeholder="Report Header" />
          </div>
          <div className="flex flex-col mt-4">
            <label htmlFor="description" className="text-white text-base">Description:</label>
            <textarea id="description" className="textarea textarea-bordered" value={description} onChange={(e) => setDescription(e.target.value)} required placeholder="Report Description"></textarea>
          </div>
          <div className="flex flex-col mt-4">
            <label htmlFor="reportType" className="text-white text-base">Type of Report:</label>
            <select id="reportType" className="select select-bordered" value={reportType} onChange={(e) => setReportType(e.target.value)} required>
              <option value="">Select a type</option>
              <option value="Conduct Issue">Conduct Issue</option>
              <option value="Spam">Spam</option>
              <option value="Inappropriate Content">Inappropriate Content</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary mt-4">Submit Report</button>
        </form>
      </dialog>
    </div>
  );
}
