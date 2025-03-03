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
        
        // ✅ API 응답에서 user_id 가져와 저장
        const { access_token, user_id } = response.data;

        if (access_token) {
            localStorage.setItem("token", access_token); // ✅ JWT 토큰 저장
            localStorage.setItem("user_id", user_id); // ✅ user_id 저장
            console.log("저장된 사용자 ID:", user_id); // ✅ 확인용 로그
        }

        return response.data;
    } catch (error) {
        console.error("로그인 실패:", error.response?.data || error.message);
        throw error;
    }
};

// userApi.jsx
export const deleteUser = async (id) => {
    try {
      const response = await api.delete(`/user/delete_Id/${id}`, { data: { id } });
      return response.data;
    } catch (error) {
      console.error("회원 탈퇴 실패: ", error.response?.data || error.message);
      throw error;
    }
  };
  
  
export const updateUser = async (id, userData) => {
    try {
        const response = await api.put(`/user/update_user/${id}`, userData); // 수정된 부분
        return response.data;
    } catch (error) {
        console.error("회원 정보 수정 실패: ", error.response?.data || error.message);
        throw error;
    }
};

export const getCurrentUser = async (userId) => {
    if (!userId) {
      console.error("사용자 ID가 존재하지 않습니다.");
      return null;
    }
    try {
      const response = await api.post(`/user/get_user_by_id?id=${userId}`);
      return response.data;
    } catch (error) {
      console.error("사용자 정보를 불러오는 중 오류 발생:", error.response?.data || error.message);
      return null;
    }
  };
  
  

