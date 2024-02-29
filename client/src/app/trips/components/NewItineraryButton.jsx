import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

const NewItineraryButton = () => {
  const router = useRouter();

  const handleCreateItinerary = async () => {
    const response = await fetch("/api/itineraries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });
    const itinerary = await response.json();

    if (!response.ok) {
      console.error(itinerary);
      return;
    }

    router.push(`/trips/${itinerary.uuid}`);
  };

  return (
    <button
      className="btn btn-circle btn-secondary fixed bottom-8 right-8 border-2 align-middle"
      onClick={handleCreateItinerary}
    >
      <FontAwesomeIcon icon={faPlus} className="p-3" size="xl" />
    </button>
  );
};

export default NewItineraryButton;
