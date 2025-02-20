import api from "./api";

// 회원 가입
export const registerUser = async (userData) => {
    try {
        const response = await api.post("/user/register", userData, {
            headers: {
                "Content-Type" : "application/json",
            }
        });
        return response.data;
    } catch (error) {
        console.error("회원가입 실패: ", error.response?.data || error.message);
        throw error;
    }
};

// ✅ 로그인 API
export const loginUser = async (userData) => {
    try {
        const response = await api.post("/user/login", userData);
        return response.data;
    } catch (error) {
        console.error("로그인 실패:", error.response?.data || error.message);
        throw error;
    }
};