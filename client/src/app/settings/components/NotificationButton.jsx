import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function NotificationButton({ icon, header, context }) {
  const [isOpen, setIsOpen] = useState(false);
  const [genderNew, setGenderNew] = useState("");
  const [ageNew, setAgeNew] = useState("");

  const openPopup = () => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle the form submission here
  };

  const [scheduledNotification, setScheduledNotification] = useState("");
  const [notificationBeforeActivity, setNotificationBeforeActivity] =
    useState("");

  return (
    <div className="mb-4">
      <div
        className="block border p-2 rounded-lg shadow hover:bg-gray-600 transition duration-150 ease-in-out cursor-pointer"
        onClick={openPopup}
      >
        <div className="flex items-center space-x-3">
          <FontAwesomeIcon
            icon={icon}
            style={{ width: "50px", height: "50px" }}
            className="text-white"
          />
          <div>
            <h2 className="text-xl font-medium mb-1">{header}</h2>
            <h1 className="text-l font-medium">{context}</h1>
          </div>
        </div>
      </div>

      <dialog open={isOpen} id="share_modal" className="modal">
        <div className="modal-box">
          <form method="dialog" onSubmit={handleSubmit}>
            <button
              onClick={closeDialog}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
            <div className="flex flex-col mt-4">
              <label
                htmlFor="scheduledNotificationHour"
                className="text-white text-base"
              >
                Scheduled Notification Hour:
              </label>
              <input
                type="number"
                id="scheduledNotificationHour"
                className="w-1/2 px-4 py-2 mt-2 rounded-lg border border-gray-300 focus:outline-none focus:border-primary"
                placeholder="Enter the scheduled notification hour"
                onChange={(e) => setScheduledNotificationHour(e.target.value)}
              />
            </div>
            <div className="flex flex-col mt-4">
              <label
                htmlFor="scheduledNotificationMinute"
                className="text-white text-base"
              >
                Scheduled Notification Minute:
              </label>
              <input
                type="number"
                id="scheduledNotificationMinute"
                className="w-1/2 px-4 py-2 mt-2 rounded-lg border border-gray-300 focus:outline-none focus:border-primary"
                placeholder="Enter the scheduled notification minute"
                onChange={(e) => setScheduledNotificationMinute(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary mt-4">
              Schedule
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
}
