"use client";

import React, { useState } from "react";

import CalendarEditView from "./CalendarEditView";
import useFormState from "./useFormState";
import { useRouter } from "next/navigation";
import AddActivityButton from "./AddActivityButton";
import ActivityRecommendation from "./ActivityRecommendation";
import LocationSearch from "./LocationSearch";
import LocationRecommendation from "./LocationRecommendation";

const Form = ({ itinerary }) => {
  const {
    activities,
    title,
    setTitle,
    updateActivity,
    addActivity,
    deleteActivity,

    city,
    loc,
    setCityString,
  } = useFormState({ itinerary });

  const [isApi, setIsApi] = useState(false);

  const router = useRouter();

  async function onSubmit(event) {
    event.preventDefault();

    const response = await fetch(`/api/itineraries/${itinerary.uuid}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        activities: activities.map((activity) => ({
          ...activity,
          start: activity.start.toISOString(),
          end: activity.end.toISOString(),
        })),
        city: city,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      router.push(`/trips/${itinerary.uuid}`);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="mb-4 flex flex-row gap-4">
        <h1 className="text-4xl">
          <input
            type="text"
            name="name"
            className="input input-ghost max-w-min text-4xl"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </h1>
        <LocationSearch def={city} setCity={setCityString} />
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="overflow-y-scroll max-h-full mb-4 col-span-2">
          <CalendarEditView
            activities={activities}
            activityUtils={{ updateActivity, addActivity, deleteActivity }}
          />
        </div>
        <div className="">
          <h3 className="text-2xl mb-4 text-center">Recommendations</h3>
          <div className="join w-full justify-center mb-4">
            <input
              className="join-item btn"
              type="radio"
              name="options"
              aria-label="Default"
              defaultChecked={true}
              onClick={() => setIsApi(false)}
            />
            <input
              className="join-item btn"
              type="radio"
              name="options"
              aria-label="Google"
              defaultChecked={false}
              disabled={!loc}
              onClick={() => setIsApi(true)}
            />
          </div>
          <div className={`${isApi && "hidden"}`}>
            <ActivityRecommendation
              addActivity={addActivity}
              defaultStart={
                activities.length > 0
                  ? activities[activities.length - 1].end
                  : new Date()
              }
              defaultEnd={
                activities.length > 0
                  ? new Date(
                      activities[activities.length - 1].end.getTime() + 3600000
                    )
                  : new Date(Date.now() + 3600000)
              }
            />
          </div>
          <div className={`${!isApi && "hidden"}`}>
            <LocationRecommendation
              loc={loc}
              addActivity={addActivity}
              defaultStart={
                activities.length > 0
                  ? activities[activities.length - 1].end
                  : new Date()
              }
              defaultEnd={
                activities.length > 0
                  ? new Date(
                      activities[activities.length - 1].end.getTime() + 3600000
                    )
                  : new Date(Date.now() + 3600000)
              }
            />
          </div>
          <AddActivityButton
            addActivity={addActivity}
            defaultStart={
              activities.length > 0
                ? activities[activities.length - 1].end
                : new Date()
            }
            defaultEnd={
              activities.length > 0
                ? new Date(
                    activities[activities.length - 1].end.getTime() + 3600000
                  )
                : new Date(Date.now() + 3600000)
            }
          />
        </div>
      </div>
      <div>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </div>
    </form>
  );
};

export default Form;
