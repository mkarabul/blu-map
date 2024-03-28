"use client"
import React, { useState, useEffect } from "react";
import ProfilePost from "./ProfilePost";

import { useUser } from "@auth0/nextjs-auth0/client";

const ListPosts = ({ posts, isLoading: isLoadingPosts, isOwner, userName }) => {
  const { user } = useUser();
  const [isProfilePrivate, setIsProfilePrivate] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [isLoadingPrivacy, setIsLoadingPrivacy] = useState(true);
  const [isLoadingFollowing, setIsLoadingFollowing] = useState(true);

  useEffect(() => {
    const checkProfilePrivacy = async () => {
      setIsLoadingPrivacy(true);
      const response = await fetch(`/api/users`);
      const usersData = await response.json();
      const userProfile = usersData.find(user => user.userName === userName);
      
      if (userProfile) {
        setIsProfilePrivate(!userProfile.isPublic);
      }
      setIsLoadingPrivacy(false);
    };
    
    const checkFollowingStatus = async () => {
      setIsLoadingFollowing(true);
      const userID = user?.sub;
      if (!userID) {
        setIsLoadingFollowing(false);
        return;
      }
      const userNameResponse = await fetch(`/api/admin/${userID}`);
      const userData = await userNameResponse.json();
      const currUserName = userData.userName;

      const response = await fetch(`/api/follow/followers/${userName}`);
      const data = await response.json();
      const isUserFollowing = data.some(follower => follower.userName === currUserName);
      setIsFollowing(isUserFollowing);
      setIsLoadingFollowing(false);
    };

    if (!isOwner) {
      checkProfilePrivacy();
      checkFollowingStatus();
    } else {
      setIsLoadingPrivacy(false);
      setIsLoadingFollowing(false);
    }
  }, [user, userName, isOwner]);

  useEffect(() => {
    if (!isLoadingPrivacy && !isLoadingFollowing) {
      if (isOwner || (!isProfilePrivate || (isProfilePrivate && isFollowing))) {
        setFilteredPosts(posts);
      } else {
        setFilteredPosts([]);
      }
    }
  }, [posts, isOwner, isProfilePrivate, isFollowing, isLoadingPrivacy, isLoadingFollowing]);

  const isLoading = isLoadingPosts || isLoadingPrivacy || isLoadingFollowing;

  return (
    <div className="mt-8">
      {isLoading ? (
        <div className="flex justify-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : isProfilePrivate && !isFollowing && !isOwner ? (
        <h3 className="text-center">This profile is private.</h3>
      ) : (
        <>
          {filteredPosts.map((post) => (
            <ProfilePost
              key={post.uuid}
              uuid={post.uuid}
              header={post.header}
              description={post.description}
              isPublic={post.isPublic}
              isSocial={post.isSocial}
              tripDate={new Date(post.tripDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
              userName={post.userName}
              tripId={post.tripId}
              images={post.images}
            />
          ))}
          {filteredPosts.length === 0 && (
            <h3 className="text-center">
              No posts found. Create one in your trips page!
            </h3>
          )}
        </>
      )}
    </div>
  );
};

export default ListPosts;
