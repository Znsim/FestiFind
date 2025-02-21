import React, { useState } from "react";
import "./Mypage.css";
import MypageSidebar from "../../components/Mypage/MypageSidebar";
import MypageContent from "../../components/Mypage/MypageContent";

const Mypage = () => {
  const [selectedMenu, setSelectedMenu] = useState("");

  return (
    <div className="mypage-container">
      {/* Sidebar */}
      <div className="sidebar">
        <MypageSidebar setSelectedMenu={setSelectedMenu} />
      </div>

      {/* Content */}
      <div className="mypage-content">
        <MypageContent selectedMenu={selectedMenu} />
      </div>
    </div>
  );
};

export default Mypage;
