import React, { useState, useEffect } from "react";
import MypageDelete from "./MypageDelete";
import { getCurrentUser, updateUser } from "../../api/userApi";
import { fetchUserId } from "../../api/user_idApi";
import "./MypageProfile.css";

function MypageProfile() {
  const [userData, setUserData] = useState(null);
  // 추가: 현재 비밀번호, 새 비밀번호, 확인 비밀번호 상태
  const [passwordData, setPasswordData] = useState({
    currentPw: "",
    newPw: "",
    newPwConfirm: "",
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("토큰을 찾을 수 없음");
          return;
        }

        const tokenData = await fetchUserId(token);
        const userId = typeof tokenData === "string" ? tokenData : tokenData.sub;
        if (!userId) {
          console.error("사용자 ID를 찾을 수 없음");
          return;
        }

        const data = await getCurrentUser(userId);
        if (data) setUserData(data);
      } catch (error) {
        console.error("사용자 정보를 불러오는 중 오류 발생:", error);
      }
    };

    fetchUserData();
  }, []);

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSavePassword = async () => {
    if (!userData) {
      alert("사용자 정보를 불러올 수 없습니다.");
      return;
    }
    // 현재 비밀번호 필드 확인
    if (passwordData.currentPw.trim().length === 0) {
      alert("현재 비밀번호를 입력해주세요.");
      return;
    }
    if (passwordData.newPw.length < 6) {
      alert("새 비밀번호는 최소 6자 이상이어야 합니다.");
      return;
    }
    if (passwordData.newPw !== passwordData.newPwConfirm) {
      alert("새 비밀번호와 확인 비밀번호가 일치하지 않습니다.");
      return;
    }
    try {
      // 백엔드가 기대하는 데이터 형식: { id, pw, new_pw }
      await updateUser(userData.id, {
        id: userData.id,
        pw: passwordData.currentPw,  // 현재 비밀번호
        new_pw: passwordData.newPw,  // 새 비밀번호
      });
      alert("비밀번호가 변경되었습니다!");
      setPasswordData({ currentPw: "", newPw: "", newPwConfirm: "" });
    } catch (error) {
      alert("비밀번호 변경 실패: " + error.message);
    }
  };

  if (!userData) {
    return <p>로딩 중...</p>;
  }

  return (
    <div className="mypage-profile-content">
      <div className="mypage-form">
      <h2>회원 정보 수정</h2>
      <div className="info-row">
        <label>이름</label>
        <p>{userData.username}</p>
      </div>
      <div className="info-row">
        <label>이메일</label>
        <p>{userData.email}</p>
      </div>
      <div className="info-row">
        <label>아이디</label>
        <p>{userData.id}</p>
      </div>

      {/* 비밀번호 변경 폼 */}
      <div className="password-section">
        <div className="password-group">
          <label>현재 비밀번호</label>
          <input
            type="password"
            name="currentPw"
            value={passwordData.currentPw}
            placeholder="현재 비밀번호"
            onChange={handlePasswordChange}
          />
        </div>
        <div className="password-group">
          <label>새 비밀번호</label>
          <input
            type="password"
            name="newPw"
            value={passwordData.newPw}
            placeholder="새 비밀번호"
            onChange={handlePasswordChange}
          />
        </div>
        <div className="password-group">
          <label>비밀번호 확인</label>
          <input
            type="password"
            name="newPwConfirm"
            value={passwordData.newPwConfirm}
            placeholder="비밀번호 확인"
            onChange={handlePasswordChange}
          />
        </div>
        <button className="save-password-btn" onClick={handleSavePassword}>
          비밀번호 저장
        </button>
      </div>
      <a className="delete-account-link" onClick={() => setShowDeleteModal(true)}>
        회원 탈퇴
      </a>
      {showDeleteModal && <MypageDelete closeModal={() => setShowDeleteModal(false)} />}
    </div>
    </div>
  );
}

export default MypageProfile;
