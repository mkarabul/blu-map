import React from "react";
import CalendarEditRow from "./CalendarEditRow";

import { sortActivities } from "../../components/utils.js";
import CalendarEditSection from "./CalendarEditSection";

const CalendarEditView = ({ activities, activityUtils }) => {
  activities.sort((a, b) => new Date(a.start) - new Date(b.start));

  const activitiesByDay = sortActivities(activities);

  return (
    <>
      {activities.length === 0 ? (
        <h2 className="my-2 text-center">No activities</h2>
      ) : (
        <table className="table table-pin-rows">
          {Object.entries(activitiesByDay).map(([date, activities]) => {
            return (
              <CalendarEditSection key={date} date={date} activities={activities} activityUtils={activityUtils}/>
            );
          })}
        </table>
      )}
    </>
  );
};

export default CalendarEditView;
