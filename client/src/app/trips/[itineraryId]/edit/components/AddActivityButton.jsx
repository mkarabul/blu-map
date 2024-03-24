import React from "react";

const AddActivityButton = ({ addActivity, defaultStart, defaultEnd }) => {
  return (
    <button
      type="button"
      className="btn btn-primary m-8"
      onClick={() =>
        addActivity({
          name: "New Activity",
          start: defaultStart,
          end: defaultEnd,
          id: crypto.randomUUID(),
        })
      }
    >
      Add Activity
    </button>
  );
};

export default AddActivityButton;
