"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faThumbsDown,
  faMapMarkedAlt,
  faPaperPlane,
  faPlus,
  faCommentDots,
  faArrowRight,
  faArrowLeft,
  faMapMarkerAlt,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";
import ShareButton from "../../profile/components/ShareButton";
import Link from "next/link";
import { RepSystem } from "./RepSystem";
import CopyPost from "./CopyPost";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function SocialPost({
  uuid,
  header,
  city,
  country,
  description,
  tripDate,
  userName,
  likes: initialLikes,
  dislikes: initialDislikes,
  tripId,
  clickable,
  images,
  userPhoto,
  isSocialPage,
}) {
  const { user } = useUser();
  const { likes, dislikes, addLike, addDislike, userLiked, userDisliked } =
    RepSystem(initialLikes, initialDislikes, uuid);

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
    <div
      className={
        isSocialPage && user
          ? "card w-full sm:w-11/12 md:w-1/2 bg-white border mx-auto mt-5 mb-5"
          : "card w-full sm:w-11/12 md:w-1/2 bg-white border mx-auto mt-5 mb-5"
      }
    >
      <div className="card-body p-5">
        {/* user profile icon */}
        <div className="flex justify-between mb-4">
          <Link href={`/profile/${userName}`}>
            <div className="flex items-center space-x-4">
              <img
                src={userPhoto || "/default-pfp.png"}
                alt="User Profile"
                className="rounded-full border-4 border-white shadow-lg h-20 w-20 md:h-15 md:w-15"
              />
              <span>{userName}</span>
            </div>
          </Link>
        </div>

        {/* Images Row */}
        {images && images.length > 0 && (
          <div className="flex flex-col items-center space-y-4 mb-4">
            <img
              src={images[currentImageIndex]}
              alt={`Image ${currentImageIndex + 1}`}
              className="rounded-lg"
            />
            <div className="flex justify-center space-x-4 w-full items-center">
              <button
                onClick={handlePrevImage}
                disabled={currentImageIndex === 0}
              >
                <FontAwesomeIcon icon={faArrowLeft} />
              </button>
              <div className="flex space-x-2">
                {images.map((image, index) => (
                  <span
                    key={index}
                    className={`inline-block rounded-full bg-gray-400 ${
                      currentImageIndex === index ? "h-3 w-3" : "h-2 w-2"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={handleNextImage}
                disabled={currentImageIndex === images.length - 1}
              >
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>
          </div>
        )}

        {/* Trip description */}
        {clickable ? (
          <Link href={`/post/${uuid}`}>
            <div className="text-3xl font-bold text-gray-700 my-2">
              {header}
            </div>
            <div className="text-xl text-gray-700 my-2">{description}</div>
            {city &&
            city !== "" &&
            city !== "Unknown" &&
            country &&
            country !== "" &&
            country !== "Unknown" ? (
              <div className="flex items-center my-2">
                <FontAwesomeIcon icon={faMapMarkerAlt} />
                <span className="ml-2 text-lg text-gray-600">{`${city}, ${country}`}</span>
              </div>
            ) : null}
            <div className="flex items-center my-2">
              <FontAwesomeIcon icon={faCalendarAlt} />
              <span className="ml-2 text-lg text-gray-600">{tripDate}</span>
            </div>
          </Link>
        ) : (
          <>
            <div className="text-3xl font-bold text-gray-700 my-2">
              {header}
            </div>
            <div className="text-xl text-gray-700 my-2">{description}</div>
            {city &&
            city !== "" &&
            city !== "Unknown" &&
            country &&
            country !== "" &&
            country !== "Unknown" ? (
              <div className="flex items-center my-2">
                <FontAwesomeIcon icon={faMapMarkerAlt} />
                <span className="ml-2 text-lg text-gray-600">{`${city}, ${country}`}</span>
              </div>
            ) : null}
            <div className="flex items-center my-2">
              <FontAwesomeIcon icon={faCalendarAlt} />
              <span className="ml-2 text-lg text-gray-600">{tripDate}</span>
            </div>
          </>
        )}

        {/* Buttons on the bottom of a post */}
        <div className="flex flex-col md:flex-row justify-start items-center mt-4">
          <div className="flex flex-grow space-x-2 mb-2 md:mb-0">
            <div className="tooltip" data-tip="Like">
              <button
                className={`btn btn-outline rounded-full ${
                  userLiked ? "bg-green-500 text-white" : ""
                }`}
                onClick={addLike}
                data-testid="like-button"
              >
                <FontAwesomeIcon icon={faThumbsUp} />
                <p> {likes} </p>
              </button>
            </div>
            <div className="tooltip" data-tip="Dislike">
              <button
                className={`btn btn-outline rounded-full ${
                  userDisliked ? "bg-red-500 text-white" : ""
                }`}
                onClick={addDislike}
                data-testid="dislike-button"
              >
                <FontAwesomeIcon icon={faThumbsDown} />
                <p> {dislikes} </p>
              </button>
            </div>

            <CopyPost tripId={tripId} />
          </div>

          {/* Separate div for the last button (right-most) */}
          {clickable ? (
            <Link href={`/post/${uuid}`}>
              <div className="flex justify-end flex-grow">
                <div className="tooltip" data-tip="Comments">
                  <button className="btn btn-outline rounded-full">
                    <FontAwesomeIcon icon={faCommentDots} />
                  </button>
                </div>
              </div>
            </Link>
          ) : (
            <div className="flex justify-end flex-grow">
              <div className="tooltip" data-tip="Comments">
                <button className="btn btn-outline rounded-full">
                  <FontAwesomeIcon icon={faCommentDots} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
