import api from "./api";

// 검색 (POST)
export const searchFestival = async (festivalData) => {
    try {
        const response = await api.post("/api/SearchPage", festivalData);
        return response.data;
    } catch (error) {
        console.error("SearchPage 오류:", error.response?.data || error.message);
        throw error;
    }
};
export default searchFestival;
