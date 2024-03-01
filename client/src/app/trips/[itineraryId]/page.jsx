import React from "react";

const getItinerary = async (itineraryId) => {
  const response = await fetch(`api/itinerary/${itineraryId}`);

  return response.json();
};

const Itinerary = async ({ params }) => {
  const { itineraryId } = params;

  const itinerary = await getItinerary(itineraryId);

  return (
    <>
      <div></div>
      <div></div>
    </>
  );
};

export default Itinerary;
