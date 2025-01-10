import React, { useState } from "react";
import { useParams } from "react-router-dom";
import festivals from "./FestivalData";
import { Card, CardMedia } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit"; //펜
import StarIcon from "@mui/icons-material/Star"; //별 (가득 참)
import StarBorderIcon from "@mui/icons-material/StarBorder"; //별(빈)
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone"; //벨 (빈)
import NotificationsIcon from "@mui/icons-material/Notifications"; //벨 (가득 참)

export default function FestivalDetailPage() {
  const { id } = useParams(); // URL에서 id 가져오기
  const festival = festivals.find((f) => f.id === parseInt(id, 10)); // id로 데이터 찾기

  if (!festival) {
    return <p>축제를 찾을 수 없습니다.</p>;
  }

  const [isFavorite, setIsFavorite] = useState(false); // 즐겨찾기 상태
  const [isNotified, setIsNotified] = useState(false); // 알림 설정 상태

  // 즐겨찾기 토글
  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev);
  };

  // 알림 설정 토글
  const toggleNotification = () => {
    setIsNotified((prev) => !prev);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {/* 이미지와 아이콘 영역 */}
      <div
        style={{
          flex: 1,
          position: "sticky", // 스크롤 시 고정된 위치에 유지
          top: "20px", // 화면 상단에서 20px 여백
          alignSelf: "flex-start", // 글과 함께 내려가는 효과
        }}
      >
        <div
          style={{
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* 이미지 */}
          <CardMedia
            component="img"
            image={festival.image}
            alt={festival.title}
            style={{
              width: "100%",
              height: "auto",
              marginBottom: "20px", // 아이콘과 간격 추가
            }}
          />
        </div>
          {/* 버튼 영역 */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "30px",
              marginTop: "10px",
            }}
          >
            {/* 리뷰 작성 버튼 */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <EditIcon fontSize="large" />
              <span>리뷰 작성</span>
            </div>

            {/* 즐겨찾기 버튼 */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={toggleFavorite}
            >
              {isFavorite ? (
                <StarIcon fontSize="large" style={{ color: "gold" }} />
              ) : (
                <StarBorderIcon fontSize="large" />
              )}
              <span>즐겨찾기</span>
            </div>

            {/* 알림 설정 버튼 */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={toggleNotification}
            >
              {isNotified ? (
                <NotificationsIcon fontSize="large" style={{ color: "red" }} />
              ) : (
                <NotificationsNoneIcon fontSize="large" />
              )}
              <span>알림설정</span>
            </div>
          </div>
      </div>

      {/* 설명 영역 */}
      <div
        style={{
          flex: 2,
          padding: "20px",
          overflowY: "auto", // 설명 영역 스크롤 가능
        }}
      >
        <h2>{festival.title}</h2>
        <p>{festival.date}</p>
        <p>{festival.location}</p>
        <p>{festival.adress}</p>
        <p>{festival.outline}</p>
        <p>{festival.Event_introduction}</p>
        <p>{festival.Event_details}</p>
        {/* 긴 내용 추가 */}
      </div>
    </div>
  );
}
