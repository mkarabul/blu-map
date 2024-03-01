"use client";

import React from "react";

import CalendarEditView from "./CalendarEditView";
import useFormState from "./useFormState";

const Form = ({ itinerary }) => {
  const {
    activities,
    title,
    setTitle,
    updateActivity,
    addActivity,
    deleteActivity,
  } = useFormState({ itinerary });

  async function onSubmit(event) {
    event.preventDefault();

    console.log("submitting", title, activities);

    // const formData = new FormData(event.currentTarget);
    // const response = await fetch("/api/submit", {
    //   method: "POST",
    //   body: {
    //     title: title,
    //     activities: activities,
    //   },
    // });

    // const data = await response.json();
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
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => addActivity({name: "New Activity", start: activities[0].start, end: activities[0].end, id: crypto.randomUUID()})}
            >
              Add Activity
            </button>
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
