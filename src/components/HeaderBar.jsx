import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate, useLocation } from "react-router-dom";

export default function HeaderBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState(-1);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token")); // 로그인 상태 확인

  // 초기 value 설정
  useEffect(() => {
    switch (location.pathname) {
      case "/search":
        setValue(0);
        break;
      case "/calendar":
        setValue(1);
        break;
      case "/map":
        setValue(2);
        break;
      case "/mypage":
        setValue(3);
        break;
      case "/login":
        setValue(4);
        break;
      case "/signup":
        setValue(5);
        break;
      default:
        setValue(-1);
        break;
    }
    setIsLoggedIn(!!localStorage.getItem("token")); // 로그인 상태 갱신
  }, [location.pathname]);

  // 탭 변경 시 경로 이동
  const handleChange = (event, newValue) => {
    setValue(newValue);
  
    if (newValue === 4) {
      if (isLoggedIn) {
        // ✅ 로그아웃 처리
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        navigate("/login");
      } else {
        navigate("/login");
      }
    } else if (newValue === 5) {
      navigate("/signup");
    } else {
      const paths = ["/search", "/calendar", "/map", "/mypage"];
  
      // ✅ 마이페이지 클릭 시 로그인 체크
      if (newValue === 3 && !isLoggedIn) {
        alert("로그인이 필요한 페이지입니다.");
        navigate("/login");
        return;
      }
  
      navigate(paths[newValue]);
    }
  };
  

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        padding: "10px",
      }}
    >
      <Tabs
        value={value === -1 ? false : value}
        onChange={handleChange}
        aria-label="navigation tabs"
        centered
      >
        <Tab label={<SearchIcon />} />
        <Tab label="캘린더" />
        <Tab label="지도" />
        <Tab label="마이페이지" />
        <Tab label={isLoggedIn ? "로그아웃" : "로그인"} /> {/* 로그인 상태에 따라 변경 */}
        <Tab label="회원가입" />
      </Tabs>
    </div>
  );
}
