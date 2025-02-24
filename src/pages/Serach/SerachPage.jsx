import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { FestivalCards } from "./SearchFestivalData"; 
import searchFestival from "../../api/serachApi";
import { locationMap } from "../locationMap";

export default function SearchPage() {
    const [searchTerm, setSearchTerm] = useState(""); 
    const [filteredFestivals, setFilteredFestivals] = useState([]); 
    const [location, setLocation] = useState("0"); 
    const [contentTypeId, setContentTypeId] = useState("15"); // 기본값 설정
    const [festival, setFestivals] = useState([]); 

    useEffect(() => {
        const getFestivals = async () => {
            try {
                const data = await searchFestival({
                    keyword: "",    
                    numOfRows: 10,  
                    pageNo: 1       
                });
                console.log("API 응답 데이터:", data);
                setFestivals(data);
                setFilteredFestivals(data);
            } catch (error) {
                console.log("축제 데이터를 불러오는 중 오류 발생:", error.message);
            }
        };
        getFestivals();
    }, []);

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = async () => {
        try {
            const requestData = { 
                keyword: searchTerm && searchTerm.trim() !== "" ? searchTerm : undefined,  
                areaCode: location || undefined,  
                contentTypeId: contentTypeId || "15",  // 사용자가 선택한 contentTypeId 반영
                numOfRows: 20,              
                pageNo: 1,  
                arrange: "O"
            };
    
            console.log("보내는 요청 데이터:", requestData);  // 디버깅용 콘솔 출력
    
            const data = await searchFestival(requestData);
            setFilteredFestivals(data);
        } catch (error) {
            console.error("검색 요청 실패:", error.response?.data || error.message);
        }
    };
    
    const handleLocationChange = (event) => {
        setLocation(event.target.value);
    };

    const handleContentTypeChange = (event) => {
        setContentTypeId(event.target.value);
    };

    useEffect(() => {
        handleSearch();
    }, [location, contentTypeId]); // location, contentTypeId가 변경될 때 검색 실행

    return (
        <div style={{ padding: "20px" }}>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel>지역</InputLabel>
                <Select
                    value={location}
                    label="지역"
                    onChange={handleLocationChange} // 지역 선택 시 업데이트
                >
                    <MenuItem value="0">전체</MenuItem>
                    <MenuItem value="1">서울특별시</MenuItem>
                    <MenuItem value="2">인천광역시</MenuItem>
                    <MenuItem value="3">대전광역시</MenuItem>
                    <MenuItem value="4">대구광역시</MenuItem>
                    <MenuItem value="5">광주광역시</MenuItem>
                    <MenuItem value="6">부산광역시</MenuItem>
                    <MenuItem value="7">울산광역시</MenuItem>
                    <MenuItem value="8">세종특별자치시</MenuItem>
                    <MenuItem value="31">경기도</MenuItem>
                    <MenuItem value="32">강원도</MenuItem>
                    <MenuItem value="33">충청북도</MenuItem>
                    <MenuItem value="34">충청남도</MenuItem>
                    <MenuItem value="35">전라북도</MenuItem>
                    <MenuItem value="36">전라남도</MenuItem>
                    <MenuItem value="37">경상북도</MenuItem>
                    <MenuItem value="38">경상남도</MenuItem>
                    <MenuItem value="39">제주특별자치도</MenuItem>
                </Select>
            </FormControl>

            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel>타입</InputLabel>
                <Select
                    value={contentTypeId}
                    label="타입"
                    onChange={handleContentTypeChange} // 컨텐츠 타입 선택 시 업데이트
                >
                    <MenuItem value="12">관광지</MenuItem>
                    <MenuItem value="14">문화시설</MenuItem>
                    <MenuItem value="15">행사/공연/축제</MenuItem>
                </Select>
            </FormControl>

            <Box
                component="form"
                onSubmit={(e) => e.preventDefault()} 
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
                    value={searchTerm} 
                    onChange={handleInputChange}
                />
                <Button variant="contained" onClick={handleSearch}>
                    검색
                </Button>
            </Box>

            {filteredFestivals.length > 0 ? (
                <FestivalCards filteredFestivals={filteredFestivals} />
            ) : (
                <p style={{ textAlign: "center", marginTop: "20px" }}>검색 결과가 없습니다.</p>
            )}
        </div>
    );
}

/**
 * 키워드
 * 지역 코드
 * 축제 유형
 * 검색 키워드
 * pageNo
 * aeeange 정렬방식 : 제목순, 생성일순순
 */