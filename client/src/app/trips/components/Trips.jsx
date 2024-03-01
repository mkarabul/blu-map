"use client";

import React from "react";
import useLoadTrips from "./UserTripsHook";
import Trip from "./Trip";

const Trips = () => {
  const { trips, isLoading, deleteTrip } = useLoadTrips();

  return (
    <>
      {isLoading && (
        <div className="flex justify-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}
      {!isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {trips.map((trip) => (
            <Trip key={trip.uuid} trip={trip} deleteTrip={deleteTrip}/>
          ))}
        </div>
      )}
      {!isLoading && trips.length === 0 && (
        <h3 className="text-center">No trips found. Start planning one!</h3>
      )}
    </>
  );
};

export default Trips;
