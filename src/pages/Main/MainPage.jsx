import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Box } from "@mui/material";
import { FestivalCards } from "./MainFestivalData";
import { useNavigate } from "react-router-dom";
import {fetchMainPageData} from "../../api/mainPageApi";


export default function MainPage() {
    const [currentIndex, setCurrentIndex] = useState(0); // 슬라이드 시작 인덱스 상태 관리
    const [festivals, setFestivals] = useState([]); //API 데이터 상태
    const navigate = useNavigate();

    //API
    useEffect(()=>{
        const getFestivals = async () => {
            try {
                const data = await fetchMainPageData();
                console.log("API응답 데이터",data);
                setFestivals(data);
            }catch (error) {
                console.log("축제 데이터를 불러오는 중 오류 발생 : ",error.message);
            }
        };
        getFestivals();
    },[]);
    
    // 10초마다 슬라이드 변경
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex + 1 >= festivals.length ? 0 : prevIndex + 1
            );
        }, 10000); 

        return () => clearInterval(interval); // 컴포넌트 언마운트 시 interval 정리
    }, [festivals]); //festivals가 변경 될 때만 실행

    // 슬라이드에 표시할 3개의 축제 데이터 계산
    const visibleFestivals = festivals.length > 0 ? [
        festivals[currentIndex], // 현재 인덱스의 축제
        festivals[(currentIndex + 1) % festivals.length], // 다음 축제
        festivals[(currentIndex + 2) % festivals.length], // 다다음 축제
    ] : [];

    const handleCardClick = (id) => {
        navigate(`/festival/${id}`); // 해당 ID로 상세 페이지 이동
    };

    return (
        <div style={{ padding: "20px" }}>
            {/* 자동 슬라이드 카드 */}
            <Box
                sx={{
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
                                key={festival.id || `festival-${index}`}
                                sx={{
                                    transform: index === 1 ? "scale(1.1)" : "scale(1)", // 가운데 카드 강조
                                    transition: "transform 0.3s ease-in-out", // 부드러운 확대 효과
                                    zIndex: index === 1 ? 1 : 0, // 가운데 카드 위로
                                }}
                            >
                                    <Card
                                        onClick={() => handleCardClick(festival?.contentid)} // 클릭 이벤트 추가
                                        style={{
                                            boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
                                            borderRadius: "8px",
                                            overflow: "hidden",
                                        }}
                                    >
                                        <img
                                            src={festival?.firstimage && festival.firstimage.startsWith("http") ? festival.firstimage : "https://via.placeholder.com/300x200"}
                                            alt={festival?.title || "축제 정보 없음"}
                                            style={{
                                                width: "100%",
                                                height: "150px",
                                                objectFit: "cover",
                                            }}
                                        />

                                        <CardContent>
                                            <h2 style={{ textAlign: "center" }}>{festival?.title || "축제 정보 없음"}</h2>
                                            <p style={{ textAlign: "center" }}>{festival?.eventstartdate || "시작 정보 없음"} ~ {festival?.eventenddate || "종료 정보 없음"}</p>
                                            <p style={{ textAlign: "center" }}>{festival?.addr1 || "위치 정보 없음"}</p>
                                        </CardContent>
                                    </Card>
                            </Grid>
                        ))}
                    </Grid>
            </Box>

            {/* 축제 카드 */}
            {festivals.length > 0 && <FestivalCards filteredFestivals={festivals} />}
        </div>
    );
}
