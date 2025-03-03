import React from "react";
import { deleteUser } from "../../api/userApi";

function MypageDelete({ closeModal }) {
  const handleDeleteAccount = async () => {
    try {
      const userId = localStorage.getItem("user_id");
      if (!userId) {
        alert("사용자 정보가 없습니다.");
        return;
      }
      const confirmDelete = window.confirm("정말로 회원 탈퇴를 진행하시겠습니까?");
      if (!confirmDelete) return;

      await deleteUser(userId);
      alert("회원 탈퇴가 완료되었습니다.");
      localStorage.removeItem("token");
      localStorage.removeItem("user_id");
      window.location.href = "/login";
    } catch (error) {
      console.error("회원 탈퇴 실패:", error);
      alert("회원 탈퇴에 실패했습니다.");
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>회원 탈퇴</h3>
        <p>정말로 탈퇴하시겠습니까?</p>
        <div className="button-container">
          <button onClick={handleDeleteAccount}>탈퇴하기</button>
          <button onClick={closeModal}>취소</button>
        </div>
      </div>
    </div>
  );
}

export default MypageDelete;
