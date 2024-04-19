import React from "react";
import { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";

const PreferencesModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const { user } = useUser();
  const [locations, setLocations] = useState("");
  const [interest, setInterest] = useState("");
  const [attractions, setAttractions] = useState("");
  const [emptyFieldError, setEmptyFieldError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (locations === "" && interest === "" && attractions == "") {
      setEmptyFieldError("Please fill out at least one field.");
      return;
    }
    const body = {
      locations: locations.split(","),
      interest: interest.split(","),
      attractions: attractions.split(","),
    };
    try {
      onClose();
    } catch (error) {
      console.error("Error updating preferences:", error);
      onClose();
    }
  };

  return (
    <div
      id="customModal"
      className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center"
    >
      <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
        {emptyFieldError !== "" && (
          <div className="text-red-500 text-center">{emptyFieldError}</div>
        )}
        <h2 className="text-lg font-semibold text-white mb-4">
          Edit Preferences
        </h2>
        <form>
          <label className="block mb-3 font-medium text-white">
            Add Location Interests:
            <input
              type="text"
              onChange={(e) => {
                setLocations(e.target.value);
                setEmptyFieldError("");
              }}
              className="mt-1 p-2 border border-gray-300 rounded w-full bg-white text-gray-800"
              placeholder="West Lafayette, New York City, Los Angeles, Paris, London, Berlin"
            />
          </label>
          <label className="block mb-3 font-medium text-white">
            Add Activity Interests:
            <input
              type="text"
              onChange={(e) => {
                setInterest(e.target.value);
                setEmptyFieldError("");
              }}
              className="mt-1 p-2 border border-gray-300 rounded w-full bg-white text-gray-800"
              placeholder="Swimming, Hiking, Shopping, Sightseeing, Dining, Nightlife"
            />
          </label>
          <label className="block mb-3 font-medium text-white">
            Add Attraction Interest:
            <input
              type="text"
              onChange={(e) => {
                setAttractions(e.target.value);
                setEmptyFieldError("");
              }}
              className="mt-1 p-2 border border-gray-300 rounded w-full bg-white text-gray-800"
              placeholder="Eiffel Tower, Statue of Liberty, Big Ben, Colosseum, Great Wall of China, Taj Mahal"
            />
          </label>
          <div className="mt-4 flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => {
                onClose();
                setEmptyFieldError("");
              }}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Close
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PreferencesModal;
