import { jwtDecode } from "jwt-decode"; // ✅ named import 사용

export const getUserIdFromToken = () => {
    const token = localStorage.getItem("token"); // ✅ 저장된 JWT 토큰 가져오기
    if (!token) return null;

    try {
        const decoded = jwtDecode(token); // ✅ JWT 디코딩
        console.log("디코딩된 토큰:", decoded); // ✅ 디버깅용 로그 추가
        return decoded.user_id || decoded.id || decoded.userId; // ✅ 필드명 확인 필요
    } catch (error) {
        console.error("토큰 디코딩 실패:", error);
        return null;
    }
};

export const getUserId = () => {
    const userId = localStorage.getItem("user_id"); // ✅ 저장된 user_id 가져오기
    console.log("불러온 사용자 ID:", userId); // ✅ 디버깅 로그 추가
    return userId;
};
