"use client";

import React, { useState, useEffect } from "react";
import SocialPost from "./SocialPost";

import { useUser } from "@auth0/nextjs-auth0/client";

export default function ListPosts({ posts }) {
  return posts && posts.length ? (
    <>
      {posts.map((post) => (
        <SocialPost
          key={post.id}
          uuid={post.uuid}
          header={post.header}
          description={post.description}
          city={post.city}
          country={post.country}
          tripDate={new Date(post.tripDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
          userName={post.userName}
          tripId={post.tripId}
          clickable={true}
          images={post.images}
          userPhoto={post.userPhoto}
          isSocialPage={true}
        />
      ))}
    </>
  ) : (
    <div></div>
  );
}
