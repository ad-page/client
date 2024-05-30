import React, { useState } from 'react';
import AllUsers from './AllUsers';
import Button from './SmallerComponents/Button';
import styles from './Admin.module.css';
import Simple from './Simple';
import { ManageCategoriesModal } from './ManageCategoriesModal';

const Admin = ({ setAds, setShowMyAds, setShowMyFavorites }) => {
  const [isUsersModalOpen, setIsUsersModalOpen] = useState(false);
  const [isManageCategoriesModalOpen, setIsManageCategoriesModalOpen] =
    useState(false);

  return (
    <div className={styles.container}>
      <Button onClick={() => setIsUsersModalOpen(true)} type="show">
        Users
      </Button>
      <Button onClick={() => setIsManageCategoriesModalOpen(true)} type="show">
        Categories
      </Button>

      <Simple
        setAds={setAds}
        setShowMyAds={setShowMyAds}
        setShowMyFavorites={setShowMyFavorites}
      />
      {isUsersModalOpen && (
        <AllUsers setIsUsersModalOpen={setIsUsersModalOpen} />
      )}
      {isManageCategoriesModalOpen && (
        <ManageCategoriesModal
          setIsManageCategoriesModalOpen={setIsManageCategoriesModalOpen}
        />
      )}
    </div>
  );
};

export default Admin;
