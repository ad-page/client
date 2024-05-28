import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AllUsers from './AllUsers';
import Button from './Button';
import styles from './Admin.module.css';
import Simple from './Simple';

const Admin = ({ setCreateAd }) => {
  const [showCategories, setShowCategories] = useState(0);
  const [showUsers, setShowUsers] = useState(0);
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const userToken = JSON.parse(localStorage.getItem('userData')).token;

  // GET categoies
  const getCategories = () => {
    try {
      axios
        .get('http://localhost:5000/api/categories')
        .then((res) => setCategories(res.data));
    } catch (error) {
      console.log(error);
    }
  };
  //POST categories
  const postCategories = (data) => {
    try {
      axios
        .post('http://localhost:5000/api/categories', data, {
          headers: {
            Authorization: `Bearer ${userToken}`,
            'Content-Type': 'application/json',
          },
        })
        .then((res) => getCategories());
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCategories();
  }, []);

  const deleteCategories = (id) => {
    try {
      axios
        .delete(`http://localhost:5000/api/categories/${id}`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
            'Content-Type': 'application/json',
          },
        })
        .then((res) => getCategories());
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategorySubmit = (ev) => {
    ev.preventDefault();
    const data = { name: newCategory };
    postCategories(data);
    setNewCategory('');
  };
  const handleCatInput = (el) => {
    setNewCategory(el.target.value);
  };
  const handleCategoryDelete = (id) => {
    deleteCategories(id);
  };

  return (
    <div className={styles.container}>
      <h4>Manage:</h4>
      <Button
        onClick={() =>
          showUsers === 0
            ? (setShowUsers(1), setShowCategories(0))
            : setShowUsers(0)
        }
        type="show"
      >
        Users
      </Button>
      <Button
        onClick={() =>
          showCategories === 0
            ? (setShowCategories(1), setShowUsers(0))
            : setShowCategories(0)
        }
        type="show"
      >
        Categories
      </Button>
      {showCategories === 1 ? (
        <div>
          <ol>
            {categories.map((e) => (
              <li key={e._id}>
                <span>{e.name}</span>
                <Button
                  type="delete"
                  onClick={() => handleCategoryDelete(e._id)}
                >
                  &times;
                </Button>
              </li>
            ))}
          </ol>
          <form onSubmit={handleCategorySubmit}>
            <input
              type="text"
              value={newCategory}
              onChange={handleCatInput}
              required
            />
            <Button type="submit" className={styles.categoriesBtn}>
              Add new
            </Button>
          </form>
        </div>
      ) : null}

      {showUsers === 1 ? <AllUsers /> : null}
      <Simple setCreateAd={setCreateAd} />
    </div>
  );
};

export default Admin;
