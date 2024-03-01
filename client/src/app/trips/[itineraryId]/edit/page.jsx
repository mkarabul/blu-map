import React from "react";

import Form from "./components/Form";

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

const page = async ({ params }) => {
  const { itineraryId } = params;

  const itinerary = await getItinerary(itineraryId);

  return <Form itinerary={itinerary} />;
};

export default page;
