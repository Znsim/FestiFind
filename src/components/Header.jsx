import React from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate(); // 페이지 이동을 위한 Hook

    const handleLogoClick = () => {
        navigate("/"); // "/" 경로로 이동
    };

    return (
        <div
            style={{
                textAlign: "center",
                cursor: "pointer", // 클릭 가능한 UI로 표시
                fontSize: "24px",
                fontWeight: "bold",
                color: "blue", // 강조 색상
            }}
            onClick={handleLogoClick} // 클릭 이벤트
        >
            FestiFind
        </div>
    );
}
