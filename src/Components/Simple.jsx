import React, { useState } from 'react';
import { CreateAdModal } from './CreateAdModal';
import Button from './Button';

const Simple = ({ setAds, setShowMyAds, setShowMyFavorites }) => {
  const [isCreateAdModalOpen, setIsCreateAdModalOpen] = useState(false);
  return (
    <>
      <Button
        type="show"
        onClick={() => {
          setShowMyAds(false);
          setShowMyFavorites(false);
        }}
      >
        All Ads
      </Button>
      <Button type="show" onClick={() => setIsCreateAdModalOpen(true)}>
        Create Ad
      </Button>
      <Button type="show" onClick={() => setShowMyAds(true)}>
        my Ads
      </Button>
      <Button type="show" onClick={() => setShowMyFavorites(true)}>
        My Favorites
      </Button>
      {isCreateAdModalOpen && (
        <CreateAdModal
          setAds={setAds}
          setIsCreateAdModalOpen={setIsCreateAdModalOpen}
        />
      )}
    </>
  );
};

export default Simple;
