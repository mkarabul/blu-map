import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPlus } from "@fortawesome/free-solid-svg-icons";
import { mapping } from "./CountryMapping";

const Trip = ({ trip, deleteTrip, openModal, setTripData }) => {
  const { uuid, title, city: location } = trip;
  const city = location.split(",")[0];
  const countryCode = location.split(",")[1];
  const country = countryCode ? mapping[countryCode.trim()] : "Unknown";
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body flex flex-col justify-between">
        <h2 className="card-title">{title}</h2>
        <div className="flex flex-row justify-between">
          <div className="flex items-center gap-2">

            <div className="tooltip" data-tip="Create Post">
              <button
                className="btn btn-circle btn-sm btn-secondary"
                onClick={() => openModal(uuid, city, country)}
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>

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
