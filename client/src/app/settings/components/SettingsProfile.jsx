import React, { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function Profile({ refresh }) {
  const { user } = useUser();
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    fetch(`/api/users/${user?.sub}/image`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.length > 0) {
          setProfileImage(data[0]);
        } else {
          setProfileImage("/default-pfp.png");
        }
      })
      .catch((error) => console.error("Error:", error));
  }, [refresh]);

  if (!profileImage) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col w-36 content-center mb-4">
      <img
        src={profileImage || "/default-pfp.png"}
        alt="User Avatar"
        className="self-center w-24 h-24 rounded-full object-cover mb-4"
      />
    </div>
  );
}
