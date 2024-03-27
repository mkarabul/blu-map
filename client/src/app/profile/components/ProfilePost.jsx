"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ShareButton from "../../profile/components/ShareButton";
import Link from "next/link";
import { useState } from "react";

import {
  faThumbsUp,
  faThumbsDown,
  faMapMarkedAlt,
  faPaperPlane,
  faUsers,
  faUsersSlash,
  faPlus,
  faCommentDots,
} from "@fortawesome/free-solid-svg-icons";
import SocialTabShare from "./SocialTabShare";

export default function ProfilePost({
  uuid,
  header,
  description,
  tripDate,
  userName,
  isPublic,
  isSocial,
  tripId,
  images,
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = () => {
    if (currentImageIndex < images.length - 1) {
      setCurrentImageIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex((prevIndex) => prevIndex - 1);
    }
  };
  return (
    <div className="card w-full sm:w-11/12 md:w-1/2 bg-white border mx-auto mt-5 mb-5">
      <div className="card-body p-5">
        {/* user profile icon */}
        <div className="flex justify-between mb-4">
          <Link href={`/profile/${userName}`}>
            <img
              src="/default-pfp.png"
              alt="User Profile"
              className="rounded-full border-4 border-white shadow-lg h-20 w-20 md:h-15 md:w-15"
            />
          </Link>
          <ShareButton
            description={description}
            header={header}
            userName={userName}
            uuid={uuid}
          />
        </div>
        {/* Images Row */}
        <div className="flex flex-col items-center space-y-4 mb-4">
          <img
            src={images[currentImageIndex]}
            alt={`Image ${currentImageIndex + 1}`}
            className="rounded-lg"
          />
          <div className="flex justify-center space-x-4 w-full">
            <button
              onClick={handlePrevImage}
              disabled={currentImageIndex === 0}
            >
              Prev
            </button>
            <button
              onClick={handleNextImage}
              disabled={currentImageIndex === images.length - 1}
            >
              Next
            </button>
          </div>
        </div>
        {/* Trip description */}
        <Link href={`/post/${uuid}`}>
          <div className="text-lg text-gray-700">{description}</div>
          <div className="text-2xl text-bold text-gray-700 mt-3">{header}</div>
          <div className="text-xl text-sm font-medium text-gray-600 mt-1">
            Date: {tripDate} | Posted by: {userName}
          </div>
        </Link>
        {/* Buttons on the bottom of a post */}
        <div className="flex flex-col md:flex-row justify-start items-center mt-4">
          <div className="flex flex-grow space-x-2 mb-2 md:mb-0">
            <button className="btn btn-outline rounded-full">
              <FontAwesomeIcon icon={faThumbsUp} />
            </button>
            <button className="btn btn-outline rounded-full">
              <FontAwesomeIcon icon={faThumbsDown} />
            </button>
            <button className="btn btn-outline rounded-full">
              <FontAwesomeIcon icon={faMapMarkedAlt} />
            </button>
            <SocialTabShare isSocial={isSocial} uuid={uuid} />
            <Link href={`/trips/${tripId}`}>
              <button className="btn btn-outline rounded-full">
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </Link>
          </div>
          {/* Separate div for the last button (right-most) */}
          <div className="flex justify-end flex-grow">
            <button className="btn btn-outline rounded-full">
              <FontAwesomeIcon icon={faCommentDots} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
