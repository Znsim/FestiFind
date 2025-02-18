import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Box, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { fetchMainPageData } from "../../api/mainPageApi";
import FestivalCards from "./MainFestivalData";

export default function MainPage() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [festival, setFestival] = useState([]); // API 데이터 상태
    const navigate = useNavigate();
    const MAX_TITLE_LENGTH = 20;

    // API 데이터 가져오기
    useEffect(() => {
        const getFestivals = async () => {
            try {
                const data = await fetchMainPageData();
                console.log("API응답 데이터", data);
                setFestival(data);
            } catch (error) {
                console.log("축제 데이터를 불러오는 중 오류 발생: ", error.message);
            }
        };
        getFestivals();
    }, []);

    // 10초마다 슬라이드 변경
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex + 1 >= festival.length ? 0 : prevIndex + 1
            );
        }, 10000);

        return () => clearInterval(interval);
    }, [festival]);

    // 슬라이드에 표시할 3개의 축제 데이터 계산
    const visibleFestivals = festival.length > 0 ? [
        festival[currentIndex],
        festival[(currentIndex + 1) % festival.length],
        festival[(currentIndex + 2) % festival.length],
    ] : [];

    const handleCardClick = (id) => {
        navigate(`/festival/${id}`);
    };

    return (
        <div style={{ padding: "20px" }}>
            {/* 자동 슬라이드 카드 */}
            <Box
                sx={{
                    borderRadius: "8px",
                    padding: "20px",
                    maxWidth: "1200px",
                    margin: "0 auto",
                    overflow: "hidden",
                    marginBottom: "40px",
                }}
            >
                <Grid container spacing={3} justifyContent="center">
                    {visibleFestivals.map((festival, index) => {
                        const truncatedTitle =
                            festival?.title && festival.title.length > MAX_TITLE_LENGTH
                                ? `${festival.title.slice(0, MAX_TITLE_LENGTH)}...`
                                : festival?.title || "축제 정보 없음";

                        return (
                            <Grid
                                item
                                xs={12}
                                sm={6}
                                md={4}
                                key={festival?.id || `festival-${index}`}
                                sx={{
                                    transform: index === 1 ? "scale(1.1)" : "scale(1)",
                                    transition: "transform 0.3s ease-in-out",
                                    zIndex: index === 1 ? 1 : 0,
                                }}
                            >
                                <Card
                                    onClick={() => handleCardClick(festival?.contentid)}
                                    style={{
                                        boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
                                        borderRadius: "8px",
                                        overflow: "hidden",
                                    }}
                                >
                                    <img
                                        src={
                                            festival?.firstimage && festival.firstimage.startsWith("http")
                                                ? festival.firstimage
                                                : "https://via.placeholder.com/300x200"
                                        }
                                        alt={festival?.title || "축제 정보 없음"}
                                        style={{
                                            width: "100%",
                                            height: "150px",
                                            objectFit: "cover",
                                        }}
                                    />

                                    <CardContent>
                                        <Tooltip title={festival?.title || "축제 정보 없음"} arrow>
                                            <h2
                                                style={{
                                                    textAlign: "center",
                                                    whiteSpace: "nowrap",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    maxWidth: "100%",
                                                }}
                                            >
                                                {truncatedTitle}
                                            </h2>
                                        </Tooltip>
                                        <p style={{ textAlign: "center" }}>
                                            {festival?.eventstartdate || "시작 정보 없음"} ~{" "}
                                            {festival?.eventenddate || "종료 정보 없음"}
                                        </p>
                                        <p style={{ textAlign: "center" }}>{festival?.addr1 || "위치 정보 없음"}</p>
                                    </CardContent>
                                </Card>
                            </Grid>
                        );
                    })}
                </Grid>
            </Box>

            {/* 축제 카드 */}
            {festival.length > 0 && <FestivalCards filteredFestivals={festival} />}
        </div>
    );
}
