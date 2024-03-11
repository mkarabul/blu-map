"use client";
import React, { useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function AlertComponent() {
  const { user } = useUser();

  const getNotifications = async () => {
    try {
      const response = await fetch(`/api/notification/get-all/${user?.sub}`);
      const times = await response.json();
      times.forEach(({ hour, minute }) => {
        const currentTime = new Date();
        const targetTime = new Date(currentTime);
        targetTime.setHours(hour, minute, 0, 0);

        let delay = targetTime.getTime() - currentTime.getTime();

        if (delay < 0) {
          delay += 24 * 60 * 60 * 1000;
        }
        console.log(delay);
        setTimeout(() => {
          alert(`The time is now: ${hour}:${minute}`);
        }, delay);
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (user) {
      getNotifications();
    }
  }, [user]);

  return null;
}
