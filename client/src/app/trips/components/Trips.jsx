"use client";

import React from "react";
import useLoadTrips from "./UserTripsHook";
import Trip from "./Trip";
import { useState } from "react";
import useCreatePost from "./CreatePostHook";

const Trips = () => {
  const { trips, isLoading, deleteTrip } = useLoadTrips();
  const { userData, state, createUserPost, createUserImage } = useCreatePost();

  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [tripDate, setTripDate] = useState("");
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const [tripId, setTripId] = useState("");

  const validFileTypes = ["image/jpeg", "image/jpg", "image/png"];

  const handleUpload = (e) => {
    if (e.target.files.length > 5) {
      setError("You can only select up to 5 images.");
      e.target.value = "";
    } else {
      for (let i = 0; i < e.target.files.length; i++) {
        if (!validFileTypes.includes(e.target.files[i].type)) {
          setError("Invalid file type. Please select an image.");
          e.target.value = "";
          return;
        }
      }
      setError("");
      setImages(e.target.files);
    }
  };

  const openModal = (uuid) => {
    setTripId(uuid);
    document.getElementById("my_modal_4").showModal();
  };

  const closeModal = () => {
    document.getElementById("my_modal_4").close();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const body = {
      header: title,
      description,
      tripDate,
      tripId: tripId,
      userId: userData.userId,
      userName: userData.userName,
    };
    const form = new FormData();
    for (let i = 0; i < images.length; i++) {
      form.append("image", images[i]);
    }
    try {
      await createUserPost(body);
      await createUserImage(form, tripId);
      closeModal();
    } catch (error) {
      console.error("Error creating post:", error);
      // Handle the error here, e.g. show an error message to the user
    }
  };

  return (
    <>
      {state.isLoading && (
        <div className="flex justify-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}
      {state.error !== "" && (
        <div className="text-red-500 text-center">{state.error}</div>
      )}
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
              Date:
              <input
                type="text"
                placeholder="YYYY-MM-DD"
                onChange={(e) => setTripDate(e.target.value)}
                className="w-full px-3 py-2 border rounded mt-1"
              />
            </label>
            {error !== "" && <p className="text-red-500">{error}</p>}
            <label className="block mb-2">
              Images:
              <input
                type="file"
                placeholder="Upload images"
                onChange={handleUpload}
                multiple
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
