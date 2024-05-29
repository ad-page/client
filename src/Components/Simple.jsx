import React, { useState } from 'react';
import { CreateAdModal } from './CreateAdModal';

const Simple = ({ setAds }) => {
  const [isCreateAdModalOpen, setIsCreateAdModalOpen] = useState(false);
  const [showMyAds, setShowMyAds] = useState(0);
  const [showFavorites, setShowFavorites] = useState(0);
  return (
    <div>
      <button onClick={() => setIsCreateAdModalOpen(true)}>Create Ad</button>
      <button
        onClick={() => (showMyAds === 0 ? setShowMyAds(1) : setShowMyAds(0))}
      >
        my ads
      </button>
      <button
        onClick={() =>
          showFavorites === 0 ? setShowFavorites(1) : setShowFavorites(0)
        }
      >
        favorites
      </button>
      {isCreateAdModalOpen && (
        <CreateAdModal
          setAds={setAds}
          setIsCreateAdModalOpen={setIsCreateAdModalOpen}
        />
      )}
      {showMyAds === 1 ? <div>here goes my ads component</div> : null}
      {showFavorites === 1 ? <div>here goes favorites component</div> : null}
    </div>
  );
};

export default Simple;
