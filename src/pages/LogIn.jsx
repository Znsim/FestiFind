import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // CSS 파일 불러오기
import festivalimg from "../assets/images/불꽃축제.jpg"
import naver from "../assets/images/네이버.png"
import kakaotalk from "../assets/images/카카오톡.png"
import google from "../assets/images/구글.png"

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === "" || password === "") {
      setUsernameError(username === "" ? "아이디를 입력해주세요" : "");
      setPasswordError(password === "" ? "비밀번호를 입력해주세요" : "");
      return;
    }

    //이부분은 나중에 백엔드 고치면서 수정 할 예정
    if (username !== "최수민") {
      setUsernameError("아이디가 존재하지 않습니다.");
      setPasswordError("");
    } else if (password !== "1234") {
      setPasswordError("비밀번호가 일치하지 않습니다.");
      setUsernameError("");
    } else {
      alert("로그인 성공!");
      navigate("/");
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
            <img src={naver} alt="네이버" />
            <img src={kakaotalk} alt="카카오톡" />
            <img src={google} alt="구글" />
          </div>
          <div className="login-links">
            <a href="/userregistration">회원가입</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
