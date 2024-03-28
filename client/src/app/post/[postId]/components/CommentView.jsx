"use client";


const CommentView = ({ userName, comment }) => {

  return (
    <div className="text-left p-2 bg-blue-500 text-white rounded-lg shadow-lg hover:scale-110 duration-200 flex justify-between">
      <div>
        <strong>{userName}</strong>: {comment}
      </div>
    </div>
  );
};

export default CommentView;
