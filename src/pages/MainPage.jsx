import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Box } from "@mui/material";
import festivals, { FestivalCards } from "./FestivalData";

export default function MainPage() {
    const [currentIndex, setCurrentIndex] = useState(0); // 슬라이드 시작 인덱스 상태 관리

    // 10초마다 슬라이드 이동
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex + 1 >= festivals.length ? 0 : prevIndex + 1
            );
        }, 10000); // 10초마다 슬라이드 변경

        return () => clearInterval(interval); // 컴포넌트 언마운트 시 interval 정리
    }, []);

    // 슬라이드에 표시할 3개의 축제 데이터 계산
    const visibleFestivals = [
        festivals[currentIndex], // 현재 인덱스의 축제
        festivals[(currentIndex + 1) % festivals.length], // 다음 축제
        festivals[(currentIndex + 2) % festivals.length], // 다다음 축제
    ];

    return (
        <div style={{ padding: "20px" }}>
            {/* 자동 슬라이드 카드 */}
            <Box
                sx={{
                    border: "2px solid black", // 검은색 테두리
                    borderRadius: "8px", // 둥근 모서리
                    padding: "20px", // 내부 여백
                    maxWidth: "1200px",
                    margin: "0 auto", // 가운데 정렬
                    overflow: "hidden",
                    marginBottom: "40px", // 아래 카드와 간격
                }}
            >
                <Grid container spacing={3} justifyContent="center">
                    {visibleFestivals.map((festival, index) => (
                        <Grid
                            item
                            xs={12}
                            sm={6}
                            md={4}
                            key={festival.id}
                            sx={{
                                transform: index === 1 ? "scale(1.1)" : "scale(1)", // 가운데 카드 강조
                                transition: "transform 0.3s ease-in-out", // 부드러운 확대 효과
                                zIndex: index === 1 ? 1 : 0, // 가운데 카드 위로
                            }}
                        >
                            <Card
                                style={{
                                    boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
                                    borderRadius: "8px",
                                    overflow: "hidden",
                                }}
                            >
                                <img
                                    src={festival.image || "https://via.placeholder.com/300"}
                                    alt={festival.title}
                                    style={{
                                        width: "100%",
                                        height: "150px",
                                        objectFit: "cover",
                                    }}
                                />
                                <CardContent>
                                    <h2 style={{ textAlign: "center" }}>{festival.title}</h2>
                                    <p style={{ textAlign: "center" }}>{festival.date}</p>
                                    <p style={{ textAlign: "center" }}>{festival.location}</p>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            {/* 정적 축제 카드 */}
            <FestivalCards filteredFestivals={festivals} />
        </div>
    );
}
