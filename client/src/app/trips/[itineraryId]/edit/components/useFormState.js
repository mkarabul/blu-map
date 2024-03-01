import { useState, useEffect } from "react";

const useFormState = ({ itinerary }) => {
  const [activities, setActivities] = useState(itinerary.activities);
  const [title, setTitle] = useState(itinerary.title);

  useEffect(() => {
    setActivities(itinerary.activities);
    setTitle(itinerary.title);
  }, [itinerary]);

  const updateActivity = (activity) => {
    console.log("updating activity", activity);
    const updatedActivities = activities.map((a) =>
      a.id === activity.id ? activity : a
    );
    setActivities(updatedActivities);
  };

  const addActivity = (activity) => {
    setActivities([...activities, activity]);
  };

  const deleteActivity = (activity) => {
    const updatedActivities = activities.filter((a) => a.id !== activity.id);
    setActivities(updatedActivities);
    console.log(activities.length);
  };

  return { activities, title, setTitle, updateActivity, addActivity, deleteActivity };
};

export default useFormState;
