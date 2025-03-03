// src/pages/User/Mypage.jsx
import React, { useState } from "react";
import "./Mypage.css";
import MypageSidebar from "../../components/Mypage/MypageSidebar";
import MypageContent from "../../components/Mypage/MypageContent";

const Mypage = () => {
  const [selectedMenu, setSelectedMenu] = useState("");

  return (
    <div className="mypage-container">
      {/* 왼쪽 사이드바 */}
      <div className="sidebar">
        <MypageSidebar setSelectedMenu={setSelectedMenu} />
      </div>

      {/* 오른쪽 컨텐츠 */}
      <div className="mypage-content">
        <MypageContent selectedMenu={selectedMenu} />
      </div>
    </div>
  );
};

export default Mypage;
