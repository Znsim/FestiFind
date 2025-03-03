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

export default function SearchPage() {
    const [searchTerm, setSearchTerm] = useState(""); 
    const [filteredFestivals, setFilteredFestivals] = useState([]); 
    const [location, setLocation] = useState("0"); 
    const [contentTypeId, setContentTypeId] = useState("15"); 
    const [arrange, setArrange] = useState("A"); // 기본 정렬: 제목순

    // 검색 실행 함수
    const handleSearch = async () => {
        try {
            const today = new Date().toISOString().split('T')[0].replace(/-/g, ""); // YYYYMMDD 포맷

            let requestData = { 
                serviceKey: "YOUR_SERVICE_KEY",
                MobileOS: "ETC",  
                MobileApp: "FestSearchApp",  
                _type: "json",  
                eventStartDate: today,  
                listYN: "Y",  
                numOfRows: 20,  
                pageNo: 1,  
                arrange: arrange, // 선택한 정렬 기준 반영
                keyword: searchTerm.trim() ? searchTerm.trim() : "전체 축제"
            };

            // location 값이 "0"(전체)이 아닐 경우 areaCode 추가
            if (parseInt(location, 10) !== 0) {
                requestData.areaCode = location;
            }

            if (contentTypeId) {
                requestData.contentTypeId = String(contentTypeId);
            }

            // undefined 값 제거
            const filteredRequestData = Object.fromEntries(
                Object.entries(requestData).filter(([_, v]) => v !== undefined)
            );

            console.log("보내는 요청 데이터:", filteredRequestData);

            const data = await searchFestival(filteredRequestData);
            setFilteredFestivals(data);
        } catch (error) {
            console.error("검색 요청 실패:", error.response?.data || error.message);
        }
    };

    // 검색어 입력 변경
    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // 지역 선택 변경
    const handleLocationChange = (event) => {
        setLocation(event.target.value);
    };

    // 콘텐츠 타입 선택 변경
    const handleContentTypeChange = (event) => {
        setContentTypeId(event.target.value);
    };

    // 정렬 기준 선택 변경
    const handleArrangeChange = (event) => {
        setArrange(event.target.value);
    };

    // location, contentTypeId, arrange 변경 시 검색 실행
    useEffect(() => {
        const fetchData = async () => {
            await handleSearch();
        };
        fetchData();
    }, [location, contentTypeId, arrange]); 

    return (
        <div style={{ padding: "20px" }}>
            {/* 지역 선택 */}
            {/* <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel>지역</InputLabel>
                <Select
                    value={location}
                    label="지역"
                    onChange={handleLocationChange} 
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
            </FormControl> */}

            {/* 콘텐츠 타입 선택 */}
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel>타입</InputLabel>
                <Select
                    value={contentTypeId}
                    label="타입"
                    onChange={handleContentTypeChange} 
                >
                    <MenuItem value="12">관광지</MenuItem>
                    <MenuItem value="14">문화시설</MenuItem>
                    <MenuItem value="15">행사/공연/축제</MenuItem>
                </Select>
            </FormControl>

            {/* 정렬 방식 선택 */}
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel>정렬</InputLabel>
                <Select
                    value={arrange}
                    label="정렬"
                    onChange={handleArrangeChange} 
                >
                    <MenuItem value="A">제목순</MenuItem>
                    <MenuItem value="C">수정일순</MenuItem>
                    <MenuItem value="D">등록일순</MenuItem>
                </Select>
            </FormControl>

            {/* 검색어 입력 필드 & 검색 버튼 */}
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

            {/* 검색 결과 출력 */}
            {filteredFestivals.length > 0 ? (
                <FestivalCards filteredFestivals={filteredFestivals} />
            ) : (
                <p style={{ textAlign: "center", marginTop: "20px" }}>검색 결과가 없습니다.</p>
            )}
        </div>
    );
}
