import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPlus } from "@fortawesome/free-solid-svg-icons";

const Trip = ({ trip, deleteTrip, openModal, setTripData }) => {
  const { uuid, title } = trip;
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body flex flex-col justify-between">
        <h2 className="card-title">{title}</h2>
        <div className="flex flex-row justify-between">
          <div className="flex items-center gap-2">
            <button
              className="btn btn-circle btn-sm btn-secondary"
              onClick={() => openModal(uuid)}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
            <button
              className="btn btn-error btn-sm btn-square"
              onClick={() => deleteTrip(uuid)}
            >
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
          </div>
          <Link className="btn btn-primary btn-sm" href={`/trips/${uuid}`}>
            View
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Trip;
