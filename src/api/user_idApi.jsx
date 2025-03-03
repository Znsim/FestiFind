import api from "./api";

export const fetchUserId = async (token) => {
    try {
        const response = await api.post(`/user/current_user?token=${token}`);
        console.log("📌 서버 응답:", response.data); // 응답 데이터 확인

        if (typeof response.data === "string") {
            return response.data;
        }

        if (typeof response.data === "object" && response.data.sub) {
            return response.data.sub;  // ✅ user_id를 sub에서 가져옴
        }

        return null;
    } catch (error) {
        console.error("❌ User ID 가져오기 실패:", error.response?.data || error.message);
        return null;
    }
};

