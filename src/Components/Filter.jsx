import axios from "axios";
import React, { useEffect, useState } from "react";
import Comments from "./Comments";


const Filter = ({
    filterInputValue,
    setfilterInputValue,
    setfilterSelectValue,
    setAdsShowOrder
}) => {
    const [categories, setcategories] = useState([])

  const getCategories = () => {
    try {
      axios
        .get("http://localhost:5000/api/categories")
        .then((res) => setcategories(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const selectChange = (el) => {
    setfilterSelectValue(el.target.value);
  };

  const inputChange = (e) => {
    setfilterInputValue(e.target.value);
  };
  const sortSelectChange =(e)=>{
    setAdsShowOrder(e.target.value)
  }

  return (
    <div>
        <input
          type="text"
          placeholder="Search"
          onChange={inputChange}
          value={filterInputValue}
        />
        <label htmlFor="categories">Categorie: </label>
        <select id="categories" onChange={selectChange}>
          <option value="all">all</option>
          {categories.map((cate) => (
            <option key={cate.name} value={cate.name}>
              {cate.name}
            </option>
          ))}
        </select>
        <label htmlFor="sort">Price order: </label>
        <select id="sort" onChange={sortSelectChange}>
            <option value="default">--Chose--</option>
            <option value="low">Lover prices</option>
            <option value="high">hight pice</option>
        </select>
    </div>
  );
};

export default Filter

