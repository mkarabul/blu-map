import React from "react";

import CalendarEditRow from "./CalendarEditRow";

const CalendarEditSection = ({ date, activities, activityUtils }) => {
  return (
    <>
      <thead>
        <tr>
          <th>{date}</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {activities.map((activity) => {
          return (
            <CalendarEditRow
              key={activity.id}
              activity={activity}
              activityUtils={activityUtils}
            />
          );
        })}
      </tbody>
    </>
  );
};

export default CalendarEditSection;
