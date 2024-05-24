import { useEffect, useState } from "react";
import "./App.css";
import Filter from "./Components/Filter";
import Login from "./Components/Login";
import Navigation from "./Components/Navigation";
import Registration from "./Components/Registration";
import Admin from "./Components/Admin";

function App() {
  const [filterSelectValue, setfilterSelectValue] = useState("all")
  const [userRole, setUserRole] = useState(localStorage.getItem("userData")?JSON.parse(localStorage.getItem("userData")).role:"none")
  const [filterInputValue, setfilterInputValue] = useState("")

  console.log(userRole);



  return (
    <>
      {/* <Registration /> */}
      <Navigation setUserRole={setUserRole}/>
      <Filter 
          filterInputValue={filterInputValue} 
          setfilterInputValue={setfilterInputValue} 
          setfilterSelectValue={setfilterSelectValue}/>
      {userRole==="simple"?<Admin/>:null}

    </>
  );
}

export default App;
