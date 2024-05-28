import axios from "axios";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import Comments from "./Comments";
import styles from "./Ads.module.css";
import Button from "./Button";

const Ads = ({
  filterSelectValue,
  filterInputValue,
  adsShowOrder,
  ads,
  handleAdDelete,
}) => {
  const [comments, setComments] = useState({});
  const [likedAds, setLikedAds] = useState({});

  useEffect(() => {
    // Load liked ads from local storage
    const storedLikedAds = JSON.parse(localStorage.getItem("likedAds"));
    if (storedLikedAds) {
      setLikedAds(storedLikedAds);
    }
  }, []);

  const handleLike = async (adId) => {
    const newLikedAds = { ...likedAds };

    if (newLikedAds[adId]) {
      delete newLikedAds[adId];
    } else {
      newLikedAds[adId] = true;
    }

    setLikedAds(newLikedAds);
    localStorage.setItem("likedAds", JSON.stringify(newLikedAds));

    try {
      const userData = JSON.parse(localStorage.getItem("userData"));
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

  // console.log(key);

  // async function handleLikes() {
  //   try {
  //     const res = await axios.post(
  //       `http://localhost:5000/api/ads/6655a8b6fb8d4d7987ac9eac/like`
  //     );

  //     console.log(res.data);
  //   } catch (error) {
  //     if (error.response && error.response.status === 400) {
  //       console.log("User exists");
  //     }
  //   }
  // }

  const userData = JSON.parse(localStorage.getItem("userData")) || {};
  const userId = userData._id;
  let adsCopy = [...ads];

  // sorting
  if (adsShowOrder === "low") {
    adsCopy.sort((a, b) => a.price - b.price);
  } else if (adsShowOrder === "high") {
    adsCopy.sort((a, b) => b.price - a.price);
  }

  // Filtering based on input value and category selection
  const filteredAds = adsCopy.filter((ad) => {
    const matchesCategory =
      filterSelectValue === "all" || ad.category.name === filterSelectValue;
    const matchesInput =
      ad.name.toLowerCase().includes(filterInputValue.toLowerCase()) ||
      ad.description.toLowerCase().includes(filterInputValue.toLowerCase());
    return matchesCategory && matchesInput;
  });

  const handleAdUpdate = (id) => {};

  console.log(userData);

  return (
    <div className={styles.container}>
      <h2>{filterSelectValue} Ads</h2>
      <div className={styles.adContainer}>
        {filteredAds.map((ad) => (
          <>
            {/* {console.log(ad)} */}
            <div key={ad._id} className={styles.singleAd}>
              {/* <div className={styles.imgContainer}> */}
              {ad.images.map((image) => (
                <img key={image} src={image} className={styles.adImage} />
              ))}
              {userData.token ? (
                <i onClick={() => handleLike(ad._id)}>
                  {likedAds[ad._id] && likedAds[ad._id][userId] ? (
                    <FaHeart className={styles.liked} />
                  ) : (
                    <FaRegHeart className={styles.unliked} />
                  )}
                  {/* {key === ad._id ? <FaHeart /> : <FaRegHeart />} */}
                </i>
              ) : null}

              {/* </div> */}
              <div className={styles.adContent}>
                <div>
                  <h2>{ad.name}</h2>
                  <div className={styles.manageAdBtns}>
                    {userData._id === ad.user._id && (
                      <Button
                        type="edit"
                        onClick={() => handleAdUpdate(ad._id)}
                      >
                        &#9998;
                      </Button>
                    )}
                    {(userData._id === ad.user._id ||
                      userData.role === "admin") && (
                      <Button
                        type="delete"
                        onClick={() => handleAdDelete(ad._id)}
                      >
                        &times;
                      </Button>
                    )}
                  </div>
                  <p className={styles.price}>{ad.price}&euro;</p>
                  <p className={styles.category}>{ad.category.name}</p>

                  <p>{ad.description}</p>
                </div>
                <Comments
                  adId={ad._id}
                  comments={comments[ad._id]}
                  setComments={setComments}
                />
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default Ads;
