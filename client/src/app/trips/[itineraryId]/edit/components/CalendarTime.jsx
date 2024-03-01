"use client";

import React from "react";

const CalendarTime = ({ time, setTime, updateTime }) => {
  return (
    <input
      type="text"
      name="name"
      className="input input-ghost max-w-24 text-sm"
      value={time}
      onChange={(event) => {
        setTime(event.target.value);
      }}
      onBlur={() => updateTime(time)}
    />
  );
};

export default CalendarTime;
