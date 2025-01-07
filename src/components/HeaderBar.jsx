import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

export default function HeaderBar() {
  const [value, setValue] = React.useState(0); // 기본값 설정
  const navigate = useNavigate(); // React Router의 useNavigate 사용

  const handleChange = (event, newValue) => {
    setValue(newValue);

    // 각 Tab의 인덱스에 따라 경로 이동
    switch (newValue) {
      case 0:
        navigate("/search"); // 검색 페이지
        break;
      case 1:
        navigate("/calendar"); // 캘린더 페이지
        break;
      case 2:
        navigate("/map"); // 지도 페이지
        break;
      case 3:
        navigate("/mypage"); // 마이페이지
        break;
      case 4:
        navigate("/auth"); // 로그인/회원가입 페이지
        break;
      default:
        break;
    }
  };

  return (
    <div
      style={{
        display: "flex", // Flexbox 사용
        justifyContent: "center", // 가로 중앙 정렬
        alignItems: "center", // 세로 중앙 정렬
        backgroundColor: "#f5f5f5", // 배경색
        padding: "10px", // 패딩 추가
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="navigation tabs"
        centered
      >
        <Tab label={<SearchIcon />} />
        <Tab label="캘린더" />
        <Tab label="지도" />
        <Tab label="마이페이지" />
        <Tab label="로그인/회원가입" />
      </Tabs>
    </div>
  );
}
