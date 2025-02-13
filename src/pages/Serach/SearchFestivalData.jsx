import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useNavigate } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import {searchFestival} from "../../api/serachApi";
import { useState,useEffect } from "react";


const MAX_TITLE_LENGTH = 20;


// 축제 카드 렌더링 컴포넌트
export function FestivalCards({ filteredFestivals = [] }) {
    const navigate = useNavigate(); // 페이지 이동을 위한 Hook
    const [festivals, setFestivals] = useState([]); //API 데이터 상태

    //API
    useEffect(()=>{
        
        const getFestivals = async () => {
            try {
                const festivalData = {};
                const data = await searchFestival(festivalData);
                console.log("API응답 데이터",data);
                setFestivals(data);
            }catch (error) {
                console.log("축제 데이터를 불러오는 중 오류 발생 : ",error.message);
            }
        };
        getFestivals();
    },[]);


    const handleLogoClick = (id) => {
        navigate(`/festivalDetailPage/${id}`); // ID를 경로에 포함
    };

    return (
        <Grid container spacing={3} style={{ marginTop: "20px" }}>
            {filteredFestivals.map((festival) => {
                 const truncatedTitle =
                 festival.title.length > MAX_TITLE_LENGTH
                     ? festival.title.slice(0, MAX_TITLE_LENGTH) + "..."
                     : festival.title;
                return (
                <Grid item xs={12} sm={6} md={4} key={festival.id}>
                    <Card
                        onClick={() => handleLogoClick(festival.idcontent)} // ID 전달
                        style={{
                            boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
                            borderRadius: "8px",
                            overflow: "hidden",
                            cursor: "pointer",
                        }}
                    >
                        <img
                            src={festival.firstimage || "https://via.placeholder.com/300"}
                            alt={festival.title}
                            style={{
                                width: "100%",
                                height: "150px",
                                objectFit: "cover",
                            }}
                        />
                        <CardContent>
                            <Tooltip title={festival.title} arrow>
                                    <h2 style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                        {truncatedTitle}
                                    </h2>
                                </Tooltip>
                            <p>{festival.eventstartdate} ~ {festival.eventenddate}</p>
                            <p>{festival.addr1}</p>
                        </CardContent>
                    </Card>
                </Grid>
                );
            })}
        </Grid>
    );
}

export default FestivalCards;
