import React, { useState } from 'react';
import { CreateAdModal } from './CreateAdModal';
import Button from './Button';

const Simple = ({ setAds }) => {
  const [isCreateAdModalOpen, setIsCreateAdModalOpen] = useState(false);
  const [showMyAds, setShowMyAds] = useState(0);
  const [showFavorites, setShowFavorites] = useState(0);
  return (
    <>
      <Button type="show" onClick={() => setIsCreateAdModalOpen(true)}>
        Create Ad
      </Button>
      <Button
        type="show"
        onClick={() => (showMyAds === 0 ? setShowMyAds(1) : setShowMyAds(0))}
      >
        my ads
      </Button>
      <Button
        type="show"
        onClick={() =>
          showFavorites === 0 ? setShowFavorites(1) : setShowFavorites(0)
        }
      >
        favorites
      </Button>
      {isCreateAdModalOpen && (
        <CreateAdModal
          setAds={setAds}
          setIsCreateAdModalOpen={setIsCreateAdModalOpen}
        />
      )}
      {showMyAds === 1 ? <div>here goes my ads component</div> : null}
      {showFavorites === 1 ? <div>here goes favorites component</div> : null}
    </>
  );
};

export default Simple;
