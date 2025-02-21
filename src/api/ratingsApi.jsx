import api from "./api";

export const getRatings = async (userId) => {
  try {
    const response = await api.post("/ratings/get_rating_by_id", { userId });
    return response.data; // [{ ratingId: 1, content: "축제 최고!" }, ...]
  } catch (error) {
    console.error("리뷰 데이터를 불러오는 중 오류 발생:", error);
    return [];
  }
};
