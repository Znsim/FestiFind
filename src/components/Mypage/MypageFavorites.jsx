import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Tooltip from "@mui/material/Tooltip";
import { getFavorites } from "../../api/favoritesApi"; // 즐겨찾기 API
import { fetchMainPageData } from "../../api/mainPageApi"; // 메인 축제 데이터 API
import { fetchUserId } from "../../api/user_idApi"; // 토큰에서 user_id 추출 함수
import "./MypageFavorites.css";

const MAX_TITLE_LENGTH = 20;

function MypageFavorites() {
  const [favorites, setFavorites] = useState([]);
  const [festivalMap, setFestivalMap] = useState({}); // key: contentid, value: 축제 정보
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // 토큰에서 user_id를 추출해 state에 저장
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUserId(token).then((uid) => {
        if (uid) {
          setUserId(uid);
          localStorage.setItem("user_id", uid);
        }
      });
    }
  }, []);

  
  // userId가 설정되면 즐겨찾기 데이터를 가져옴
  useEffect(() => {
    async function fetchData() {
      if (!userId) {
        console.warn("user_id가 아직 설정되지 않았습니다.");
        return;
      }
      try {
        setIsLoading(true);
        // 즐겨찾기 목록 API 호출
        const favs = await getFavorites(userId);
        console.log("원본 즐겨찾기 데이터:", favs);
        // 중복 제거: 동일 contentId를 가진 항목은 한 번만 저장
        const uniqueFavs = [];
        const seen = new Set();
        favs.forEach((fav) => {
          const id = fav.contentId || fav.contentid;
          if (id && !seen.has(id)) {
            seen.add(id);
            uniqueFavs.push(fav);
          }
        });
        console.log("중복 제거 후 즐겨찾기 데이터:", uniqueFavs);
        setFavorites(uniqueFavs);

        // 메인 축제 데이터를 전체 가져와 contentid로 매핑
        const allFestivals = await fetchMainPageData();
        console.log("메인 축제 데이터:", allFestivals);
        const map = {};
        allFestivals.forEach((festival) => {
          if (festival.contentid) {
            map[festival.contentid] = festival;
          }
        });
        setFestivalMap(map);
      } catch (err) {
        console.error("즐겨찾기 데이터 로드 중 오류:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [userId]);

  // 카드 클릭 시 상세 페이지로 이동
  const handleFestivalClick = (fav) => {
    const id = fav.contentId || fav.contentid;
    if (!id) {
      console.error("유효하지 않은 content id:", fav);
      return;
    }
    const festivalInfo = festivalMap[id] || {};
    navigate(`/festivalDetailPage/${id}/15`, {
      state: {
        title: festivalInfo.title || `축제 ${id}`,
        image: festivalInfo.firstimage || festivalInfo.firstimage2 || "https://placehold.co/200",
      },
    });
  };

  // 제목 길이가 너무 길면 자르기
  const truncateTitle = (title) => {
    if (!title) return "제목 없음";
    return title.length > MAX_TITLE_LENGTH ? title.slice(0, MAX_TITLE_LENGTH) + "..." : title;
  };

  if (isLoading) {
    return <p style={{ textAlign: "center" }}>로딩 중...</p>;
  }

  if (!userId) {
    return <p style={{ textAlign: "center", color: "red" }}>로그인이 필요합니다.</p>;
  }

  return (
    <div className="favorites-wrapper">
      <h2>즐겨찾기한 축제</h2>
      {favorites.length > 0 ? (
        <Grid container spacing={2}>
          {favorites.map((fav, index) => {
            const id = fav.contentId || fav.contentid;
            const festivalInfo = festivalMap[id] || {};
            const title = festivalInfo.title || `축제 ${id}`;
            const imageUrl = festivalInfo.firstimage || festivalInfo.firstimage2 || "https://placehold.co/200";
            const key = id ? `${id}-${index}` : `festival-${index}`;

            return (
              <Grid item xs={12} sm={6} md={4} key={key}>
                <Card onClick={() => handleFestivalClick(fav)} className="festival-card">
                  <div className="festival-card-content">
                    <img src={imageUrl} alt={title} className="festival-card-img" />
                    <CardContent className="festival-content">
                      <Tooltip title={title} arrow>
                        <h3 className="festival-title">{truncateTitle(title)}</h3>
                      </Tooltip>
                      {festivalInfo.eventstartdate && festivalInfo.eventenddate && (
                        <p className="festival-date">
                          {festivalInfo.eventstartdate} ~ {festivalInfo.eventenddate}
                        </p>
                      )}
                      {festivalInfo.addr1 && <p className="festival-location">{festivalInfo.addr1}</p>}
                    </CardContent>
                  </div>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <p style={{ textAlign: "center" }}>즐겨찾기한 축제가 없습니다.</p>
      )}
    </div>
  );
}

export default MypageFavorites;
