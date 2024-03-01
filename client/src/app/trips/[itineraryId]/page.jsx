import React from "react";

import CalendarView from "./components/CalendarView";
import StartTrip from "./components/StartTrip";

import { getSession } from "@auth0/nextjs-auth0";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const getItinerary = async (itineraryId) => {
  const user = await getSession();

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

  return response.json();
};

const Itinerary = async ({ params }) => {
  const { itineraryId } = params;

  const itinerary = await getItinerary(itineraryId);
  itinerary.activities = itinerary.activities.map((activity) => ({
    ...activity,
    start: new Date(activity.start),
    end: new Date(activity.end),
  }));

  return (
    <>
      {!itinerary && <>No itinerary found</>}
      {itinerary && (
        <>
          <div className="mb-4 flex gap-4">
            <h1 className="text-4xl">{itinerary.title}</h1>
            <Link
              className="btn btn-ghost btn-square"
              href={`/trips/${itineraryId}/edit`}
            >
              <FontAwesomeIcon className="m-2" icon={faPenToSquare} />
            </Link>
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
