import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faThumbsDown,
  faMapMarkedAlt,
  faPaperPlane,
  faPlus,
  faCommentDots,
} from "@fortawesome/free-solid-svg-icons";

export default function ProfilePost({
  header,
  description,
  tripDate,
  userName,
}) {
  return (
    <div className="card w-full sm:w-11/12 md:w-1/2 bg-white border mx-auto mt-5 mb-5">
      <div className="card-body p-5">
        {/* user profile icon */}
        <div className="flex justify-start mb-4">
          <img
            src="/default-pfp.png"
            alt="User Profile"
            className="rounded-full border-4 border-white shadow-lg h-20 w-20 md:h-15 md:w-15"
          />
        </div>
        {/* Images Row */}
        <div className="flex justify-between space-x-4 mb-4">
          <img
            src="https://via.placeholder.com/150"
            alt="Image 1"
            className="w-1/2 rounded-lg"
          />
          <img
            src="https://via.placeholder.com/150"
            alt="Image 2"
            className="w-1/2 rounded-lg"
          />
        </div>
        {/* Trip description */}
        <div className="text-lg text-gray-700">{description}</div>
        <div className="text-2xl text-bold text-gray-700 mt-3">{header}</div>
        <div className="text-xl text-sm font-medium text-gray-600 mt-1">
          Date: {tripDate} | Posted by: {userName}
        </div>
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
            <button className="btn btn-outline rounded-full">
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
            <button className="btn btn-outline rounded-full">
              <FontAwesomeIcon icon={faPlus} />
            </button>
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
