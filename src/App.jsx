import { useEffect, useState } from "react";
import "./App.css";
import Filter from "./Components/Filter";
import Login from "./Components/Login";
import Navigation from "./Components/Navigation";
import Registration from "./Components/Registration";
import Admin from "./Components/Admin";
import Ads from "./Components/Ads";

function App() {
  const [filterSelectValue, setfilterSelectValue] = useState("all")
  const [filterInputValue, setfilterInputValue] = useState("")
  const [userRole, setUserRole] = useState(localStorage.getItem("userData")?JSON.parse(localStorage.getItem("userData")).role:"none")


  return (
    <>
      {/* <Registration /> */}
      <Navigation setUserRole={setUserRole}/>
      <Filter 
          filterInputValue={filterInputValue} 
          setfilterInputValue={setfilterInputValue} 
          setfilterSelectValue={setfilterSelectValue}/>
      {userRole==="admin"?<Admin/>:null}
      <Ads filterSelectValue={filterSelectValue} filterInputValue={filterInputValue}/>

    </>
  );
}

export default App;
