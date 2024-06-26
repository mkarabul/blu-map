"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ShareButton from "../../profile/components/ShareButton";
import Link from "next/link";
import { useState, useEffect } from "react";

import {
  faThumbsUp,
  faThumbsDown,
  faMapMarkedAlt,
  faPaperPlane,
  faUsers,
  faUsersSlash,
  faPlus,
  faCommentDots,
  faArrowRight,
  faArrowLeft,
  faMapMarkerAlt,
  faCalendarAlt,
  faTrash,
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
  userPhoto,
  city,
  country,
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPostDeleted, setPostDeleted] = useState(false);

  useEffect(() => {
    if (isPostDeleted) {
      window.location.reload();
    }
  }, [isPostDeleted]);

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

  //handleDeletePost function
  const handleDeletePost = async () => {
    try {
      const response = await fetch(`/api/profile-trip/${uuid}`, {
        method: "DELETE",
      });
      if (response.ok) {
        console.log("Post deleted successfully");
        setPostDeleted(true);
      } else {
        console.log("Failed to delete post");
      }
    } catch (error) {
      console.error("Failed to delete post", error);
    }
  };

  return (
    <div className="card w-full sm:w-11/12 md:w-1/2 bg-white border mx-auto mt-5 mb-5">
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
          <ShareButton
            description={description}
            header={header}
            userName={userName}
            uuid={uuid}
          />
        </div>
        {/* Images */}

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
        <Link href={`/post/${uuid}`}>
          <div className="text-3xl font-bold text-gray-700 my-2">{header}</div>
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
        {/* Buttons on the bottom of a post */}
        <div className="flex flex-col md:flex-row justify-start items-center mt-4">
          <div className="flex flex-grow space-x-2 mb-2 md:mb-0">
            <div className="tooltip" data-tip="Like">
              <button className="btn btn-outline rounded-full">
                <FontAwesomeIcon icon={faThumbsUp} />
              </button>
            </div>
            <div className="tooltip" data-tip="Dislike">
              <button className="btn btn-outline rounded-full">
                <FontAwesomeIcon icon={faThumbsDown} />
              </button>
            </div>

            <SocialTabShare isSocial={isSocial} uuid={uuid} />
            <Link href={`/trips/${tripId}`}>
              <div className="tooltip" data-tip="View Itinerary">
                <button className="btn btn-outline rounded-full">
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
            </Link>
          </div>
          {/* Separate div for the last button (right-most) */}
          <div className="tooltip" data-tip="Delete Post">
            <button
              className="btn btn-outline rounded-full mr-2"
              onClick={handleDeletePost}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
          <Link href={`/post/${uuid}`}>
            <div className="flex justify-end flex-grow">
              <div className="tooltip" data-tip="Comments">
                <button className="btn btn-outline rounded-full">
                  <FontAwesomeIcon icon={faCommentDots} />
                </button>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
