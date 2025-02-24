import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import festivalimg from "../../assets/images/불꽃축제.jpg";
import { registerUser } from "../../api/userApi";

export default function UserRegistration() {
    const [region, setRegion] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    // ✅ 이메일 형식 검증 함수
    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // `@`과 `.` 포함 여부 확인
    };

    // ✅ 아이디 및 이메일 중복 체크 함수
    const checkDuplicate = async (field, value) => {
        if (!value) return;
        try {
            const response = await fetch(
                `https://port-O-festifindcon-m5h20ajhfe0ec0f1.sel4.cloudtype.app/user/check-duplicate?${field}=${value}`,
                { method: "GET", headers: { "Content-Type": "application/json" } }
            );
            const data = await response.json();
            if (data.exists) {
                setErrors((prev) => ({ ...prev, [field]: `${field === "id" ? "아이디가" : "이메일이"} 중복됩니다.` }));
            } else {
                setErrors((prev) => ({ ...prev, [field]: "" }));
            }
        } catch (error) {
            console.error(`${field} 중복 확인 실패`, error);
        }
    };

    // ✅ 아이디 및 이메일 입력 시 자동 중복 체크 실행
    useEffect(() => {
        if (id) {
            const delayDebounce = setTimeout(() => checkDuplicate("id", id), 500);
            return () => clearTimeout(delayDebounce);
        }
    }, [id]);

    useEffect(() => {
        if (email) {
            const delayDebounce = setTimeout(() => {
                if (!validateEmail(email)) {
                    setErrors((prev) => ({ ...prev, email: "이메일 형식이 올바르지 않습니다. (@, . 포함 필요)" }));
                } else {
                    checkDuplicate("email", email);
                }
            }, 500);
            return () => clearTimeout(delayDebounce);
        }
    }, [email]);

    const handleRegionChange = (event) => {
        setRegion(event.target.value);
        setErrors((prev) => ({ ...prev, region: "" }));
    };

    const handleRegister = async () => {
        const newErrors = {};
        
        if (!username) newErrors.username = "이름을 입력해주세요.";
        if (!id) newErrors.id = "아이디를 입력해주세요.";
        if (!email) newErrors.email = "이메일을 입력해주세요.";
        else if (!validateEmail(email)) newErrors.email = "이메일 형식이 올바르지 않습니다. (@, . 포함 필요)";
        if (!pw) newErrors.pw = "비밀번호를 입력해주세요.";
        if (!confirmPassword) newErrors.confirmPassword = "비밀번호 확인을 입력해주세요.";
        if (pw !== confirmPassword) newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
        if (!region) newErrors.region = "관심 지역을 선택해주세요.";

        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return;

        const userData = { username, email, id, pw, region };

        try {
            const response = await registerUser(userData);
            if (response) {
                alert("회원가입 완료!");
                navigate("/");
            }
        } catch (error) {
            alert("회원가입에 실패했습니다.");
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-content">
                <div className="signup-image-container">
                    <img src={festivalimg} alt="회원가입 이미지" />
                </div>
                <div className="signup-form-container">
                    <h2>회원가입</h2>
                    <div className="signup-grid">
                    <div className="input-wrapper">
                            <input type="text" className={`signup-input ${errors.id ? "error-border" : ""}`} 
                                   value={id} onChange={(e) => setId(e.target.value)}
                                   placeholder="아이디 입력" />
                            {errors.id && <div className="error-text">{errors.id}</div>}
                        </div>
                        <div className="input-wrapper">
                            <input type="text" className={`signup-input ${errors.email ? "error-border" : ""}`} 
                                   value={email} onChange={(e) => setEmail(e.target.value)}
                                   placeholder="이메일 입력" />
                            {errors.email && <div className="error-text">{errors.email}</div>}
                        </div>
                       
                        <div className="input-wrapper">
                            <input type="password" className={`signup-input ${errors.pw ? "error-border" : ""}`} 
                                   value={pw} onChange={(e) => setPw(e.target.value)}
                                   placeholder="비밀번호 입력" />
                            {errors.pw && <div className="error-text">{errors.pw}</div>}
                        </div>
                        <div className="input-wrapper">
                            <input type="password" className={`signup-input ${errors.confirmPassword ? "error-border" : ""}`} 
                                   value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                                   placeholder="비밀번호 확인" />
                            {errors.confirmPassword && <div className="error-text">{errors.confirmPassword}</div>}
                        </div>
                        <div className="input-wrapper">
                            <input type="text" className={`signup-input ${errors.username ? "error-border" : ""}`} 
                                   value={username} onChange={(e) => setUsername(e.target.value)}
                                   placeholder="이름 입력" />
                            {errors.username && <div className="error-text">{errors.username}</div>}
                        </div>
                        <div className="input-wrapper">
                            <select className="signup-input" value={region} onChange={handleRegionChange}>
                                <option value="">관심 지역 선택</option>
                                <option value="서울">서울특별시</option>
                                <option value="부산">부산광역시</option>
                                <option value="대구">대구광역시</option>
                                <option value="인천">인천광역시</option>
                                <option value="광주">광주광역시</option>
                                <option value="대전">대전광역시</option>
                                <option value="울산">울산광역시</option>
                                <option value="세종">세종특별자치시</option>
                            </select>
                            {errors.region && <div className="error-text">{errors.region}</div>}
                        </div>
                    </div>
                    <button className="signup-button" onClick={handleRegister}>
                        회원가입
                    </button>
                </div>
            </div>
        </div>
    );
}
