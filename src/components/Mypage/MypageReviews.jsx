import React, { useEffect, useState } from "react";
import { getCurrentUser } from "../../api/userApi";
import { getRatings } from "../../api/ratingsApi";

function MypageReviews() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function fetchReviews() {
      const user = await getCurrentUser();
      if (user) {
        const data = await getRatings(user.userId);
        setReviews(data);
      }
    }
    fetchReviews();
  }, []);

  return (
    <div>
      <h2>작성한 리뷰 목록</h2>
      {reviews.length > 0 ? (
        <ul>
          {reviews.map((review) => (
            <li key={review.ratingId}>📝 {review.content}</li>
          ))}
        </ul>
      ) : (
        <p>작성한 리뷰가 없습니다.</p>
      )}
    </div>
  );
}

export default MypageReviews;
