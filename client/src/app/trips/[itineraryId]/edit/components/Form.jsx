"use client";

import React from "react";

import CalendarEditView from "./CalendarEditView";
import useFormState from "./useFormState";
import { useRouter } from "next/navigation";
import AddActivityButton from "./AddActivityButton";

const Form = ({ itinerary }) => {
  const {
    activities,
    title,
    setTitle,
    updateActivity,
    addActivity,
    deleteActivity,
  } = useFormState({ itinerary });

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
      }),
    });

    const data = await response.json();

    if (response.ok) {
      router.push(`/trips/${itinerary.uuid}`);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="mb-4">
        <h1 className="text-4xl">
          <input
            type="text"
            name="name"
            className="input input-ghost max-w-min text-4xl"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </h1>
      </div>
      <div className="grid md:grid-cols-3">
        <div className="overflow-y-scroll max-h-full mb-4 col-span-2">
          <CalendarEditView
            activities={activities}
            activityUtils={{ updateActivity, addActivity, deleteActivity }}
          />
        </div>
        <div className="">
          <div className="mb-4">
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
                      activities[
                        activities.length - 1
                      ].end.getTime() + 3600000
                    )
                  : new Date(Date.now() + 3600000)
              }
            />
          </div>
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
