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
  const [ads, setAds] = useState([]);

  useEffect(() => {
    const getAds = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/ads');
        setAds(res.data);
      } catch (error) {
        console.error('Error fetching ads:', error);
      }
    };
    getAds();
  }, [createAd]);

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
      setCreateAd(null);
    } catch (error) {
      console.error('Error deleting ad:', error);
      alert('Failed to delete ad');
    }
  };

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
        ads={ads}
        filterSelectValue={filterSelectValue}
        filterInputValue={filterInputValue}
        adsShowOrder={adsShowOrder}
        handleAdDelete={handleAdDelete}
      />
      <Footer />
    </>
  );
}

export default App;
