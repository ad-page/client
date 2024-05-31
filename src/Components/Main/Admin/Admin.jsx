import React, { useState } from 'react';
import ManageUsers from './ManageUsers';
import Button from '../SmallerComponents/Button';
import AllUsers from '../AllUsers/AllUsers';
import styles from './Admin.module.css';
import { ManageCategories } from './ManageCategories';

const Admin = ({ setAds, setShowMyAds, setShowMyFavorites }) => {
  const [isManageUsersOpen, setIsManageUsersOpen] = useState(false);
  const [isManageCategoriesOpen, setIsManageCategoriesOpen] = useState(false);

  return (
    <div className={styles.container}>
      <Button onClick={() => setIsManageUsersOpen(true)} type="show">
        Users
      </Button>
      <Button onClick={() => setIsManageCategoriesOpen(true)} type="show">
        Categories
      </Button>

      <AllUsers
        setAds={setAds}
        setShowMyAds={setShowMyAds}
        setShowMyFavorites={setShowMyFavorites}
      />
      {isManageUsersOpen && (
        <ManageUsers setIsManageUsersOpen={setIsManageUsersOpen} />
      )}
      {isManageCategoriesOpen && (
        <ManageCategories
          setIsManageCategoriesOpen={setIsManageCategoriesOpen}
        />
      )}
    </div>
  );
};

export default Admin;
