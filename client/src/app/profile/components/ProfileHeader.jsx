"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import React, { useState } from "react";

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
  const [genderNew, setGenderNew] = useState("");
  const [ageNew, setAgeNew] = useState(0);
  const [header, setHeader] = useState("");
  const [description, setDescription] = useState("");
  const [reportType, setReportType] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

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
      // replace this w the actual user ID of the profile
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
        // replace this w the actual user ID of the profile
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

  return (
    <div id="background" className="profile-header bg-primary w-full text-center p-10 relative flex flex-col items-center justify-center">
      <div className="avatar">
        <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
          <img src="/default-pfp.png" alt="Profile avatar" />
        </div>
      </div>
      <p className="text-white text-base mt-4">{userName}</p>
      <div className="flex space-x-4 text-white text-base mt-4">
        <p>Followers: 0</p>
        <p>Posts: {postCount}</p>
      </div>
      {age !== 0 && gender !== "" && (
        <div className="flex space-x-4 text-white text-base mt-4">
          <p id="gender">Gender: {gender}</p>
          <p id="age">Age: {age}</p>
        </div>
      )}
      {isOwner && (
        <div className="edit-button absolute top-2 right-2 text-white text-base cursor-pointer" onClick={openEditDialog}>
          Edit
        </div>
      )}
      {isOwner && (
        <div className="report-button absolute top-2 left-2 text-white text-base cursor-pointer" onClick={openReportDialog}>
          Report
        <div
          className="absolute top-2 right-2 text-white text-base cursor-pointer"
          onClick={openDialog}
        >
          Edit
        </div>
      )}
      <dialog open={isOpen} id="share_modal" className="modal">
        <div className="modal-box">
          <form method="dialog" onSubmit={handleSubmit}>
            <button
              onClick={closeDialog}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
            </button>
            <div className="flex flex-col mt-4">
              <label htmlFor="gender" className="text-white text-base">
                Gender:
              </label>
              <input
                type="text"
                id="gender"
                className="w-full px-4 py-2 mt-2 rounded-lg border border-gray-300 focus:outline-none focus:border-primary"
                placeholder="Enter your gender"
                value={genderNew}
                onChange={(e) => setGenderNew(e.target.value)}
              />
            </div>
            <div className="flex flex-col mt-4">
              <label htmlFor="age" className="text-white text-base">
                Age:
              </label>
              <input
                type="number"
                id="age"
                className="w-full px-4 py-2 mt-2 rounded-lg border border-gray-300 focus:outline-none focus:border-primary"
                placeholder="Enter your age"
                value={ageNew}
                onChange={(e) => setAgeNew(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary mt-4">
              Submit
            </button>
          </form>
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
