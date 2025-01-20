import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import festivals, { FestivalCards } from "./FestivalData"; // FestivalCards 가져오기

export default function SearchPage() {
    const [searchTerm, setSearchTerm] = useState(""); // 검색어 초기 값
    const [filteredFestivals, setFilteredFestivals] = useState(festivals); // 필터링 처리
    const [location, setLocation] = useState(""); // 지역 선택 값

    // 검색어 변경 처리
    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // 검색 버튼 클릭 처리
    const handleSearch = () => {
        const filtered = searchTerm.trim()
            ? festivals.filter((festival) =>
                  festival.title.toLowerCase().includes(searchTerm.toLowerCase())
              )
            : festivals;
        setFilteredFestivals(filtered);
    };

    // 지역 선택 변경 처리
    const handleLocationChange = (event) => {
        const selectedLocation = event.target.value;
        setLocation(selectedLocation);
    
        // 지역 값에 따라 필터링
        const filtered = selectedLocation
            ? festivals.filter((festival) => festival.location === selectedLocation)
            : festivals; // 지역 값이 없을 경우 전체 축제 표시
    
        setFilteredFestivals(filtered); // 필터링된 데이터를 상태에 저장
    };
    

    return (
        <div style={{ padding: "20px" }}>
            {/* 지역 선택 필드 */}
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel>지역</InputLabel>
                <Select
                    value={location}
                    label="지역"
                    onChange={handleLocationChange} // 지역 변경 시 처리
                >
                            <MenuItem value={1}>서울특별시</MenuItem>
                            <MenuItem value={2}>인천광역시</MenuItem>
                            <MenuItem value={3}>대전광역시</MenuItem>
                            <MenuItem value={4}>대구광역시</MenuItem>
                            <MenuItem value={5}>광주광역시</MenuItem>
                            <MenuItem value={6}>부산광역시</MenuItem>
                            <MenuItem value={7}>울산광역시</MenuItem>
                            <MenuItem value={8}>세종특별자치시</MenuItem>
                            <MenuItem value={31}>경기도</MenuItem>
                            <MenuItem value={32}>강원도</MenuItem>
                            <MenuItem value={33}>충청북도</MenuItem>
                            <MenuItem value={34}>충청남도</MenuItem>
                            <MenuItem value={35}>전라북도</MenuItem>
                            <MenuItem value={36}>전라남도</MenuItem>
                            <MenuItem value={37}>경상북도</MenuItem>
                            <MenuItem value={38}>경상남도</MenuItem>
                            <MenuItem value={39}>제주특별자치도</MenuItem>
                </Select>
            </FormControl>

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

            {/* 축제 카드 컴포넌트 호출 */}
            <FestivalCards filteredFestivals={filteredFestivals} />
        </div>
    );
}
