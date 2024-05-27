import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import Button from './Button';
import Comments from './Comments';
import styles from './UserAds.module.css';

const BASE_URL = 'http://localhost:5000/api/ads';

const UserAds = ({ comments, setComments, handleAdDelete }) => {
  const [ads, setAds] = useState([]);
  const [click, setClick] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAds = async () => {
      setIsLoading(true);
      try {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const token = userData?.token;

        if (!token) {
          throw new Error('No token');
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(`${BASE_URL}/my`, config);
        setAds(response.data);

        console.log(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAds();
  }, []);

  const handleAdUpdate = (id) => {};

  const userData = JSON.parse(localStorage.getItem('userData')) || {};
  console.log(userData);

  return (
    <div>
      <h2>My ads</h2>
      <ul>
        {ads.map((ad) => (
          <div key={ad._id} className={styles.singleAd}>
            {/* <div className={styles.imgContainer}> */}
            {ad.images.map((image) => (
              <img key={image} src={image} className={styles.adImage} />
            ))}
            {/* </div> */}
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
              </div>
              <div className={styles.overallNum}>
                <Comments adId={ad._id} setComments={setComments} />

                <p>
                  Likes <FaHeart className={styles.liked} />:
                  {/* <span> {ad.likes.length}</span> */}
                </p>
                <p>
                  Comments: <span>{ad.comments.length}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default UserAds;
