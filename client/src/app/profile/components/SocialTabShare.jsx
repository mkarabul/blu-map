"use client";
import { faUsers, faUsersSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function SocialTabShare({ isSocial, uuid }) {
  const [social, setSocial] = useState(isSocial);

  const handleClick = async (event) => {
    event.preventDefault();

    const updateUserResponse = await fetch(`/api/social-post/${uuid}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    });

    if (updateUserResponse.ok) {
      setSocial(!social);
    } else {
      console.error("Error creating social post");
    }
  };

  return (
    <div className="tooltip" data-tip="Social Status">
      <button className="btn btn-outline rounded-full" onClick={handleClick}>
        {social ? (
          <FontAwesomeIcon icon={faUsersSlash} />
        ) : (
          <FontAwesomeIcon icon={faUsers} />
        )}
      </button>
    </div>
  );
}
