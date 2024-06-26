import React from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CommentDeleteButton = ({ deleteComment, uuid }) => {
  return (
    <button
      className="btn btn-error join-item"
      onClick={() => deleteComment(uuid)}
    >
      <FontAwesomeIcon icon={faTrash} />
    </button>
  );
};

export default CommentDeleteButton;
