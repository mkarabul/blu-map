"use client";

import React from "react";
import useReccState from "./useReccState";
import { useUser } from "@auth0/nextjs-auth0/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

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

  const deleteRecc = async (recc) => {
    deleteServerRecc(recc);

    const user = useUser();

    await fetch(`/api/reccs/${recc}/${user?.user.sub}`, {
      method: "DELETE",
    });
  };

  return (
    <ul className="p-4 bg-base-200 w-full rounded-lg mb-2">
      {defaultReccs
        ? defaultReccs.map((recc) => (
            <li
              key={recc}
              className="btn btn-primary btn-sm w-full text-left my-2 flex justify-start"
              onClick={(e) => addRecc(recc)}
            >
              {recc}
            </li>
          ))
        : null}
      {serverReccs
        ? serverReccs.map((recc) => (
            <li key={recc} className="join join-horizontal w-full my-2">
              <button
                type="button"
                className="btn btn-primary btn-sm join-item text-left flex-1 w-max flex justify-start"
                onClick={(e) => addRecc(recc)}
              >
                {recc}
              </button>
              <button
                type="button"
                className="btn btn-primary btn-sm join-item"
                onClick={(e) => deleteRecc(recc)}
              >
                <FontAwesomeIcon icon={faXmark} size="lg" />
              </button>
            </li>
          ))
        : null}
    </ul>
  );
};

export default ActivityRecommendation;
