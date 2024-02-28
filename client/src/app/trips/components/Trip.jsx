import React from "react";
import Link from "next/link";

const Trip = ({ trip }) => {
  const { id, title } = trip;
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <div className="card-actions justify-end">
          <Link className="btn btn-primary" href={`/itinerary/${id}`}>View</Link>
        </div>
      </div>
    </div>
  );
};

export default Trip;
