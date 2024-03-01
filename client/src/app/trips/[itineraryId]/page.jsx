import React from "react";

import CalendarView from "./components/CalendarView";
import StartTrip from "./components/StartTrip";

import { getSession } from "@auth0/nextjs-auth0";

const getItinerary = async (itineraryId) => {
  const user = await getSession();

  console.log(user.accessToken);

  const response = await fetch(
    `${process.env.API_URL}/api/itineraries/${itineraryId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.accessToken}`,
      },
    }
  );

  console.log(response.status);

  return response.json();
};

const Itinerary = async ({ params }) => {
  const { itineraryId } = params;

  const itinerary = await getItinerary(itineraryId);

  console.log(itinerary);

  return (
    <>
    {!itinerary && <>No itinerary found</> }
      {itinerary && (
        <>
          <div className="mb-4">
            <h1 className="text-4xl">{itinerary.title}</h1>
          </div>
          <div className="overflow-y-scroll max-h-full mb-4">
            <CalendarView activities={itinerary.activities} />
          </div>
          <div className="flex justify-end">
            <StartTrip itinerary={itinerary} />
          </div>
        </>
      )}
    </>
  );
};

export default Itinerary;
