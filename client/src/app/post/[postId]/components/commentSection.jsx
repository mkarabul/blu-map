"use client";
import React, { useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import CommentView from "./CommentView";

const CommentSection = ({ postId }) => {
  //console.log("userName in CommentSection:", userName);
  const { user } = useUser();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [userData, setUserData] = useState({});
  const [userName, setUserName] = useState("");
  const userId = user?.sub;

  useEffect(() => {
    const fetchUserName = async () => {
      if (userId) {
        try {
          const response = await fetch(`/api/users/${userId}`);
          const data = await response.json();
          setUserName(data.userName);
        } catch (error) {
          console.error("Error fetching userName:", error);
        }
      }
    };

    fetchUserName();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //const userId = userData.userId;
    //const tripId = tripId;
    if (!comment.trim()) return;
    const newComment = {
      userId,
      comment,
      postId,
      userName,
    };
    await fetch(`/api/comments/post/${postId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newComment),
    });
    setComments([...comments, newComment]);
    setComment("");
    console.log("Comment submitted");
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`/api/comments/post/${postId}`);
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [postId]);

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
          <CommentView key={index} {...comment} />
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
