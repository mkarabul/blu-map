import React from "react";
import ProfilePost from "./ProfilePost";

const ListPosts = ({ posts, isLoading }) => {
  return (
    <div className="mt-8">
      {isLoading && (
        <div className="flex justify-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}
      {!isLoading && (
        <>
          {posts.map((post) => (
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
            />
          ))}
        </>
      )}
      {!isLoading && posts.length === 0 && (
        <h3 className="text-center">
          No posts found. Create one in your trips page!
        </h3>
      )}
    </div>
  );
};

export default ListPosts;
