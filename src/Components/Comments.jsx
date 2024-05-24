import React, { useState } from "react";

const Comments = ({ adId, comments, setComments }) => {
  const [newComment, setNewComment] = useState("");

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const newCommentObj = { text: newComment, adId };
    setComments((prevComments) => [...prevComments, newCommentObj]);
    setNewComment("");
  };

  return (
    <div>
      <h5>Comments</h5>
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>{comment.text}</li>
        ))}
      </ul>
      <form onSubmit={handleCommentSubmit}>
        <input
          type="text"
          value={newComment}
          onChange={handleCommentChange}
          placeholder="Add a comment"
        />
        <button type="submit">Comment</button>
      </form>
    </div>
  );
};

export default Comments;
