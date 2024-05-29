import React, { useEffect, useState } from 'react';
import Comments from './Comments';
import styles from './Ads.module.css';
import Button from './Button';
import Likes from './Likes';
import axios from 'axios';

const Ads = ({
  filterSelectValue,
  filterInputValue,
  adsShowOrder,
  ads,
  setAds,
  showMyFavorites,
  showMyAds,
}) => {
  const [comments, setComments] = useState({});
  const [filteredAds, setFilteredAds] = useState([]);
  const userData = JSON.parse(localStorage.getItem('userData')) || {};
  // const [likedAds, setLikedAds] = useState({});

  useEffect(() => {
    const filterAndSort = () => {
      let adsCopy = [...ads];

      if (showMyFavorites) {
        adsCopy = adsCopy.filter((ad) =>
          ad.likes.filter((user) => user === userData._id)
        );
      }

      if (showMyAds) {
        adsCopy = adsCopy.filter((ad) => ad.user._id === userData._id);
      }

      // Sorting
      if (adsShowOrder === 'low') {
        adsCopy.sort((a, b) => a.price - b.price);
      } else if (adsShowOrder === 'high') {
        adsCopy.sort((a, b) => b.price - a.price);
      }

      // Filtering based on input value and category selection
      return adsCopy.filter((ad) => {
        const matchesCategory =
          filterSelectValue === 'all' || ad.category.name === filterSelectValue;
        const matchesInput =
          ad.name.toLowerCase().includes(filterInputValue.toLowerCase()) ||
          ad.description.toLowerCase().includes(filterInputValue.toLowerCase());
        return matchesCategory && matchesInput;
      });
    };

    setFilteredAds(filterAndSort());
  }, [ads, filterSelectValue, filterInputValue, adsShowOrder, showMyAds]);

  const handleAdUpdate = (id) => {};

  const handleAdDelete = async (id) => {
    const userToken = localStorage.getItem('userData')
      ? JSON.parse(localStorage.getItem('userData')).token
      : 'none';
    if (!userToken) {
      alert('login to delete Ad');
      return;
    }
    try {
      await axios.delete(`http://localhost:5000/api/ads/${id}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
      });
      alert('Ad deleted successfully');
      setAds((prevAds) => prevAds.filter((ad) => ad._id !== id));
    } catch (error) {
      console.error('Error deleting ad:', error);
      alert('Failed to delete ad');
    }
  };

  return (
    <div className={styles.container}>
      <h2>{filterSelectValue} Ads</h2>
      <div className={styles.adContainer}>
        {filteredAds.map((ad) => (
          <>
            <div key={ad._id} className={styles.singleAd}>
              {/* <div className={styles.imgContainer}> */}
              {ad.images.map((image) => (
                <img key={image} src={image} className={styles.adImage} />
              ))}
              <Likes userData={userData} ad={ad} className={styles} />
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
