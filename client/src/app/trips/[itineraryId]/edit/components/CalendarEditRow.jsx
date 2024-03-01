"use client";

import { useState, useEffect } from "react";

import CalendarTime from "./CalendarTime";
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
      start: formatTime(start),
      end: formatTime(end),
    });
  }, [activity]);

  const updateTimeOld = (
    originalTime,
    timeString,
    boundaries = { start: null, end: null },
    isEnd = null
  ) => {
    if (!timeRegex.test(timeString)) {
      setActivityState({
        ...activity,
        start: formatTime(start),
        end: formatTime(end),
      });
      return console.error("Invalid time format");
    }

    const [time, meridiem] = timeString.split(" ");
    let [hours, minutes] = time.split(":").map((n) => parseInt(n, 10));
    if (meridiem && meridiem === "PM") hours += 12;

    const newTime = new Date(originalTime);
    if (hours) newTime.setHours(hours);
    if (minutes) newTime.setMinutes(minutes);

    if (boundaries.start && newTime < boundaries.start) {
      console.log(
        "before start",
        newTime.toLocaleString(),
        boundaries.start.toLocaleString()
      );
      newTime.setHours(boundaries.start.getHours());
      newTime.setMinutes(boundaries.start.getMinutes());
    }

    if (boundaries.end && newTime > boundaries.end) {
      console.log(
        "after end",
        newTime.toLocaleString(),
        boundaries.end.toLocaleString()
      );
      newTime.setHours(boundaries.end.getHours());
      newTime.setMinutes(boundaries.end.getMinutes());
    }

    const newActivity = { ...activityState, start: start, end: end };
    newActivity[isEnd ? "end" : "start"] = newTime.toISOString();

    updateActivity(newActivity);
  };

  const setTime = (border) => {
    return (timeString) =>
      setActivityState({ ...activityState, [border]: timeString });
  };

  const updateTime = (border) => {
    const parseTimeString = (timeString) => {
      const timeRegex = /^(\d{1,2}):(\d{2})(?:\s([AP]M))?$/;

      const timeMatch = timeString.match(timeRegex);

      if (!timeMatch) {
        console.error("Invalid time or date format");
        return null;
      }

      const [, hours, minutes, meridiem] = timeMatch;

      let parsedHours = parseInt(hours, 10);
      if (meridiem && meridiem === "PM") {
        parsedHours += 12;
      }

      const parsedDate = new Date(start);
      parsedDate.setHours(parsedHours);
      parsedDate.setMinutes(minutes);
      return parsedDate;
    };

    return (timeString) => {
      const start = new Date(activityState.start);
      const end = new Date(activityState.end);

      let newTime = parseTimeString(timeString);
      console.log(newTime);
      if (!newTime) {
        const newActivity = {
          ...activity,
          start: formatTime(activity.start),
          end: formatTime(activity.end),
        };
        setActivityState({
          ...activity,
          start: formatTime(activity.start),
          end: formatTime(activity.end),
        });
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
      newActivity[border] = newTime.toISOString();

      updateActivity(newActivity);
    };
  };

  return (
    <tr>
      <td>
        <CalendarTime
          time={activityState.start}
          setTime={setTime("start")}
          updateTime={updateTime("start")}
        />{" "}
        -{" "}
        <CalendarTime
          time={activityState.end}
          setTime={setTime("end")}
          updateTime={updateTime("end")}
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
              start: new Date(activity.start).toISOString(),
              end: new Date(activity.end).toISOString(),
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
