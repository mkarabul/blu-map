"use client";
import React, { useState } from "react";

const CommentSection = () => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    setComments([...comments, comment]);
    setComment("");
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
            style={{ resize: "none" }}
          ></textarea>
          <button type="submit" className="btn btn-primary mt-4 md:mt-0">
            Submit
          </button>
        </div>
      </form>
      <div className="w-full max-w-xl">
        {comments.map((comment, index) => (
          <p key={index} className="text-left p-2">
            {comment}
          </p>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
