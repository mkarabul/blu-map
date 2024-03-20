import { useState, useEffect } from "react";

const useFormState = ({ itinerary }) => {
  const [activities, setActivities] = useState(itinerary.activities);
  const [title, setTitle] = useState(itinerary.title);

  useEffect(() => {
    setActivities(itinerary.activities);
    setTitle(itinerary.title);
  }, [itinerary]);

  const updateActivity = (activity) => {
    const update = {
      id: activity.id,
      name: activity.name,
      start: activity.start,
      end: activity.end,
    };
    console.log("updating activity", activity);
    const updatedActivities = activities.map((a) =>
      a.id === update.id ? update : a
    );
    setActivities(updatedActivities);
  };

  const addActivity = (activity) => {
    const update = {
      id: activity.id,
      name: activity.name,
      start: activity.start,
      end: activity.end,
    };
    setActivities([...activities, update]);
  };

  const deleteActivity = (activity) => {
    const updatedActivities = activities.filter((a) => a.id !== activity.id);
    setActivities(updatedActivities);
  };

  return {
    activities,
    title,
    setTitle,
    updateActivity,
    addActivity,
    deleteActivity,
  };
};

export default useFormState;
