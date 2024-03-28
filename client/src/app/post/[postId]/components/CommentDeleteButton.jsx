import React from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CommentDeleteButton = ({ uuid }) => {
  const handleDelete = async () => {
    await fetch(`/api/comments/${uuid}`, {
      method: "DELETE",
    });
  };

  return (
    <button className="btn btn-error join-item" onClick={handleDelete}>
      <FontAwesomeIcon icon={faTrash} />
    </button>
  );
};

export default CommentDeleteButton;
