import { useState, useEffect } from "react";
import useCityJson from "./useCitiesJson";

const useFormState = ({ itinerary }) => {
  const cityUtils = useCityJson();

  const [activities, setActivities] = useState(itinerary.activities);
  const [title, setTitle] = useState(itinerary.title);
  const [city, setCity] = useState(itinerary.city);
  const [loc, setLoc] = useState(cityUtils.getLocationFromCity(city));

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

  const setCityString = (cityString) => {
    setCity(cityString);
    setLoc(cityUtils.getLocationFromCity(cityString));
  };

  return {
    activities,
    title,
    setTitle,
    updateActivity,
    addActivity,
    deleteActivity,

    city,
    loc,
    setCityString,
  };
};

export default useFormState;
