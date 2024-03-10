"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect } from "react";
import OtherDailyNotifications from "./OtherDailyNotifications";

export default function NotificationButton({ icon, header, context }) {
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [scheduledNotificationHour, setScheduledNotificationHour] =
    useState("");
  const [scheduledNotificationMinute, setScheduledNotificationMinute] =
    useState("");
  const [otherNotifications, setOtherNotifications] = useState([]);

  useEffect(() => {
    if (isOpen) {
      fetch(`/api/notification/${user?.sub}`)
        .then((response) => response.json())
        .then((data) => {
          setOtherNotifications(data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [isOpen]);

  const openPopup = () => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const notificationData = {
      hour: scheduledNotificationHour,
      minute: scheduledNotificationMinute,
    };

    try {
      const response = await fetch(`/api/notification/${user?.sub}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(notificationData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      closeDialog();
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };

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

      {isOpen && (
        <dialog open className="modal">
          <div className="modal-box w-512 h-128">
            <form onSubmit={handleSubmit}>
              <button
                type="button"
                onClick={closeDialog}
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >
                ✕
              </button>
              <div className="text-white text-base text-lg">
                Schedule Daily Notification:
              </div>
              <div className="flex flex-row mt-4">
                <div className="flex flex-col mr-4">
                  <label htmlFor="Hour" className="text-white text-base">
                    Notification Hour:
                  </label>
                  <input
                    type="number"
                    id="Hour"
                    className="w-3/4 px-4 py-2 mt-2 rounded-lg border border-gray-300 focus:outline-none focus:border-primary"
                    placeholder="Hour"
                    value={scheduledNotificationHour}
                    onChange={(e) =>
                      setScheduledNotificationHour(e.target.value)
                    }
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="scheduledNotificationMinute"
                    className="text-white text-base"
                  >
                    Notification Minute:
                  </label>
                  <input
                    type="number"
                    id="scheduledNotificationMinute"
                    className="w-3/4 px-4 py-2 mt-2 rounded-lg border border-gray-300 focus:outline-none focus:border-primary"
                    placeholder="Minute"
                    value={scheduledNotificationMinute}
                    onChange={(e) =>
                      setScheduledNotificationMinute(e.target.value)
                    }
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-primary mt-4">
                Schedule
              </button>
              {otherNotifications.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-white text-lg font-medium">
                    Other Daily Notifications:
                  </h3>
                  <>
                    {otherNotifications.map((notification, index) => (
                      <OtherDailyNotifications
                        key={index}
                        id={notification.id}
                        hour={notification.hour}
                        minute={notification.minute}
                        setIsOpen={setIsOpen}
                      />
                    ))}
                  </>
                </div>
              )}
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
}
