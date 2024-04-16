"use client";

import React, { useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useReportLogic } from "./ReportHook";
import { useFollow } from "./FollowHook";
import BlockButton from "./BlockButton";
import FriendButton from "./FriendButton";

export default function ProfileHeader({
  postCount,
  userName,
  gender,
  age,
  isOwner,
  profileName,
}) {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [genderNew, setGenderNew] = useState("");
  const [ageNew, setAgeNew] = useState(0);
  const [profileNameNew, setProfileNameNew] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  const { handleFollow, handleUnfollow } = useFollow(user, userName);

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
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    if (!userName) {
      return;
    }

    const fetchProfilePicture = async () => {
      try {
        fetch(`/api/users/${userName}/profile-image`)
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
          })
          .then((data) => {
            if (data.length > 0) {
              setProfileImage(data[0]);
            }
          });
      } catch (error) {
        console.error("Error:", error);
      }
    };

    const checkFollowStatus = async () => {
      if (user && userName) {
        try {
          const response2 = await fetch(
            `http://localhost:5000/api/admin/${user?.sub}`
          );
          if (!response2.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response2.json();
          const dataUserName = data.userName;

          const response = await fetch(`/api/follow/followers/${userName}`);
          if (response.ok) {
            const followingUsers = await response.json();
            const isFollowing = followingUsers.some(
              (follower) => follower.userName === dataUserName
            );
            setIsFollowing(isFollowing);
          } else {
            throw new Error("Failed to fetch following status");
          }
        } catch (error) {
          console.error("Error fetching following status:", error);
        }
      }
    };

    const fetchFollowers = async () => {
      try {
        const response = await fetch(`/api/follow/followers/${userName}`);
        if (response.ok) {
          const data = await response.json();
          setFollowersCount(data.length);
        } else {
          throw new Error("Failed to fetch followers");
        }
      } catch (error) {
        console.error("Error fetching follow:", error);
      }
    };

    const fetchFollowing = async () => {
      try {
        const response = await fetch(`/api/follow/following/${userName}`);
        if (response.ok) {
          const data = await response.json();
          setFollowingCount(data.length);
        } else {
          throw new Error("Failed to fetch following");
        }
      } catch (error) {
        console.error("Error fetching following:", error);
      }
    };

    Promise.all([
      fetchProfilePicture(),
      fetchFollowers(),
      fetchFollowing(),
      checkFollowStatus(),
    ]).then(() => {
      setIsLoading(false);
    });
  }, [user?.sub, userName]);

  if (isLoading) {
    return (
      <div>
        <h1>loading...</h1>
      </div>
    );
  }

  const followUnfollowButton = isFollowing ? (
    <button
      onClick={handleUnfollow}
      className="btn-unfollow transition duration-150 ease-in-out"
    >
      <i className="fas fa-user-minus mr-2"></i>
      Unfollow
    </button>
  ) : (
    <button
      onClick={handleFollow}
      className="btn-follow transition duration-150 ease-in-out"
    >
      <i className="fas fa-user-plus mr-2"></i>
      Follow
    </button>
  );

  const handleSubmit = async (event) => {
    event.preventDefault();

    const updateUserResponse = await fetch(`/api/users/${user?.sub}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ genderNew, ageNew, profileNameNew }),
    });

    if (updateUserResponse.ok) {
      setGenderNew("");
      setAgeNew(0);
      setIsEditOpen(false);
      setProfileNameNew("");
    } else {
      console.error("Error updating user fields");
    }
  };

  return (
    <div className="profile-header bg-gradient-to-r from-blue-500 to-indigo-600 w-full text-center py-10 relative flex flex-col items-center justify-center rounded-lg shadow-lg">
      <div className="avatar mb-4 group">
        <div className="w-24 h-24 rounded-full overflow-hidden group-hover:ring-2 group-hover:ring-indigo-300">
          <img
            src={profileImage || "/default-pfp.png"}
            alt="Profile avatar"
            className="rounded-full transition duration-300 ease-in-out"
          />
        </div>
      </div>
      <h1 className="text-white text-3xl font-semibold">{userName}</h1>
      {!isOwner && <FriendButton userName={userName} />}
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
        <BlockButton isOwner={isOwner} userName={userName} user={user} />
      </div>
      {!isOwner && (
        <div className="flex mt-6 space-x-3">
          {followUnfollowButton}

          <button
            onClick={openReportDialog}
            className="btn-report-issue transition duration-150 ease-in-out"
          >
            <i className="fas fa-exclamation-triangle mr-2"></i>
            Report Issue
          </button>
        </div>
      )}
      {isOwner && (
        <div className="flex space-x-3 mt-6">
          <button
            onClick={openEditDialog}
            className="btn-edit-profile transition duration-150 ease-in-out"
          >
            <i className="fas fa-edit mr-2"></i>
            Edit Profile
          </button>
        </div>
      )}

      <dialog open={isEditOpen} className="modal">
        <form onSubmit={handleSubmit} className="modal-box">
          <button
            onClick={closeEditDialog}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
          <div className="flex flex-col mt-4">
            <label htmlFor="genderNew" className="text-white text-base">
              Gender:
            </label>
            <input
              type="text"
              id="genderNew"
              className="input input-bordered"
              value={genderNew}
              onChange={(e) => setGenderNew(e.target.value)}
              placeholder="Enter your gender"
            />
          </div>
          <div className="flex flex-col mt-4">
            <label htmlFor="ageNew" className="text-white text-base">
              Age:
            </label>
            <input
              type="number"
              id="ageNew"
              className="input input-bordered"
              value={ageNew}
              onChange={(e) => setAgeNew(parseInt(e.target.value))}
              placeholder="Enter your age"
            />
          </div>
          <button type="submit" className="btn btn-primary mt-4">
            Submit
          </button>
        </form>
      </dialog>

      <dialog open={isReportOpen} className="modal">
        <form onSubmit={handleReportSubmit} className="modal-box">
          <button
            onClick={closeReportDialog}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
          <div className="flex flex-col mt-4">
            <label htmlFor="header" className="text-white text-base">
              Header:
            </label>
            <input
              type="text"
              id="header"
              className="input input-bordered"
              value={header}
              onChange={(e) => setHeader(e.target.value)}
              required
              placeholder="Report Header"
            />
          </div>
          <div className="flex flex-col mt-4">
            <label htmlFor="description" className="text-white text-base">
              Description:
            </label>
            <textarea
              id="description"
              className="textarea textarea-bordered"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              placeholder="Report Description"
            ></textarea>
          </div>
          <div className="flex flex-col mt-4">
            <label htmlFor="reportType" className="text-white text-base">
              Type of Report:
            </label>
            <select
              id="reportType"
              className="select select-bordered"
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              required
            >
              <option value="">Select a type</option>
              <option value="Conduct Issue">Conduct Issue</option>
              <option value="Spam">Spam</option>
              <option value="Inappropriate Content">
                Inappropriate Content
              </option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary mt-4">
            Submit Report
          </button>
        </form>
      </dialog>
    </div>
  );
}
