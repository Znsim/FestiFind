import api from "./api";

export const fetchCalendar = async (year, month) => { 
    try {
        console.log(`🛰 API Request: Year = ${year}, Month = ${month}`); // ✅ 요청 로그 확인
        const response = await api.post("api/calendar", {
            Year: year,
            Month: month
        });
        console.log("✅ API Response Data:", response.data); // ✅ 백엔드에서 받은 데이터 로그 확인
        return response.data;
    } catch (error) {
        console.error("❌ Calendar API 오류:", error.response?.data || error.message);
        throw error;
    }
};
