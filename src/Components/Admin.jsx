import axios from 'axios'
import React, { useEffect, useState } from 'react'
import AllUsers from './AllUsers';

const Admin = () => {
    const [showCategories, setShowCategories] = useState(0)
    const [showUsers, setShowUsers] = useState(0)
    const [categories, setcategories] = useState([])
    const [newCategory, setNewCategory] = useState("")
    const userToken = JSON.parse(localStorage.getItem("userData")).token

    // GET categoies
    const getCategories = () => {
        try {
          axios
            .get("http://localhost:5000/api/categories")
            .then((res) => setcategories(res.data));
        } catch (error) {
          console.log(error);
        }
      };
    //POST categories
    const postCategories = (data) => {
        try {
          axios
            .post("http://localhost:5000/api/categories", data,{
            headers:{
            Authorization: `Bearer ${userToken}`,
            'Content-Type': 'application/json',}
        })
        } catch (error) {
          console.log(error);
        }
      };
      useEffect(() => {
        getCategories();
      }, []);

      const deleteCategories = (id)=>{
            try {
              axios
                .delete(`http://localhost:5000/api/categories/${id}`,{
                headers:{
                Authorization: `Bearer ${userToken}`,
                'Content-Type': 'application/json',}
            })
            } catch (error) {
              console.log(error);
            }
      }

      const handleCategorySubmit= (ev)=>{
        const data = {name: newCategory}
        postCategories(data)
      }
      const handleCatInput =(el)=>{
            setNewCategory(el.target.value)
      }
      const handleCategoryDelete=(id)=>{
        deleteCategories(id)
        window.location.reload()
      }


  return (
    <div className='admin_corner'>
        <h3>Welcome Admin</h3>
        <h4>Manage:</h4>
        <button onClick={()=>showUsers===0?setShowUsers(1):setShowUsers(0)}>Users</button>
        <button onClick={()=>showCategories===0?setShowCategories(1):setShowCategories(0)}>Categories</button>
        {showCategories===1?<div>
            <ol>
                {categories.map((e)=><li key={e._id}>
                    <span>{e.name}</span>
                    <button type='submit' onClick={()=>handleCategoryDelete(e._id)}>Remove</button>
                </li>)}
            </ol>
            <form onSubmit={handleCategorySubmit}>
                <input type="text" value={newCategory} onChange={handleCatInput}/>
                <button type='submit'>Add new</button>
            </form>
        </div>:null}

        {showUsers===1?<AllUsers />:null}
    </div>
  );
};

export default Admin;
