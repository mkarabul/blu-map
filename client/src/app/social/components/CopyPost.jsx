import React from "react";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const CopyPost = ({ tripId }) => {
  return (
    <Link href={`/trips/${tripId}`}>
      <button className="btn btn-outline rounded-full">
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </Link>
  );
};

export default CopyPost;
