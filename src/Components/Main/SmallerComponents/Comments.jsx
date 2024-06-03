import React, { useState, useEffect } from 'react';
import styles from '../../Header/Modals.module.css';
import axios from 'axios';

const Comments = ({ setIsCommentsOpen, adToComment, setAds }) => {
  const [comment, setComment] = useState('');

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const userToken = localStorage.getItem('userData')
      ? JSON.parse(localStorage.getItem('userData')).token
      : 'none';
    if (!userToken) {
      alert('login to Comment an Ad');
      return;
    }
    const createComment = async () => {
      try {
        await axios.post(
          'http://localhost:5000/api/comments',
          {
            comment: comment,
            adId: adToComment._id,
          },
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
              'Content-Type': 'application/json',
            },
          }
        );
        alert('Comment created successfully');
        const res = await axios.get('http://localhost:5000/api/ads');
        setAds(res.data);
      } catch (error) {
        console.error('Error creating Comment:', error);
        alert('Failed to create Comment');
      }
    };
    createComment();
    setIsCommentsOpen(false);
  };

  return (
    <>
      <div className={styles.modal}>
        <button
          className={styles.btnCloseModal}
          onClick={() => setIsCommentsOpen(false)}
        >
          &times;
        </button>
        <h2 className={styles.modalHeader}>Comments on {adToComment.name}</h2>
        <div>{console.log(adToComment.comments)}</div>
        <form className={styles.modalForm} onSubmit={handleCommentSubmit}>
          <div className={styles.inputContainer}>
            <label className={styles.label}>Enter Your Comment</label>
            <input
              className={styles.input}
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={styles.btn}>
            Submit
          </button>
        </form>
      </div>
      <div className={styles.overlay}></div>
    </>
  );
};

export default Comments;
