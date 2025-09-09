{/* <i class="fa-solid fa-bookmark"></i>
<i class="fa-regular fa-bookmark"></i> */}

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const FavoriteIcon = ({ itemId, isFav}) => {

  const navigate = useNavigate();

  const [isFavorite, setIsFavorite] = useState(isFav);
    const [userFavorites, setUserFavorites] = useState(null);

  const toggleFavorite = () => {
    if (isFavorite) {
      onRemoveFavorite(itemId);
    } else {
      onAddFavorite(itemId);
    }
    
  };

  useEffect(() => {
    setIsFavorite(isFav);
    console.log(isFav);
  }, [isFav]);

const onAddFavorite = async (itemId) => {
  const token = localStorage.getItem("token");
  if (token==null) {navigate("/login"); return;}
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/create-favorite`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ space_id: itemId })
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    // Actualiza el estado local para reflejar el cambio
    setIsFavorite(true);
  } catch (error) {
    console.error("Error adding favorite:", error);
  }
};

const onRemoveFavorite = async (itemId) => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/delete-favorite/{}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ space_id: itemId })
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    // Actualiza el estado local para reflejar el cambio
    setIsFavorite(false);
  } catch (error) {
    console.error("Error removing favorite:", error);
  }
};


  

  return (
    <i
      className={`fa-${isFavorite ? 'solid' : 'regular'} fa-bookmark m-1`}
      style={{ cursor: 'pointer', fontSize: '1.5rem', color: isFavorite ? '#007bff' : '#6c757d' }}
      onClick={toggleFavorite}
    ></i>
  );
};