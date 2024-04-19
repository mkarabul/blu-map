"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const CopyPost = ({ tripId }) => {
  const router = useRouter();

  const copy = async () => {
    const response = await fetch(`/api/itineraries/${tripId}/copy`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      console.error("Failed to copy post");
      return;
    }

    const data = await response.json();

    router.push(`/trips/${data.uuid}`);
  };

  return (
    <div className="tooltip" data-tip="View Itinerary">
      <button className="btn btn-outline rounded-full" onClick={copy}>
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </div>
  );
};

export default CopyPost;
