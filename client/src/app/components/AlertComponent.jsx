"use client";
import React, { useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function AlertComponent() {
  const { user } = useUser();

  useEffect(() => {
    fetch(`/api/notification/get-all/${user?.sub}`)
      .then((response) => response.json())
      .then((times) => {
        times.forEach(({ hour, minute }) => {
          const currentTime = new Date();
          const targetTime = new Date(currentTime);
          targetTime.setHours(hour, minute, 0, 0);

          let delay = targetTime.getTime() - currentTime.getTime();

          if (delay < 0) {
            delay += 24 * 60 * 60 * 1000;
          }
          setTimeout(() => {
            alert(`The time is now: ${hour}:${minute}`);
          }, delay);
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [user]);

  return null;
}
