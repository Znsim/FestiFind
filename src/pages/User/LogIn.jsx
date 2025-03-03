import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import festivalimg from "../../assets/images/불꽃축제.jpg";

import naver from "../../assets/images/네이버.png";
import kakaotalk from "../../assets/images/카카오.png";
import google from "../../assets/images/구글.png";
import { loginUser } from "../../api/userApi"; // userApi의 loginUser 함수 사용
import { fetchUserId } from "../../api/user_idApi"; // 토큰에서 user_id 추출

const KAKAO_REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
const KAKAO_REDIRECT_URI = "http://localhost:5173/authkakao";
const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

const NAVER_CLIENT_ID = import.meta.env.VITE_NAVER_CLIENT_ID;
const NAVER_REDIRECT_URI = "http://localhost:5173/naver/callback";
const NAVER_STATE = import.meta.env.VITE_NAVER_STATE;
const naverURL = `https://nid.naver.com/oauth2.0/authorize?client_id=${NAVER_CLIENT_ID}&redirect_uri=${NAVER_REDIRECT_URI}&response_type=code&state=${NAVER_STATE}`;

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const GOOGLE_REDIRECT_URI = "http://localhost:5173/google/callback";
const GOOGLE_STATE = import.meta.env.VITE_GOOGLE_STATE;
const googleURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=openid%20profile%20email`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  // 소셜 로그인 함수들
  const handleKakaoLogin = () => {
    window.location.href = kakaoURL;
  };

  const handleNaverLogin = () => {
    window.location.href = naverURL;
  };

  const handleGoogleLogin = () => {
    window.location.href = googleURL;
  };

  // 일반 로그인 처리
  const handleLogin = async () => {
    setUsernameError("");
    setPasswordError("");

    if (!username || !password) {
      setUsernameError(!username ? "아이디를 입력해주세요" : "");
      setPasswordError(!password ? "비밀번호를 입력해주세요" : "");
      return;
    }

    try {
      const response = await loginUser({ id: username, pw: password });
      const token = response.access_token;
      console.log("로그인 응답 토큰:", token);
      if (!token) {
        alert("로그인 실패: 토큰이 없습니다.");
        return;
      }
      localStorage.setItem("token", token);
      const sub = await fetchUserId(token);
      console.log("토큰에서 추출한 user_id:", sub);
      if (sub) {
        localStorage.setItem("user_id", sub);
      }
      alert("로그인 성공!");
      navigate("/");
    } catch (error) {
      if (error.response?.status === 404) {
        setUsernameError("아이디가 존재하지 않습니다.");
      } else if (error.response?.status === 401) {
        setPasswordError("비밀번호가 일치하지 않습니다.");
      } else {
        alert("로그인 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="login-image-container">
          <img src={festivalimg} alt="로그인 이미지" />
        </div>
        <div className="login-form-container">
          <h2>로그인</h2>
          <input
            type="text"
            className="login-input"
            placeholder="아이디를 입력해주세요"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {usernameError && <div className="error-message">{usernameError}</div>}
          <input
            type="password"
            className="login-input"
            placeholder="비밀번호를 입력해주세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && <div className="error-message">{passwordError}</div>}
          <button className="login-button" onClick={handleLogin}>
            로그인
          </button>
          <div className="social-login-divider">
            <div className="line"></div>
            <span>간편한 로그인</span>
            <div className="line"></div>
          </div>
          <div className="social-login-icons">
            <img src={naver} alt="네이버" onClick={handleNaverLogin} />
            <img src={kakaotalk} alt="카카오톡" onClick={handleKakaoLogin} />
            <img src={google} alt="구글" onClick={handleGoogleLogin} />
          </div>
          <div className="login-links">
            <a href="/signup">회원가입</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
