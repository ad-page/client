import React, { useState } from "react";
import styles from "./Comments.module.css";

const Comments = ({ adId, comments, setComments, className }) => {
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
    <div className={className}>
      <h5 className={styles.heading}>Comments</h5>
      <ul>
        {comments?.map((comment, index) => (
          <li key={index}>{comment.text}</li>
        ))}
      </ul>
      <form onSubmit={handleCommentSubmit}>
        <input
          type="text"
          value={newComment}
          onChange={handleCommentChange}
          placeholder="Add a comment"
          className={styles.input}
        />
        <button type="submit" className={styles.btn}>
          Comment
        </button>
      </form>
    </div>
  );
};

export default Comments;
