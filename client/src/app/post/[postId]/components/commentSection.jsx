"use client";
import React, { useState, useEffect } from "react";

const CommentSection = ({ userName, postId }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [userData, setUserData] = useState({});

  // useEffect(() => {
  //   fetchComments();
  // }, [postId]);

  // const fetchComments = async () => {
  //   const response = await fetch(`/api/profile-trip/${postId}/comments`);
  //   const data = await response.json();
  //   setComments(data);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = userData.userId;
    //const tripId = tripId;
    if (!comment.trim()) return;
    await fetch(`/api/profile-trip/${postId}/comments`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, comment, tripId: postId }),
    });
    setComments([...comments, comment]);
    setComment("");
    console.log("Comment submitted");
  };

  return (
    <div className="flex-initial flex flex-col items-center justify-center border border-white p-4 shadow-lg rounded-lg">
      <h3 className="text-xl font-semibold mb-4">Comments Section</h3>
      <form className="w-full max-w-xl flex flex-col" onSubmit={handleSubmit}>
        <div className="flex flex-col mb-4 md:flex-row">
          <textarea
            className="textarea textarea-bordered flex-auto mr-4"
            placeholder="Type your comment here..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            style={{ height: "2.5rem", resize: "none" }}
          ></textarea>
          <button
            type="submit"
            className="btn mt-4 md:mt-0"
            style={{
              backgroundColor: "rgb(33,138,255)",
              color: "white",
            }}
          >
            Submit
          </button>
        </div>
      </form>
      <div className="w-full max-w-xl" style={{ paddingBottom: "5rem" }}>
        {comments.map((comment, index) => (
          <div
            key={index}
            className="text-left p-2 mb-2"
            style={{
              backgroundColor: "rgb(33,138,255)",
              color: "white",
              borderRadius: "15px",
              padding: "10px",
            }}
          >
            {userName}: {comment}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
