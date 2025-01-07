import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import festivals from "./FestivalData";

export default function SearchPage() {
    const [searchTerm, setSearchTerm] = useState(""); // 검색어 초기 값 (빈 문자열)
    const [filteredFestivals, setFilteredFestivals] = useState(festivals); // 필터링 처리

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = () => {
        const filtered = searchTerm.trim()
            ? festivals.filter((festival) =>
                  festival.title.toLowerCase().includes(searchTerm.toLowerCase())
              )
            : festivals;
        setFilteredFestivals(filtered);
    };

    return (
        <div style={{ padding: "20px" }}>
            {/* 검색 필드와 버튼 */}
            <Box
                component="form"
                onSubmit={(e) => e.preventDefault()} // 새로고침 방지
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "10px",
                }}
            >
                <TextField
                    id="outlined-basic"
                    variant="outlined"
                    style={{ width: "300px" }}
                    onChange={handleInputChange}
                />
                <Button variant="contained" onClick={handleSearch}>
                    검색
                </Button>
            </Box>

            {/* 축제 카드 목록 */}
            <Grid container spacing={3} style={{ marginTop: "20px" }}>
                {filteredFestivals.map((festival) => (
                    <Grid item xs={12} sm={6} md={4} key={festival.id}>
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
                                <h2>{festival.title}</h2>
                                <p>{festival.date}</p>
                                <p>{festival.location}</p>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}
