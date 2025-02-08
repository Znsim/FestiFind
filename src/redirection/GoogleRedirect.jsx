import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const GoogleRedirection = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // URL에서 'code' 파라미터 추출
  const getUrlParameter = (name) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  };

  useEffect(() => {
    const code = getUrlParameter("code");  // URL에서 code 추출

    if (code) {
      // 백엔드로 'code'를 보내서 'access_token'을 받는 요청
      fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.access_token) {
            // access_token을 로컬 스토리지에 저장하거나, 상태 관리에 저장
            localStorage.setItem("access_token", data.access_token);
            // 사용자 정보 페이지로 리디렉션
            navigate("/");
          } else {
            setError("구글 로그인 실패. 다시 시도해주세요.");
          }
        })
        .catch((error) => {
          setError("서버와의 통신에 실패했습니다.");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setError("로그인 인증 실패. 다시 시도해주세요.");
      setLoading(false);
    }
  }, [navigate]);

  if (loading) {
    return <div>로그인 처리 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return <div>구글 로그인 완료!</div>;
};

export default GoogleRedirection;
