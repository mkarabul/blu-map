import React from "react";
import CalendarEditRow from "./CalendarEditRow";

import { sortActivities } from "../../components/utils.js";

const CalendarEditView = ({ activities, activityUtils }) => {
  activities.sort((a, b) => new Date(a.start) - new Date(b.start));

  const activitiesByDay = sortActivities(activities);

  //   console.log(activitiesByDay);

  return (
    <>
      {activities.length === 0 ? (
        <h2 className="my-2 text-center">No activities</h2>
      ) : (
        <table className="table table-pin-rows">
          {Object.entries(activitiesByDay).map(([date, activities]) => {
            return (
              <>
                <thead>
                  <tr>
                    <th>{date}</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {activities.map((activity, index) => {
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
          })}
        </table>
      )}
    </>
  );
};

export default CalendarEditView;
