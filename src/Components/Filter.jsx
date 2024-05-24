import axios from 'axios';
import React, { useEffect, useState } from 'react'
    

const Filter = ({filterInputValue,setfilterInputValue,setfilterSelectValue}) => {
    const [categories, setcategories] = useState([])
    // const [selectValue, setfilterSelectValue] = useState("all")
    // const [filterInputValue, setfilterInputValue] = useState("")

    const getCategories = ()=>{
        try{
            axios.get("http://localhost:5000/api/categories")
                .then((res)=>setcategories(res.data))
        }catch(error){
            console.log(error);
        }
    }
    useEffect(()=>{
       getCategories()
    },[])

    
    const selectChange = (el)=>{
        setfilterSelectValue(el.target.value)
    }
    const inputChange = (e)=>{
        setfilterInputValue(e.target.value)
    }
    
  return (
    <div>
        <form>
            <input type="text" placeholder='keyword' onChange={inputChange} value={filterInputValue}/>
            <label htmlFor="categories">Categories </label>
            <select id='categories' onChange={selectChange}>
                <option value="all">All</option>
                {categories.map((cate)=><option key={cate.name} value={cate.name}>{cate.name}</option>)}
            </select>
            <button>Search</button>
        </form>
        <h4>Show</h4>
        <button onClick={()=>setfilterSelectValue("all")}>All</button>
        {categories.map((cate)=><button key={cate.name} value={cate.name} onClick={selectChange}>{cate.name}</button>)}
    </div>
  )
}

export default Filter