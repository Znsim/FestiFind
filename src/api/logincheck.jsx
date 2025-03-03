import api from "./api";

// 로그인 상태 확인 API
export const checkLoginStatus = () => {
    const token = localStorage.getItem("token"); // ✅ JWT 토큰 가져오기
    return token ? { isAuthenticated: true } : { isAuthenticated: false };
};


export default checkLoginStatus;