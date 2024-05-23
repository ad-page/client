import { useState } from "react";
import "./App.css";
import Filter from "./Components/Filter";
import Login from "./Components/Login";
import Navigation from "./Components/Navigation";
import Registration from "./Components/Registration";

function App() {
  const [filterSelectValue, setfilterSelectValue] = useState("all")
  const [filterInputValue, setfilterInputValue] = useState("")


  return (
    <>
      {/* <Registration /> */}
      <Navigation />
      <Filter filterInputValue={filterInputValue} setfilterInputValue={setfilterInputValue} setfilterSelectValue={setfilterSelectValue}/>
    </>
  );
}

export default App;
