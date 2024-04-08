// ProfilePicture.js

import React, { useState, useEffect } from "react";

const ProfilePicture = ({ userName }) => {
  const [profilePicUrl, setProfilePicUrl] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchProfilePicture = async () => {
      try {
        const response = await fetch(`/api/profile-picture/${userName}`);
        if (response.ok) {
          const data = await response.json();
          if (data.url) {
            setProfilePicUrl(data.url);
          } else {
            setProfilePicUrl("/default-pfp.png");
          }
        } else {
          console.error("Failed to fetch profile picture.");
          setProfilePicUrl("/default-pfp.png");
        }
      } catch (error) {
        console.error("Error fetching profile picture:", error);
        setProfilePicUrl("/default-pfp.png");
      }
    };

    fetchProfilePicture();
  }, [userName]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="avatar" onClick={openModal}>
        <div className="w-24 h-24 rounded-full overflow-hidden">
          <img
            src={profilePicUrl}
            alt="Profile"
            className="rounded-full cursor-pointer"
          />
        </div>
      </div>

      {isModalOpen && (
        <dialog open className="modal" onClick={closeModal}>
          <img
            src={profilePicUrl}
            alt="Profile"
            className="rounded max-w-full max-h-screen"
          />
        </dialog>
      )}
    </>
  );
};

export default ProfilePicture;
