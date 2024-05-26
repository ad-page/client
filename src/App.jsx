import { useEffect, useState } from 'react';
import './App.css';
import Filter from './Components/Filter';
import Login from './Components/Login';
import Navigation from './Components/Navigation';
import Registration from './Components/Registration';
import Admin from './Components/Admin';
import Ads from './Components/Ads';
import AllUsers from './Components/AllUsers';
import Footer from './Components/Footer';
import Simple from './Components/Simple';
import axios from 'axios';
// import { create } from '../../server/models/categoryModel';

function App() {
  const [filterSelectValue, setfilterSelectValue] = useState('all');
  const [filterInputValue, setfilterInputValue] = useState('');
  const [adsShowOrder, setAdsShowOrder] = useState('default');
  const [userRole, setUserRole] = useState(
    localStorage.getItem('userData')
      ? JSON.parse(localStorage.getItem('userData')).role
      : 'none'
  );
  const [createAd, setCreateAd] = useState(null);
  console.log();
  useEffect(() => {
    if (!createAd) return;

    const userToken = localStorage.getItem('userData')
      ? JSON.parse(localStorage.getItem('userData')).token
      : 'none';

    if (!userToken) {
      alert('login to Create an Ad');
      return;
    }

    const postAd = async () => {
      try {
        await axios.post('http://localhost:5000/api/ads', createAd, {
          headers: {
            Authorization: `Bearer ${userToken}`,
            'Content-Type': 'application/json',
          },
        });
        alert('Ad created successfully');
      } catch (error) {
        console.error('Error creating ad:', error);
        alert('Failed to create ad');
      }
    };

    postAd();
  }, [createAd]);

  const postCategories = (data) => {
    try {
      axios.post('http://localhost:5000/api/categories', data, {
        headers: {
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* <Registration /> */}
      <Navigation setUserRole={setUserRole} />
      <Filter
        filterInputValue={filterInputValue}
        setfilterInputValue={setfilterInputValue}
        setfilterSelectValue={setfilterSelectValue}
        setAdsShowOrder={setAdsShowOrder}
      />
      {userRole === 'admin' ? (
        <>
          <h3>
            Welcome {JSON.parse(localStorage.getItem('userData')).username}
          </h3>
          <Admin setCreateAd={setCreateAd} />
        </>
      ) : null}
      {userRole === 'simple' ? (
        <>
          <h3>
            Welcome {JSON.parse(localStorage.getItem('userData')).username}
          </h3>
          <Simple setCreateAd={setCreateAd} />
        </>
      ) : null}
      <Ads
        filterSelectValue={filterSelectValue}
        filterInputValue={filterInputValue}
        adsShowOrder={adsShowOrder}
      />
      <Footer />
    </>
  );
}

export default App;
