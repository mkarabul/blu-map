"use client";

import { useState, useEffect } from "react";

import CalendarTime from "./CalendarTime";
import CalendarDate from "./CalendarDate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

import { formatTime } from "../../components/utils";

const CalendarRow = ({ activity, activityUtils }) => {
  const { id, start, end, name } = activity;

  const [activityState, setActivityState] = useState({
    ...activity,
    startString: formatTime(start),
    endString: formatTime(end),
  });

  const { updateActivity, deleteActivity } = activityUtils;

  useEffect(() => {
    setActivityState({
      ...activity,
      startString: formatTime(start),
      endString: formatTime(end),
    });
  }, [activity]);

  const setTimeString = (border) => {
    return (timeString) =>
      setActivityState({ ...activityState, [`${border}String`]: timeString });
  };

  const updateTimeString = (border) => {
    const parseTimeString = (timeString) => {
      const timeRegex = /^(\d{1,2}):(\d{2})(?:\s([AP]M))?$/;

      const timeMatch = timeString.match(timeRegex);

      if (!timeMatch) {
        console.error("Invalid time or date format");
        return null;
      }

      const [, hours, minutes, meridiem] = timeMatch;

      let parsedHours = parseInt(hours, 10);
      let parsedMinutes = parseInt(minutes, 10);
      if (meridiem && meridiem === "PM" && parsedHours < 12) {
        parsedHours += 12;
      }

      if(meridiem && meridiem === "AM" && parsedHours === 12) {
        parsedHours = 0;
      }

      const parsedDate = new Date(start);
      parsedDate.setHours(parsedHours);
      parsedDate.setMinutes(parsedMinutes);
      return parsedDate;
    };

    return (timeString) => {
      let newTime = parseTimeString(timeString);
      console.log(newTime);
      if (!newTime) {
        const newActivity = {
          ...activity,
          startString: formatTime(start),
          endString: formatTime(end),
        };
        setActivityState(newActivity);
        return;
      }

      if (border === "start") {
        if (newTime > end) {
          newTime = end;
        }
      } else {
        if (newTime < start) {
          newTime = start;
        }
      }

      const newActivity = {
        ...activityState,
        start: activity.start,
        end: activity.end,
      };
      newActivity[border] = newTime;

      updateActivity(newActivity);
    };
  };

  const updateDate = (dateString) => {
    const [year, month, day] = dateString
      .split("-")
      .map((n) => parseInt(n, 10));
    const newStart = new Date(start);
    newStart.setFullYear(year, month - 1, day);

    const newEnd = new Date(end);
    newEnd.setFullYear(year, month - 1, day);

    const newActivity = { ...activityState, start: newStart, end: newEnd };
    updateActivity(newActivity);
  };

  return (
    <tr>
      <td>
        <CalendarDate date={start} updateDate={updateDate} />
      </td>
      <td>
        <CalendarTime
          timeString={activityState.startString}
          setTimeString={setTimeString("start")}
          updateTimeString={updateTimeString("start")}
        />{" "}
        -{" "}
        <CalendarTime
          timeString={activityState.endString}
          setTimeString={setTimeString("end")}
          updateTimeString={updateTimeString("end")}
        />
      </td>
      <td>
        <input
          type="text"
          name="name"
          className="input input-ghost max-w-min text-sm"
          value={activityState.name}
          onChange={(event) => {
            setActivityState({ ...activityState, name: event.target.value });
          }}
          onBlur={() => {
            updateActivity({
              ...activityState,
            });
          }}
        />
      </td>
      <td>
        <button
          className="btn btn-error"
          type="button"
          onClick={() => deleteActivity({ id })}
        >
          <FontAwesomeIcon icon={faTrashCan} size="lg" />
        </button>
      </td>
    </tr>
  );
};

export default CalendarRow;
