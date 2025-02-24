import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useNavigate } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import "./MainFestivalData.css";

const MAX_TITLE_LENGTH = 20;

export function FestivalCards({ filteredFestivals }) {
    const navigate = useNavigate();

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
                image: festival.firstimage  // 이미지 추가!
            },
        });
    };
    useEffect(() => {
        if (!filteredFestivals || filteredFestivals.length === 0) return;

        filteredFestivals.forEach((fest) => {
            if (!fest.contenttypeid) {
                console.warn(`⚠️ contentTypeId가 누락된 축제: ${fest.title || "제목 없음"}`);
            }
        });
    }, [filteredFestivals]);

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
                                <p style={{ textAlign: "center" }}>
                                    {festival?.eventstartdate || "시작 정보 없음"} ~ {festival?.eventenddate || "종료 정보 없음"}
                                </p>
                                <p style={{ textAlign: "center" }}>{festival?.addr1 || "위치 정보 없음"}</p>
                            </CardContent>
                        </Card>
                    </Grid>
                );
            })}
        </Grid>
    );
}

export default FestivalCards;
