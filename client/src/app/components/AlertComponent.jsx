"use client";

import React, { useEffect } from "react";

export default function AlertComponent() {
  useEffect(() => {
    const currentTime = new Date();

    const targetHour = 5;
    const targetMinute = 45;

    const targetTime = new Date(currentTime);
    targetTime.setHours(targetHour, targetMinute, 0, 0);

    let delay = targetTime.getTime() - currentTime.getTime();

    if (delay < 0) {
      delay += 24 * 60 * 60 * 1000;
    }

    setTimeout(() => {
      alert(`The time is now: ${targetHour}:${targetMinute}`);
    }, delay);
  }, []);

  return null;
}
