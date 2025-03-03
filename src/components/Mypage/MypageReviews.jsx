import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRatings } from "../../api/ratingsApi";
import { fetchMainPageData } from "../../api/mainPageApi";
import "./MypageReviews.css";

const MypageReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [festivalMap, setFestivalMap] = useState({}); // contentid => 축제 정보
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const userId = localStorage.getItem("user_id");
      if (!userId) {
        console.warn("로그인 후 이용해주세요.");
        return;
      }
      try {
        // 1. 리뷰 데이터 가져오기
        const ratingData = await getRatings(userId);
        const ratings = Array.isArray(ratingData) ? ratingData : [ratingData];
        setReviews(ratings);
        console.log("리뷰 데이터:", ratings);

        // 2. 메인 축제 데이터 가져오기
        const allFestivals = await fetchMainPageData();
        console.log("메인 축제 데이터:", allFestivals);
        const map = {};
        allFestivals.forEach((festival) => {
          if (festival.contentid) {
            map[festival.contentid] = festival;
          }
        });
        setFestivalMap(map);
      } catch (error) {
        console.error("리뷰 데이터 로드 중 오류:", error);
      }
    }
    fetchData();
  }, []);

  // 리뷰 항목 클릭 시 축제 상세 페이지로 이동
  const handleReviewClick = (review) => {
    const id = review.contentId || review.contentid;
    if (!id) {
      console.error("유효하지 않은 content id:", review);
      return;
    }
    const festivalInfo = festivalMap[id] || {};
    navigate(`/festivalDetailPage/${id}/15`, {
      state: {
        title: festivalInfo.title || `축제 ${id}`,
        image:
          festivalInfo.firstimage || festivalInfo.firstimage2 || "https://placehold.co/200",
      },
    });
  };

  return (
    <div className="mypage-reviews">
      <h2>내 리뷰 목록</h2>
      {reviews && reviews.length > 0 ? (
        <div className="reviews-list">
          {reviews.map((review, index) => {
            const id = review.contentId || review.contentid;
            const festivalInfo = festivalMap[id] || {};
            const title = festivalInfo.title || `축제 ${id}`;
            const imageUrl =
              festivalInfo.firstimage || festivalInfo.firstimage2 || "https://placehold.co/200";
            const key = id ? `${id}-${index}` : `festival-${index}`;
            return (
              <div key={key} className="review-item" onClick={() => handleReviewClick(review)}>
                <div className="review-image">
                  {imageUrl ? (
                    <img src={imageUrl} alt={title} />
                  ) : (
                    <div className="placeholder">이미지 없음</div>
                  )}
                </div>
                <div className="review-details">
                  <h3 className="review-title">{title}</h3>
                  <p className="review-content">{review.content}</p>
                  <div className="review-meta">
                    <span className="review-rating">평점: {review.rating}</span>
                    <span className="review-date">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p style={{ textAlign: "center" }}>작성한 리뷰가 없습니다.</p>
      )}
    </div>
  );
};

export default MypageReviews;
