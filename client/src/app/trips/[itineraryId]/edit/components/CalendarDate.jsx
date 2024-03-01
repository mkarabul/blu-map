import React from "react";

const formatDate = (date) => {
  const [year, month, day] = date.toISOString().split("T")[0].split("-");
  return `${year}-${month}-${day}`;
};

const CalendarDate = ({ date, updateDate }) => {
  return (
    <input
      type="date"
      className="btn btn-sm"
      value={formatDate(date)}
      onChange={(event) => updateDate(event.target.value)}
      onClick={(event) => event.target.showPicker()}
    />
  );
};

export default CalendarDate;
