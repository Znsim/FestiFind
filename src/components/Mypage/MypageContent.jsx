import React from "react";
import MypageProfile from "./MypageProfile";
import MypageFavorites from "./MypageFavorites";
import MypageReviews from "./MypageReviews";

function MypageContent({ selectedMenu }) {
  return (
    <div className="mypage-content">
      {selectedMenu === "회원 정보 수정" && <MypageProfile />}
      {selectedMenu === "즐겨찾기한 축제" && <MypageFavorites />}
      {selectedMenu === "작성 리뷰 목록" && <MypageReviews />}
      {selectedMenu === "알림 설정 목록" && <MypageNotifications />}
    </div>
  );
}

export default MypageContent;
