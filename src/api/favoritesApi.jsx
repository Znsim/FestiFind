import api from "./api";

export const getFavorites = async (userId) => {
  try {
    // 쿼리 파라미터로 user_id 전달 (백엔드가 이를 받도록 설계됨)
    const response = await api.post(`/fevorites/get_rating_by_id?user_id=${userId}`);
    return response.data;
  } catch (error) {
    console.error("즐겨찾기 데이터를 불러오는 중 오류 발생:", error);
    return [];
  }
};
