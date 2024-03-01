import React from "react";

import { formatTime, sortActivities } from "./utils";

const CalendarView = ({ activities }) => {
  // Sort activities by start time
  activities.sort((a, b) => new Date(a.start) - new Date(b.start));

  const activitiesByDay = sortActivities(activities);

  //   console.log(activitiesByDay);

  return (
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
                  <tr key={index}>
                    <td>
                      {formatTime(activity.start)} - {formatTime(activity.end)}
                    </td>
                    <td>{activity.name}</td>
                  </tr>
                );
              })}
            </tbody>
          </>
        );
      })}
    </table>
  );

  //   let currentDay = null;
  //   return (
  //     <div>
  //       {activities.map((activity, index) => {
  //         const activityDate = new Date(activity.start).toDateString();
  //         console.log(activityDate, new Date(activityDate).toLocaleString());
  //         let dayHeader = null;

  //         // If this activity is on a new day, add a day header
  //         if (activityDate !== currentDay) {
  //           currentDay = activityDate;
  //           dayHeader = <h2>{`Day ${index + 1}`}</h2>;
  //         }

  //         return (
  //           <div key={index}>
  //             {dayHeader}
  //             <CalendarActivity activity={activity} />
  //           </div>
  //         );
  //       })}
  //     </div>
  //   );
};

// const CalendarView = ({ activities }) => {
//   activities.sort((a, b) => new Date(a.start) - new Date(b.start));

//   return (
//     <div className="overflow-x-auto h-96">
//       <table className="table table-pin-rows">
//         <thead>
//           <tr>
//             <th>A</th>
//           </tr>
//         </thead>
//           <tr>
//             <td>Teenage Mutant Ninja Turtles</td>
//           </tr>
//           <tr>
//             <td>Thor</td>
//           </tr>
//         </tbody>
//         <thead>
//           <tr>
//             <th>W</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td>The Wasp</td>
//           </tr>
//           <tr>
//             <td>Watchmen</td>
//           </tr>
//           <tr>
//             <td>Wolverine</td>
//           </tr>
//           <tr>
//             <td>Wonder Woman</td>
//           </tr>
//         </tbody>
//         <thead>
//           <tr>
//             <th>X</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td>X-Men</td>
//           </tr>
//         </tbody>
//         <thead>
//           <tr>
//             <th>Z</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td>Zatanna</td>
//           </tr>
//           <tr>
//             <td>Zatara</td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// };

export default CalendarView;
