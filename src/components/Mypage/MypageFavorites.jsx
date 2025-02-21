import React, { useEffect, useState } from "react";
import { getCurrentUser } from "../../api/userApi";
import { getFavorites } from "../../api/favoritesApi";

function MypageFavorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    async function fetchFavorites() {
      const user = await getCurrentUser();
      if (user) {
        const data = await getFavorites(user.userId);
        setFavorites(data);
      }
    }
    fetchFavorites();
  }, []);

  return (
    <div>
      <h2>즐겨찾기한 축제</h2>
      {favorites.length > 0 ? (
        <ul>
          {favorites.map((fav) => (
            <li key={fav.festivalId}>📌 {fav.name}</li>
          ))}
        </ul>
      ) : (
        <p>즐겨찾기한 축제가 없습니다.</p>
      )}
    </div>
  );
}

export default MypageFavorites;
