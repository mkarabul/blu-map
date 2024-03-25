"use client";

import React from "react";
import useReccState from "./useReccState";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

const serverRecommendations = ["Hiking"];

const ActivityRecommendation = ({ addActivity, defaultStart, defaultEnd }) => {
  const { defaultReccs, serverReccs, deleteServerRecc } = useReccState(
    serverRecommendations
  );

  const addRecc = (recc) => {
    addActivity({
      name: recc,
      start: defaultStart,
      end: defaultEnd,
      id: crypto.randomUUID(),
    });
  };

  return (
    <ul className="p-4 bg-base-200 w-full rounded-lg">
      {defaultReccs.map((recc) => (
        <li
          className="btn btn-primary btn-sm w-full flex flex-auto justify-between m-2"
          onClick={() => addRecc(recc)}
        >
          <div>{recc}</div>
        </li>
      ))}
      {serverReccs.map((recc) => (
        <li
          className="btn btn-primary btn-sm w-full flex flex-auto justify-between m-2"
          onClick={() => addRecc(recc)}
        >
          <div>{recc}</div>
          <button
            className="btn btn-error btn-xs btn-square btn-outline btn-ghost absolute right-0 top-0 m-2"
            onClick={() => deleteServerRecc(recc)}
          >
            <FontAwesomeIcon icon={faTrashCan} />
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ActivityRecommendation;
