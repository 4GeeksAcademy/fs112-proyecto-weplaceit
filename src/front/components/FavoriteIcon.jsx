{/* <i class="fa-solid fa-bookmark"></i>
<i class="fa-regular fa-bookmark"></i> */}

import React, { useState } from 'react';

export const FavoriteIcon = ({ itemId, onAddFavorite, onRemoveFavorite }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    if (isFavorite) {
      onRemoveFavorite(itemId);
    } else {
      onAddFavorite(itemId);
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <i
      className={`fa-${isFavorite ? 'solid' : 'regular'} fa-bookmark m-1`}
      style={{ cursor: 'pointer', fontSize: '1.5rem', color: isFavorite ? '#007bff' : '#6c757d' }}
      onClick={toggleFavorite}
    ></i>
  );
};