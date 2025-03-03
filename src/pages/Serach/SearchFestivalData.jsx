import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useNavigate } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import { searchFestival } from "../../api/serachApi";
import "../Main/MainFestivalData.css";

const MAX_TITLE_LENGTH = 20;

// 축제 카드 렌더링 컴포넌트
export function FestivalCards({ filteredFestivals = [] }) {
    const navigate = useNavigate();
    const [festivals, setFestivals] = useState([]);

    useEffect(() => {
        const getFestivals = async () => {
            try {
                const festivalData = {
                    pageNo: 1, // 기본 페이지 번호 추가
                    contentTypeId: 15, // 행사/공연/축제 타입 지정
                    keyword: "", // 검색어 기본값 추가
                };
                const data = await searchFestival(festivalData);
                console.log("📌 API 응답 데이터:", data);
                setFestivals(data);
            } catch (error) {
                console.error("❌ 축제 데이터를 불러오는 중 오류 발생: ", error.message);
            }
        };
        getFestivals();
    }, []);

    const handleLogoClick = (festival) => {
        if (!festival?.contentid) {
            console.error("❌ 유효하지 않은 contentId:", festival?.contentid);
            return;
        }

        console.log("📌 클릭된 축제 데이터:", festival);

        navigate(`/festivalDetailPage/${festival.contentid}/${festival.contenttypeid ?? "12"}`, {
            state: {
                title: festival.title,
                contentId: festival.contentid,
                image: festival.firstimage,
            },
        });
    };

    return (
        <Grid container spacing={3} style={{ marginTop: "20px" }}>
            {filteredFestivals.map((festival, index) => {
                const truncatedTitle =
                    festival?.title && festival.title.length > MAX_TITLE_LENGTH
                        ? festival.title.slice(0, MAX_TITLE_LENGTH) + "..."
                        : festival?.title || "제목 없음";

                return (
                    <Grid item xs={12} sm={6} md={4} key={festival?.contentid || `festival-${index}`}>
                        <Card onClick={() => handleLogoClick(festival)} className="festival-card">
                            {festival?.firstimage && festival.firstimage.startsWith("http") ? (
                                <img
                                    src={festival.firstimage}
                                    alt={festival?.title || "축제 정보 없음"}
                                    className="festival-card-img"
                                />
                            ) : (
                                <div className="placeholder">이미지 없음</div>
                            )}
                            <CardContent className="festival-content">
                                <Tooltip title={festival?.title || "축제 정보 없음"} arrow>
                                    <h2>{truncatedTitle}</h2>
                                </Tooltip>

                                {/* contenttypeid가 15일 때만 시작, 종료 날짜 표시 */}
                                {festival?.contenttypeid === 15 && (
                                    <p>
                                        {festival?.eventstartdate || "날짜 없음"} ~ {festival?.eventenddate || "날짜 없음"}
                                    </p>
                                )}

                                <p>{festival?.addr1 || "위치 정보 없음"}</p>
                            </CardContent>
                        </Card>
                    </Grid>
                );
            })}
        </Grid>
    );
}

export default FestivalCards;
