import api from "./api";

export const getFavorites = async (userId) => {
  try {
    const response = await api.post("/fevorites/get_rating_by_id", { userId });
    return response.data; // [{ festivalId: 1, name: "불꽃축제" }, ...]
  } catch (error) {
    console.error("즐겨찾기 데이터를 불러오는 중 오류 발생:", error);
    return [];
  }
};
