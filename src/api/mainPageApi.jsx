import api from "./api";

export const fetchMainPageData = async () => {
    try {
        const response = await api.get("api/MainPage");
        return response.data;
    } catch (error) {
        console.error("MainPage 오류:", error.response?.data || error.message);
        throw error;
    }
};

export default fetchMainPageData