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
    const [location, setLocation] = useState(""); 
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
            const data = await searchFestival({ 
                keyword: searchTerm || "",  // 검색어가 없으면 빈 문자열
                areaCode: location || "",   // 지역 코드 추가
                contentTypeId: "15",        // 기본 축제 유형 (15: 축제·공연·행사)
                numOfRows: 20,              
                pageNo: 1,
                arrange: "O" // 제목순 정렬
            });
            setFilteredFestivals(data);
        } catch (error) {
            console.error("검색 요청 실패:", error);
        }
    };
    

    const handleLocationChange = async (event) => {
        const selectedLocation = event.target.value;
        setLocation(selectedLocation);
        
        try {
            const data = await searchFestival({ 
                keyword: searchTerm || "",  
                areaCode: locationMap[selectedLocation] ? selectedLocation : null, // 지역 코드 변환
                contentTypeId: "15",  
                numOfRows: 20, 
                pageNo: 1,
                arrange: "O"
            });
            setFilteredFestivals(data);
        } catch (error) {
            console.error("지역 검색 실패:", error);
        }
    };
    

    return (
        <div style={{ padding: "20px" }}>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel>지역</InputLabel>
                <Select
                    value={location}
                    label="지역"
                    onChange={handleLocationChange}
                >
                    <MenuItem value="서울특별시">서울특별시</MenuItem>
                    <MenuItem value="인천광역시">인천광역시</MenuItem>
                    <MenuItem value="대전광역시">대전광역시</MenuItem>
                    <MenuItem value="대구광역시">대구광역시</MenuItem>
                    <MenuItem value="광주광역시">광주광역시</MenuItem>
                    <MenuItem value="부산광역시">부산광역시</MenuItem>
                    <MenuItem value="울산광역시">울산광역시</MenuItem>
                    <MenuItem value="세종특별자치시">세종특별자치시</MenuItem>
                    <MenuItem value="경기도">경기도</MenuItem>
                    <MenuItem value="강원도">강원도</MenuItem>
                    <MenuItem value="충청북도">충청북도</MenuItem>
                    <MenuItem value="충청남도">충청남도</MenuItem>
                    <MenuItem value="전라북도">전라북도</MenuItem>
                    <MenuItem value="전라남도">전라남도</MenuItem>
                    <MenuItem value="경상북도">경상북도</MenuItem>
                    <MenuItem value="경상남도">경상남도</MenuItem>
                    <MenuItem value="제주특별자치도">제주특별자치도</MenuItem>
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
