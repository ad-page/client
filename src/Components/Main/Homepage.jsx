import { useEffect, useState } from "react";
import Filter from "./Filter";
import Navigation from "../Header/Navigation";
import Admin from "./Admin";
import Ads from "./Ads";
import Footer from "../Footer/Footer";
import Simple from "./Simple";
import axios from "axios";

function App({ children }) {
  const [filterSelectValue, setfilterSelectValue] = useState("all");
  const [filterInputValue, setfilterInputValue] = useState("");
  const [adsShowOrder, setAdsShowOrder] = useState("default");
  const [userRole, setUserRole] = useState(
    localStorage.getItem("userData")
      ? JSON.parse(localStorage.getItem("userData")).role
      : "none"
  );

  const [ads, setAds] = useState([]);
  const [showMyAds, setShowMyAds] = useState(false);
  const [showMyFavorites, setShowMyFavorites] = useState(false);

  useEffect(() => {
    const getAds = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/ads");
        setAds(res.data);
      } catch (error) {
        console.error("Error fetching ads:", error);
      }
    };
    getAds();
  }, []);

  return (
    <>
      <Navigation setUserRole={setUserRole} />
      <Filter
        filterInputValue={filterInputValue}
        setfilterInputValue={setfilterInputValue}
        setfilterSelectValue={setfilterSelectValue}
        setAdsShowOrder={setAdsShowOrder}
      />
      {userRole === "admin" ? (
        <>
          <h3>
            Welcome {JSON.parse(localStorage.getItem("userData")).username}
          </h3>
          <div className="manageContainer">
            <Admin
              setAds={setAds}
              setShowMyAds={setShowMyAds}
              setShowMyFavorites={setShowMyFavorites}
            />
          </div>
        </>
      ) : null}
      {userRole === "simple" ? (
        <>
          <h3>
            Welcome {JSON.parse(localStorage.getItem("userData")).username}
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
      {children}
      <Footer />
    </>
  );
}

export default App;
