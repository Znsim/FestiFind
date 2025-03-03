// src/pages/User/Mypage.jsx
import React, { useState } from "react";
import * as jwtDecode from "jwt-decode"; // 전체 모듈로 불러오기
import "./Mypage.css";
import MypageSidebar from "../../components/Mypage/MypageSidebar";
import MypageContent from "../../components/Mypage/MypageContent";

const Mypage = () => {
  const [selectedMenu, setSelectedMenu] = useState("");

  // 로컬 스토리지의 토큰에서 로그인 시간을 추출
  const token = localStorage.getItem("token");
  let loginTime = "";
  if (token) {
    try {
      const decodeFn = jwtDecode.default || jwtDecode;
      const decoded = decodeFn(token);
      // iat는 초 단위이므로 밀리초로 변환 후 Date 객체로 생성
      if (decoded.iat) {
        loginTime = new Date(decoded.iat * 1000).toLocaleString();
      }
    } catch (error) {
      console.error("토큰 디코딩 오류:", error);
    }
  }

  return (
    <div className="mypage-container">
      {/* 왼쪽 사이드바 */}
      <div className="sidebar">
        <MypageSidebar setSelectedMenu={setSelectedMenu} />
      </div>

      {/* 오른쪽 컨텐츠 */}
      <div className="mypage-content">
        <div className="mypage-header">
          <p>로그인 시간: {loginTime || "정보 없음"}</p>
        </div>
        <MypageContent selectedMenu={selectedMenu} />
      </div>
    </div>
  );
};

export default Mypage;
