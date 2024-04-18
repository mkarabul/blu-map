import React from "react";

const TripDetailsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold text-white mb-4">
          Edit Trip Details
        </h2>
        <form>
          <label className="block mb-3 font-medium text-white">
            Edit Current Location:
            <input
              type="text"
              className="mt-1 p-2 border border-gray-300 rounded w-full bg-white text-gray-800"
              placeholder="Current location"
            />
          </label>
          <label className="block mb-3 font-medium text-white">
            Edit Planned Trip Location:
            <input
              type="text"
              className="mt-1 p-2 border border-gray-300 rounded w-full bg-white text-gray-800"
              placeholder="Trip location"
            />
          </label>
          <label className="block mb-3 font-medium text-white">
            Edit Planned Trip Activities:
            <input
              type="text"
              className="mt-1 p-2 border border-gray-300 rounded w-full bg-white text-gray-800"
              placeholder="Trip activities"
            />
          </label>
          <label className="block mb-3 font-medium text-white">
            Edit Planned Trip Attractions:
            <input
              type="text"
              className="mt-1 p-2 border border-gray-300 rounded w-full bg-white text-gray-800"
              placeholder="Trip attractions"
            />
          </label>
          <div className="mt-4 flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Close
            </button>
            <button
              type="submit"
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

export default TripDetailsModal;
