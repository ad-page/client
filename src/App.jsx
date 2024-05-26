import { useEffect, useState } from "react";
import "./App.css";
import Filter from "./Components/Filter";
import Login from "./Components/Login";
import Navigation from "./Components/Navigation";
import Registration from "./Components/Registration";
import Admin from "./Components/Admin";
import Ads from "./Components/Ads";
import AllUsers from "./Components/AllUsers";
import Footer from "./Components/Footer";
import Simple from "./Components/Simple";

function App() {
  const [filterSelectValue, setfilterSelectValue] = useState("all");
  const [filterInputValue, setfilterInputValue] = useState("");
  const [adsShowOrder, setAdsShowOrder] = useState("default");
  const [userRole, setUserRole] = useState(
    localStorage.getItem("userData")
      ? JSON.parse(localStorage.getItem("userData")).role
      : "none"
  );

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
      {userRole === "admin" ? (
        <>
          <Admin />
        </>
      ) : null}
      {userRole === "simple" ? (
        <>
          <Simple />
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
