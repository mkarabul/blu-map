"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import React, { useState, useEffect } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import FollowerPopup from "./FollowPopup";


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

  const [showFollowerPopup, setShowFollowerPopup] = useState(false);
  const [showFollowingPopup, setShowFollowingPopup] = useState(false);

  const [followersList, setFollowersList] = useState([]);
  const [followingList, setFollowingList] = useState([]);




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
      const userID = user?.sub
      await fetch(`http://localhost:5000/api/admin/${userName}/increment-report`, {
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
        reporterUserID: user?.sub,
        reportedUserName: userName,
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

  const fetchAndShowFollowerPopup = async () => {
    const response = await fetch(`http://localhost:5000/api/follow/followers/${userName}`);
    const data = await response.json();
  
    if (Array.isArray(data)) {
      // Assuming you want to display the list of userNames of followers
      setFollowersList(data.map(follower => ({ userName: follower.userName })));
      setShowFollowerPopup(true);
    } else {
      alert("not array");
    }
  };
  
  const fetchAndShowFollowingPopup = async () => {
    const response = await fetch(`http://localhost:5000/api/follow/following/${userName}`);
    const data = await response.json();
  
    if (Array.isArray(data)) {
      // Assuming you want to display the list of followingUserNames
      setFollowingList(data.map(following => ({ userName: following.followingUserName })));
      setShowFollowingPopup(true);
    } else {
      alert("not array");
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
      <div onClick={fetchAndShowFollowerPopup} className="info-chip bg-white bg-opacity-20 py-1 px-3 rounded-full shadow inline-flex items-center cursor-pointer">
        <i className="fas fa-user-friends mr-2"></i>
        <span>Followers: {followersCount}</span>
      </div>
      <div onClick={fetchAndShowFollowingPopup} className="info-chip bg-white bg-opacity-20 py-1 px-3 rounded-full shadow inline-flex items-center cursor-pointer">
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
      <button onClick={openReportDialog} class="btn-report-issue transition duration-150 ease-in-out mt-6">
        <i class="fas fa-exclamation-triangle mr-2"></i>
        Report Issue
      </button>
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
    {showFollowerPopup && <FollowerPopup title="Followers" list={followersList} onClose={() => setShowFollowerPopup(false)} />}
    {showFollowingPopup && <FollowerPopup title="Following" list={followingList} onClose={() => setShowFollowingPopup(false)} />}

  </div>
  
  
  );
}