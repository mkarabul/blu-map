import { useUser } from "@auth0/nextjs-auth0/client";
import React, { useState } from "react";

export default function ProfileHeader({ postCount, userName, gender, age }) {
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [genderNew, setGenderNew] = useState("");
  const [ageNew, setAgeNew] = useState(0);

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

  const openDialog = () => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  return (
    <div id="background" className="profile-header bg-primary w-full text-center p-10 relative flex flex-col items-center justify-center">
      <div className="avatar">
        <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
          <img src="/default-pfp.png" />
        </div>
      </div>
      <p className="text-white text-base mt-4">{userName}</p>
      <div className="flex space-x-4 text-white text-base mt-4">
        <p>Followers: 0</p>
        <p>Posts: {postCount}</p>
      </div>
      {age !== 0 && gender !== "" && (
        <>
          <div className="flex space-x-4 text-white text-base mt-4">
            <p id="gender">Gender: {gender}</p>
            <p id="age">Age: {age}</p>
          </div>
        </>
      )}
      <div
        id="edit"
        className="absolute top-2 right-2 text-white text-base cursor-pointer"
        onClick={openDialog}
      >
        Edit
      </div>
      <dialog open={isOpen} id="share_modal" className="modal">
        <div className="modal-box">
          <form method="dialog" onSubmit={handleSubmit}>
            <button
              onClick={closeDialog}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
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
      </dialog>
    </div>
  );
}
