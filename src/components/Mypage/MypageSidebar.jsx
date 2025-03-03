import React from "react";
import './MypageSidebar.css';

function MypageSidebar({ selectedMenu, setSelectedMenu }) {
  return (
    <div className="sidebar">
      <ul className="sidebar-list">
        <li 
          className={`sidebar-item ${selectedMenu === "회원 정보 수정" ? "active" : ""}`}
          onClick={() => setSelectedMenu("회원 정보 수정")}
        >
          회원 정보 수정
        </li>
        <li 
          className={`sidebar-item ${selectedMenu === "작성 리뷰 목록" ? "active" : ""}`}
          onClick={() => setSelectedMenu("작성 리뷰 목록")}
        >
          작성 리뷰 목록
        </li>
        <li 
          className={`sidebar-item ${selectedMenu === "즐겨찾기한 축제" ? "active" : ""}`}
          onClick={() => setSelectedMenu("즐겨찾기한 축제")}
        >
          즐겨찾기한 축제
        </li>
      </ul>
    </div>
  );
}

export default MypageSidebar;