import React, { useState } from "react";
import useProfilePicture from "./useProfilePicture";

const ProfilePictureModal = () => {
  const { state, uploadProfilePicture, deleteProfilePicture } =
    useProfilePicture();
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.match("image.*")) {
      setError("");
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setImage(null);
      setPreviewUrl(null);
      setError("Please select a valid image.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      setError("Please select an image to upload.");
      return;
    }
    const formData = new FormData();
    formData.append("profilePicture", image);

    await uploadProfilePicture(formData);
    setPreviewUrl(null);
    e.target.reset();
  };

  const handleDelete = async () => {
    await deleteProfilePicture();
  };

  return (
    <dialog id="profile_picture_modal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Change Profile Picture</h3>
        <form onSubmit={handleSubmit}>
          {error && <div className="text-red-500">{error}</div>}
          <input type="file" onChange={handleImageChange} accept="image/*" />
          {previewUrl && (
            <div className="mt-4">
              <p>Preview:</p>
              <img
                src={previewUrl}
                alt="Preview"
                className="w-32 h-32 object-cover mt-2"
              />
            </div>
          )}
          <div className="modal-action">
            <button type="submit" className="btn">
              Upload
            </button>
            <button type="button" className="btn" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </form>
        {state.isLoading && <div>Loading...</div>}
        {state.confirmation && (
          <div className="text-green-500">{state.confirmation}</div>
        )}
        {state.error && <div className="text-red-500">{state.error}</div>}
      </div>
    </dialog>
  );
};

export default ProfilePictureModal;
