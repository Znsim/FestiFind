import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate, useLocation } from "react-router-dom";

export default function HeaderBar() {
  const navigate = useNavigate();
  const location = useLocation();

  // 초기 상태를 URL 경로에 따라 설정
  const getInitialValue = () => {
    switch (location.pathname) {
      case "/search":
        return 0;
      case "/calendar":
        return 1;
      case "/map":
        return 2;
      case "/mypage":
        return 3;
      case "/auth":
        return 4;
      default:
        return -1; // 메인 페이지 등 기타 경로
    }
  };

  const [value, setValue] = React.useState(getInitialValue);

  // URL 경로와 Tabs의 value 상태를 동기화
  React.useEffect(() => {
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
      case "/auth":
        setValue(4);
        break;
      default:
        setValue(-1); // 기타 경로
        break;
    }
  }, [location.pathname]);

  // 탭 변경 시 경로 이동
  const handleChange = (event, newValue) => {
    setValue(newValue);

    switch (newValue) {
      case 0:
        navigate("/search", { replace: true }); // 강제 이동
        break;
      case 1:
        navigate("/calendar");
        break;
      case 2:
        navigate("/map");
        break;
      case 3:
        navigate("/mypage");
        break;
      case 4:
        navigate("/userregistration");
        break;
      default:
        break;
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
        value={value === -1 ? false : value} // -1인 경우 탭 선택 해제
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
