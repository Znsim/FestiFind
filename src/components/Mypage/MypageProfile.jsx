import React, { useState } from "react";
import MypageDelete from "./MypageDelete";
import "./MypageProfile.css";
function MypageProfile() {
  // ✅ 가짜 유저 데이터 (백엔드 연결 없음)
  const [userData] = useState({
    username: "홍길동",
    email: "hong@example.com",
    id: "hong123",
  });

  const [passwordData, setPasswordData] = useState({ newPw: "", newPwConfirm: "" });
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSavePassword = () => {
    if (passwordData.newPw.length < 6) {
      alert("비밀번호는 최소 6자 이상이어야 합니다.");
      return;
    }
    if (passwordData.newPw !== passwordData.newPwConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    alert("비밀번호가 변경되었습니다! (현재는 저장되지 않음)");
    setPasswordData({ newPw: "", newPwConfirm: "" });
  };

  return (
    <div className="mypage-content">
      <div className="edit-user-info">
        <h2>회원 정보 수정</h2>
      </div>

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

      <div className="password-section">
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
  );
}

export default MypageProfile;
