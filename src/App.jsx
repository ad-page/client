import { useEffect, useState } from 'react';
import './App.css';
import Filter from './Components/Filter';
import Navigation from './Components/Navigation';
import Admin from './Components/Admin';
import Ads from './Components/Ads';
import Footer from './Components/Footer';
import Simple from './Components/Simple';
import axios from 'axios';
import UserAds from './Components/UserAds';

function App() {
  const [filterSelectValue, setfilterSelectValue] = useState('all');
  const [filterInputValue, setfilterInputValue] = useState('');
  const [adsShowOrder, setAdsShowOrder] = useState('default');
  const [userRole, setUserRole] = useState(
    localStorage.getItem('userData')
      ? JSON.parse(localStorage.getItem('userData')).role
      : 'none'
  );

  const [ads, setAds] = useState([]);
  const [showMyAds, setShowMyAds] = useState(false);
  const [showMyFavorites, setShowMyFavorites] = useState(false);

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
  }, []);

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
    <>
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
          <div className="manageContainer">
            <Admin setAds={setAds} />
          </div>
        </>
      ) : null}
      {userRole === 'simple' ? (
        <>
          <h3>
            Welcome {JSON.parse(localStorage.getItem('userData')).username}
          </h3>
          <div className="manageContainer">
            <Simple
              setAds={setAds}
              setShowMyAds={setShowMyAds}
              setShowMyFavorites={setShowMyFavorites}
            />
          </div>
        </>
      ) : null}
      <Ads
        ads={ads}
        setAds={setAds}
        filterSelectValue={filterSelectValue}
        filterInputValue={filterInputValue}
        adsShowOrder={adsShowOrder}
        handleAdDelete={handleAdDelete}
        showMyAds={showMyAds}
        showMyFavorites={showMyFavorites}
      />
      <Footer />
      <UserAds handleAdDelete={handleAdDelete} />
    </>
  );
}

export default App;
