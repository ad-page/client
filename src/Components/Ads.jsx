import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Comments from './Comments';
import styles from './Ads.module.css';

const Ads = ({ filterSelectValue, filterInputValue, adsShowOrder }) => {
  const [ads, setAds] = useState([]);
  const [comments, setComments] = useState({});
  const userData = JSON.parse(localStorage.getItem('userData'));
  let adsCopy = ads;

  const getAds = () => {
    axios.get('http://localhost:5000/api/ads').then((res) => setAds(res.data));
  };

  useEffect(() => {
    getAds();
  }, []);

  const handleAdDelete = (id) => {};
  const handleAdUpdate = (id) => {};

  // sorting
  adsShowOrder === 'low' ? adsCopy.sort((a, b) => a.price - b.price) : null;
  adsShowOrder === 'high' ? adsCopy.sort((a, b) => b.price - a.price) : null;

  return (
    <div className={styles.container}>
      <h2>{filterSelectValue} Ads</h2>
      {filterSelectValue === 'all' ? (
        <div className={styles.adContainer}>
          {adsCopy.map((ad) =>
            filterInputValue === '' ? (
              <div key={ad._id} className={styles.singleAd}>
                {userData?._id === ad.user._id ? (
                  <button onClick={() => handleAdUpdate}>Update</button>
                ) : null}
                {userData?._id === ad.user._id || userData?.role === 'admin' ? (
                  <button onClick={() => handleAdDelete}>Delete</button>
                ) : null}
                <div className={styles.imgContainer}>
                  {ad.images.map((image) => (
                    <img key={image} src={image} className={styles.adImage} />
                  ))}
                </div>
                <div className={styles.adContent}>
                  <div>
                    <h2>{ad.name}</h2>
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
            ) : ad.name
                .toLowerCase()
                .includes(filterInputValue.toLowerCase()) ||
              ad.description
                .toLowerCase()
                .includes(filterInputValue.toLowerCase()) ? (
              <div key={ad._id} className={styles.singleAd}>
                {userData?._id === ad.user._id ? (
                  <button onClick={() => handleAdUpdate}>Update</button>
                ) : null}
                {userData?._id === ad.user._id || userData?.role === 'admin' ? (
                  <button onClick={() => handleAdDelete}>Delete</button>
                ) : null}
                <div className={styles.imgContainer}>
                  {ad.images.map((image) => (
                    <img key={image} src={image} className={styles.adImage} />
                  ))}
                </div>
                {console.log(<span>{filterInputValue}</span>)}
                <div className={styles.adContent}>
                  <div>
                    <h2>
                      {ad.name.replace(
                        filterInputValue,
                        filterInputValue.toUpperCase()
                      )}
                    </h2>
                    <p className={styles.price}>{ad.price}&euro;</p>
                    <p>
                      {ad.description.replace(
                        filterInputValue,
                        filterInputValue.toUpperCase()
                      )}
                    </p>
                    <p className={styles.category}>{ad.category.name}</p>
                    <p className={styles.author}>by {ad.user.username}</p>
                  </div>
                  <Comments
                    adId={ad._id}
                    comments={comments[ad._id]}
                    setComments={setComments}
                  />
                </div>
              </div>
            ) : null
          )}
        </div>
      ) : (
        <div className={styles.adContainer}>
          {adsCopy.map((ad) =>
            filterInputValue === '' ? (
              ad.category.name === filterSelectValue ? (
                <div key={ad._id} className={styles.singleAd}>
                  {userData?._id === ad.user._id ? (
                    <button onClick={() => handleAdUpdate}>Update</button>
                  ) : null}
                  {userData?._id === ad.user._id ||
                  userData?.role === 'admin' ? (
                    <button onClick={() => handleAdDelete}>Delete</button>
                  ) : null}
                  <div className={styles.imgContainer}>
                    {ad.images.map((image) => (
                      <img key={image} src={image} className={styles.adImage} />
                    ))}
                  </div>
                  <div className={styles.adContent}>
                    <div>
                      <h2>{ad.name}</h2>
                      <p className={styles.price}>{ad.price}&euro;</p>
                      <p className={styles.category}>{ad.category.name}</p>
                      <p className={styles.description}>{ad.description}</p>
                      <p className={styles.author}>by {ad.user.username}</p>
                    </div>
                    <Comments
                      adId={ad._id}
                      comments={comments[ad._id]}
                      setComments={setComments}
                    />
                  </div>
                </div>
              ) : null
            ) : ad.name
                .toLowerCase()
                .includes(filterInputValue.toLowerCase()) ||
              ad.description
                .toLowerCase()
                .includes(filterInputValue.toLowerCase()) ? (
              ad.category.name === filterSelectValue ? (
                <div key={ad._id} className={styles.singleAd}>
                  {userData?._id === ad.user._id ? (
                    <button onClick={() => handleAdUpdate}>Update</button>
                  ) : null}
                  {userData?._id === ad.user._id ||
                  userData?.role === 'admin' ? (
                    <button onClick={() => handleAdDelete}>Delete</button>
                  ) : null}
                  <div className={styles.imgContainer}>
                    {ad.images.map((image) => (
                      <img key={image} src={image} className={styles.adImage} />
                    ))}
                  </div>
                  <div className={styles.adContent}>
                    <div>
                      <h2>
                        {ad.name.replace(
                          filterInputValue,
                          filterInputValue.toUpperCase()
                        )}
                      </h2>
                      <p className={styles.price}>{ad.price}&euro;</p>
                      <p className={styles.description}>
                        {ad.description.replace(
                          filterInputValue,
                          filterInputValue.toUpperCase()
                        )}
                      </p>
                      <p className={styles.category}>{ad.category.name}</p>
                      <p className={styles.author}>by {ad.user.username}</p>
                    </div>
                    <Comments
                      adId={ad._id}
                      comments={comments[ad._id]}
                      setComments={setComments}
                    />
                  </div>
                </div>
              ) : null
            ) : null
          )}
        </div>
      )}
    </div>
  );
};

export default Ads;
