import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const Likes = ({ userData, ad, styles }) => {
  const [likedAds, setLikedAds] = useState({});

  useEffect(() => {
    // Load liked ads from local storage
    const storedLikedAds = JSON.parse(localStorage.getItem("likedAds"));
    if (storedLikedAds) {
      setLikedAds(storedLikedAds);
    }
  }, []);

  const handleLike = async (adId) => {
    try {
      const newLikedAds = { ...likedAds };
      const userData = JSON.parse(localStorage.getItem("userData"));
      const userId = userData._id;

      if (newLikedAds[adId] && newLikedAds[adId][userId]) {
        delete newLikedAds[adId][userId]; // Remove like for current user
      } else {
        newLikedAds[adId] = { ...newLikedAds[adId], [userId]: true }; // Add like for current user
      }

      setLikedAds(newLikedAds);
      localStorage.setItem("likedAds", JSON.stringify(newLikedAds)); // Store liked ads in local storage

      const token = userData?.token;

      if (!token) {
        throw new Error("No token");
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.post(
        `http://localhost:5000/api/ads/${adId}/like`,
        {},
        config
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const userId = userData._id;

  return (
    <div>
      {userData.token ? (
        <i onClick={() => handleLike(ad._id)}>
          {likedAds[ad._id] && likedAds[ad._id][userId] ? (
            <FaHeart />
          ) : (
            <FaRegHeart />
          )}
          {/* {key === ad._id ? <FaHeart /> : <FaRegHeart />} */}
        </i>
      ) : null}
    </div>
  );
};

export default Likes;
