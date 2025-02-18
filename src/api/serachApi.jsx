import api from "./api";

// 검색 (POST)
export const searchFestival = async (festivalData = {}) => {
    try {
        const requestData = {
            keyword: festivalData.keyword || "",   
            areaCode: festivalData.areaCode && festivalData.areaCode !== "" ? festivalData.areaCode : null, // 빈 값이면 null 처리
            contentTypeId: festivalData.contentTypeId && festivalData.contentTypeId !== "" ? festivalData.contentTypeId : "15", // 기본값 15 설정
            numOfRows: festivalData.numOfRows || 20,  
            pageNo: festivalData.pageNo || 1,
            arrange: festivalData.arrange || "O"
        };

        console.log("요청 데이터:", JSON.stringify(requestData, null, 2)); // 요청 데이터 로그 확인

        const response = await api.post("/api/SearchPage", requestData);
        return response.data;
    } catch (error) {
        console.error("SearchPage 오류:", error.response?.data || error.message);
        throw error;
    }
};

export default searchFestival;
