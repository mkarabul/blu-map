"use client";

import React from "react";

const CalendarTime = ({ timeString, setTimeString, updateTimeString }) => {
  return (
    <input
      type="text"
      name="name"
      className="input input-ghost max-w-24 text-sm"
      value={timeString}
      onChange={(event) => {
        setTimeString(event.target.value);
      }}
      onBlur={() => updateTimeString(timeString)}
    />
  );
};

export default CalendarTime;
