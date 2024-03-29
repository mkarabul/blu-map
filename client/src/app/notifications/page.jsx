"use client";
import React, { useState, useEffect } from "react";
import FollowRequests from "./components/FollowRequestPopup";
import { useUser } from "@auth0/nextjs-auth0/client";
import FriendNotification from "./components/FriendNotification";

export default function Notifications() {
  const [showModal, setShowModal] = useState(false);
  const [connections, setConnections] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { user } = useUser();

  useEffect(() => {
    const fetchUserNameAndConnections = async () => {
      if (user?.sub) {
        try {
          const userNameResponse = await fetch(`/api/admin/${user?.sub}`);
          if (userNameResponse.ok) {
            const { userName } = await userNameResponse.json();
            await fetchConnections(userName);
            await fetchFriendRequests(userName);
          }
        } catch (error) {
          console.error("Error fetching user name:", error);
        }
      }
    };

    fetchUserNameAndConnections();
  }, [user]);

  const fetchConnections = async (userName) => {
    try {
      const followersResponse = await fetch(
        `/api/follow/followers/${userName}`
      );
      const followingsResponse = await fetch(
        `/api/follow/following/${userName}`
      );
      if (followersResponse.ok && followingsResponse.ok) {
        const followersData = await followersResponse.json();
        const followingsData = await followingsResponse.json();

        const combinedData = [
          ...followersData.map((item) => ({ ...item, type: "follower" })),
          ...followingsData.map((item) => ({ ...item, type: "following" })),
        ];

        combinedData.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setConnections(combinedData);
      }
    } catch (error) {
      console.error("Error fetching connections:", error);
    }
  };

  const fetchFriendRequests = async (userName) => {
    try {
      const response = await fetch(`/api/friend/${user?.sub}/pending-friends`);
      if (response.ok) {
        const data = await response.json();
        setFriendRequests(data);
      }
    } catch (error) {
      console.error("Error fetching friend requests:", error);
    }
  };

  const handleFriendRequestResponse = (userName) => {
    setFriendRequests((prevRequests) =>
      prevRequests.filter((request) => request.userName !== userName)
    );
  };

  return (
    <div className={`container mx-auto px-8 my-8`}>
      <h1 className="text-center text-4xl font-bold mb-4">Notifications</h1>

      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        onClick={() => setShowModal(true)}
      >
        Show Follow Requests
      </button>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded">
            {/* Using the FollowRequests component */}
            <FollowRequests />
            <button
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
      <div className="space-y-4">
        {confirmationMessage !== "" && (
          <div className="text-green-500 text-center">
            {confirmationMessage}
          </div>
        )}
        {errorMessage !== "" && (
          <div className="text-red-500 text-center">{errorMessage}</div>
        )}
        <h2 className="text-2xl font-semibold">Connections</h2>
        <div>
          {friendRequests.length > 0 && (
            <div>
              <p>You have {friendRequests.length} friend requests.</p>
              <div className="block p-4 border-2 border-gray-200 rounded shadow">
                {friendRequests.map((friendRequest, index) => (
                  <FriendNotification
                    key={index}
                    userName={friendRequest.userName}
                    onResponse={handleFriendRequestResponse}
                    setConfirmationMessage={setConfirmationMessage}
                    setErrorMessage={setErrorMessage}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 gap-4">
          {connections.map((connection, index) => (
            <div
              key={index}
              className="block p-4 border-2 border-gray-200 rounded shadow"
            >
              {/* Display who started following whom */}
              {connection.type === "follower" ? (
                <p>{connection.userName} started following you.</p>
              ) : (
                <p>You started following {connection.followingUserName}.</p>
              )}
              <p className="text-sm text-gray-500">
                Connected on{" "}
                {new Date(connection.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
