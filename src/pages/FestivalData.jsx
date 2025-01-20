import festival1 from "../assets/images/festival1.jpeg";
import festival2 from "../assets/images/festival2.jpeg";
import festival3 from "../assets/images/festival3.jpeg";
import festival4 from "../assets/images/festival4.jpeg";
import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useNavigate } from "react-router-dom";
import { locationMap } from "./locationMap";


// 축제 정보
const festivals = [
    { id: 1, title: "가", image: festival1, date: "2025.01.01 ~ 2025.01.10", location: 1, outline: "축제 개요" },
    { id: 2, title: "나", image: festival2, date: "2025.02.01 ~ 2025.02.10", location: 6, outline: "축제 개요" },
    { id: 3, title: "다", image: festival3, date: "2025.03.01 ~ 2025.03.10", location: 4, outline: "축제 개요" },
    { id: 4, title: "라", image: festival4, date: "2025.04.01 ~ 2025.04.10", location: 6, outline: "축제 개요" },
];


// 축제 카드 렌더링 컴포넌트
export function FestivalCards({ filteredFestivals }) {
    const navigate = useNavigate(); // 페이지 이동을 위한 Hook

    const handleLogoClick = (id) => {
        navigate(`/festivalDetailPage/${id}`); // ID를 경로에 포함
    };

    return (
        <Grid container spacing={3} style={{ marginTop: "20px" }}>
            {filteredFestivals.map((festival) => (
                <Grid item xs={12} sm={6} md={4} key={festival.id}>
                    <Card
                        onClick={() => handleLogoClick(festival.id)} // ID 전달
                        style={{
                            boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
                            borderRadius: "8px",
                            overflow: "hidden",
                            cursor: "pointer",
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
                            <h2>{festival.title}</h2>
                            <p>{festival.date}</p>
                            <p>{locationMap[festival.location]}</p> {/* value값으로 지역텍스트 출력 */}
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}

export default festivals;
