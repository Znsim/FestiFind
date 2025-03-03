import api from "./api";

export const saveReview = async ({ contentId, contentTypeId, user_id, rating, title }) => {
    try {
        const response = await api.post("/ratings/WirteRating", {  
            contentId: Number(contentId) || 0,  
            contentTypeId: Number(contentTypeId) || 0,  
            user_id,  
            title,  
            rating: Math.min(5, Math.max(1, Number(rating) || 1)),  
        });

        return response.data;
    } catch (error) {
        console.error("리뷰 저장 실패:", error.response?.data || error.message);
        throw error;
    }
};
