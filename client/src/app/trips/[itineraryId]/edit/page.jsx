import React from "react";

import Form from "./components/Form";

import { getSession } from "@auth0/nextjs-auth0";

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

  console.log(response);

  return response.json();
};

const page = async ({ params }) => {
  const { itineraryId } = params;

  const itinerary = await getItinerary(itineraryId);

  console.log(itinerary);

  return <Form itinerary={itinerary} />;
};

export default page;
