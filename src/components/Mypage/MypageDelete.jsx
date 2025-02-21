import React from "react";

function MypageDelete({ closeModal }) {
  const handleDeleteAccount = () => {
    if (window.confirm("정말로 회원 탈퇴를 진행하시겠습니까?")) {
    //   fetch("백엔드_API_URL/delete-account", {
    //     method: "DELETE",
    //     headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    //   })
    //     .then(() => {
    //       alert("회원 탈퇴가 완료되었습니다.");
    //       localStorage.removeItem("token");
    //       window.location.href = "/login";
    //     })
    //     .catch((err) => console.error("회원 탈퇴 실패:", err));
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>회원 탈퇴</h3>
        <p>정말로 탈퇴하시겠습니까?</p>
        <button onClick={handleDeleteAccount}>탈퇴하기</button>
        <button onClick={closeModal}>취소</button>
      </div>
    </div>
  );
}

export default MypageDelete;
