"use client";

import React from "react";
import useLoadTrips from "./UserTripsHook";
import Trip from "./Trip";
import { useState } from "react";
import useCreatePost from "./CreatePostHook";

const Trips = () => {
  const { trips, isLoading, deleteTrip } = useLoadTrips();
  const { userData, createUserPost } = useCreatePost();

  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [tripDate, setTripDate] = useState("");
  const [tripId, setTripId] = useState("");

  const openModal = (uuid) => {
    setTripId(uuid);
    document.getElementById("my_modal_4").showModal();
  };

  const closeModal = () => {
    document.getElementById("my_modal_4").close();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const body = {
      header: title,
      description,
      tripDate,
      tripId: tripId,
      userId: userData.userId,
      userName: userData.userName,
    };
    try {
      createUserPost(body);
      closeModal();
    } catch (error) {
      console.error("Error creating post:", error);
      // Handle the error here, e.g. show an error message to the user
    }
  };

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
            <Trip
              key={trip.uuid}
              trip={trip}
              deleteTrip={deleteTrip}
              openModal={openModal}
              setTripId={setTripId}
            />
          ))}
        </div>
      )}
      {!isLoading && trips.length === 0 && (
        <h3 className="text-center">No trips found. Start planning one!</h3>
      )}
      <dialog
        id="my_modal_4"
        className="modal fixed inset-0 flex items-center justify-center w-3/4 max-w-3xl mx-auto"
      >
        {" "}
        <div className="modal-box w-full">
          <h3 className="font-bold text-lg mb-4">Create a new post</h3>
          <form onSubmit={handleSubmit}>
            <label className="block mb-2">
              Title:
              <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border rounded mt-1"
              />
            </label>
            <label className="block mb-2">
              Description:
              <textarea
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border rounded mt-1 h-20"
              />
            </label>
            <label className="block mb-2">
              Title:
              <input
                type="text"
                placeholder="YYYY-MM-DD"
                onChange={(e) => setTripDate(e.target.value)}
                className="w-full px-3 py-2 border rounded mt-1"
              />
            </label>
            <div className="modal-action mt-4">
              <button type="submit" className="btn">
                Submit
              </button>
              <button type="button" className="btn" onClick={closeModal}>
                Close
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default Trips;
