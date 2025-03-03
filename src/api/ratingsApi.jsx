import api from "./api";

export const getRatings = async (userId) => {
  try {
    // user_id를 쿼리 파라미터로 전달합니다.
    const response = await api.post(`/ratings/get_rating_by_id?user_id=${userId}`);
    console.log("📌 리뷰 데이터 응답:", response.data);
    let data = response.data || [];
    // 만약 데이터가 배열이 아니라면 배열로 감싸기
    if (!Array.isArray(data)) {
      data = [data];
    }
    return data;
  } catch (error) {
    console.error("❌ 리뷰 데이터를 불러오는 중 오류 발생:", error.response?.data || error.message);
    return [];
  }
};
