import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Comments from './Comments';
import styles from './Ads.module.css';
import Button from './Button';

const Ads = ({
  filterSelectValue,
  filterInputValue,
  adsShowOrder,
  ads,
  handleAdDelete,
}) => {
  const [comments, setComments] = useState({});
  const userData = JSON.parse(localStorage.getItem('userData')) || {};
  let adsCopy = [...ads];

  // sorting
  if (adsShowOrder === 'low') {
    adsCopy.sort((a, b) => a.price - b.price);
  } else if (adsShowOrder === 'high') {
    adsCopy.sort((a, b) => b.price - a.price);
  }

  // Filtering based on input value and category selection
  const filteredAds = adsCopy.filter((ad) => {
    const matchesCategory =
      filterSelectValue === 'all' || ad.category.name === filterSelectValue;
    const matchesInput =
      ad.name.toLowerCase().includes(filterInputValue.toLowerCase()) ||
      ad.description.toLowerCase().includes(filterInputValue.toLowerCase());
    return matchesCategory && matchesInput;
  });

  const handleAdUpdate = (id) => {};

  return (
    <div className={styles.container}>
      <h2>{filterSelectValue} Ads</h2>
      <div className={styles.adContainer}>
        {filteredAds.map((ad) => (
          <div key={ad._id} className={styles.singleAd}>
            <div className={styles.imgContainer}>
              {ad.images.map((image) => (
                <img key={image} src={image} className={styles.adImage} />
              ))}
            </div>
            <div className={styles.adContent}>
              <div>
                <h2>{ad.name}</h2>
                <div className={styles.manageAdBtns}>
                  {userData._id === ad.user._id && (
                    <Button type="edit" onClick={() => handleAdUpdate(ad._id)}>
                      &#9998;
                    </Button>
                  )}
                  {(userData._id === ad.user._id ||
                    userData.role === 'admin') && (
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
                <p className={styles.author}>by {ad.user.username}</p>
              </div>
              <Comments
                adId={ad._id}
                comments={comments[ad._id]}
                setComments={setComments}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ads;
