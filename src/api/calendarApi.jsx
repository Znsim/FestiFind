import api from "./api";

// 캘린더 데이터 가져오기 (GET)
export const fetchCalendar = async () => {
    try {
        const response = await api.get("api/캘린더");
        return response.data;
    } catch (error) {
        console.error("Calendar 오류:", error.response?.data || error.message);
        throw error;
    }
};

//POST는 없어도 될 듯 한데
// 캘린더에 새로운 데이터 추가 (POST)
export const addCalendarEvent = async (festivalData) => {
    try {
        const response = await api.post("api/캘린더", festivalData);
        return response.data;
    } catch (error) {
        console.error("Calendar 오류:", error.response?.data || error.message);
        throw error;
    }
};
