import React from "react";

import CalendarView from "./components/CalendarView";
import StartTrip from "./components/StartTrip";

const getItinerary = async (itineraryId) => {
  // Hardcoded data for now
  const itinerary = {
    id: 1,
    title: "Trip to Hawaii",
    activities: [
      {
        id: 1,
        name: "Snorkeling",
        start: new Date("2021-01-01T09:00:00"),
        end: new Date("2021-01-01T12:00:00"),
      },
      {
        id: 2,
        name: "Beach Day",
        start: new Date("2021-01-02T13:00:00"),
        end: new Date("2021-01-02T17:00:00"),
      },
      {
        id: 3,
        name: "Beach Day",
        start: new Date("2021-01-02T09:00:00"),
        end: new Date("2021-01-02T17:00:00"),
      },
      {
        id: 4,
        name: "Snorkeling",
        start: new Date("2021-01-01T09:00:00"),
        end: new Date("2021-01-01T12:00:00"),
      },
      {
        id: 5,
        name: "Beach Day",
        start: new Date("2021-01-02T13:00:00"),
        end: new Date("2021-01-02T17:00:00"),
      },
      {
        id: 6,
        name: "Beach Day",
        start: new Date("2021-01-02T09:00:00"),
        end: new Date("2021-01-02T17:00:00"),
      },
      {
        id: 7,
        name: "Hiking",
        start: new Date("2021-01-03T09:00:00"),
        end: new Date("2021-01-03T12:00:00"),
      },
    ],
  };

  return itinerary;

  // const response = await fetch(`api/itinerary/${itineraryId}`);

  // return response.json();
};

const Itinerary = async ({ params }) => {
  const { itineraryId } = params;

  const itinerary = await getItinerary(itineraryId);

  return (
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
  );
};

export default Itinerary;
