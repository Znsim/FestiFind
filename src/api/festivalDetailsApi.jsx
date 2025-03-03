import api from "./api";

export const festivalDetailPageApi = async (params) => {
    try {
        const response = await api.post("/api/festivaldetails",params);
        return response.data;
        
    } catch (error) {
        console.error("Api 오류:", error.response?.data || error.message);
        throw error;
    }
};

export default festivalDetailPageApi