"use client";

import React from "react";
import { useState } from "react";
import useCreatePhoto from "./CreatePhotoHook";

const ProfilePhotoUpload = ({ refresh, setRefresh }) => {
  const { userData, state, createUserImage } = useCreatePhoto();

  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const [emptyFieldError, setEmptyFieldError] = useState("");

  const validFileTypes = ["image/jpeg", "image/jpg", "image/png"];

  const handleUpload = (e) => {
    if (e.target.files.length > 1) {
      setError("You can only select up to 1 image.");
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

  const openModal = () => {
    document.getElementById("my_modal_4").showModal();
  };

  const closeModal = () => {
    document.getElementById("my_modal_4").close();
    setEmptyFieldError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (images.length === 0) {
      setEmptyFieldError("Please upload at least one image.");
      return;
    }
    const body = {
      userId: userData.userId,
      userName: userData.userName,
    };
    try {
      const form = new FormData();
      for (let i = 0; i < images.length; i++) {
        form.append("image", images[i]);
      }
      await createUserImage(form, userData.userId);
      closeModal();
      setRefresh(refresh + 1);
    } catch (error) {
      console.error("Error creating post:", error);
      closeModal();
    }
  };

  return (
    <>
      {state.isLoading && (
        <div className="flex justify-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}
      {state.confirmation !== "" && (
        <div className="text-green-500 text-center">{state.confirmation}</div>
      )}
      {state.error !== "" && (
        <div className="text-red-500 text-center">{state.error}</div>
      )}
      <div className="flex flex-col w-36 content-center mb-4">
        <label
          htmlFor="avatar-upload"
          className="self-center cursor-pointer bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-150 ease-in-out"
          onClick={openModal}
        >
          Change Photo
        </label>
      </div>
      <dialog
        id="my_modal_4"
        className="modal fixed inset-0 flex items-center justify-center w-3/4 max-w-3xl mx-auto"
      >
        {" "}
        <div className="modal-box w-full">
          <h3 className="font-bold text-lg mb-4">Upload a profile photo</h3>
          <form onSubmit={handleSubmit}>
            {emptyFieldError !== "" && (
              <div className="text-red-500 text-center">{emptyFieldError}</div>
            )}
            {error !== "" && <p className="text-red-500">{error}</p>}
            <label className="block mb-2">
              Image:
              <input
                type="file"
                placeholder="Upload an image"
                onChange={(e) => {
                  handleUpload(e);
                  setEmptyFieldError("");
                }}
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

export default ProfilePhotoUpload;
