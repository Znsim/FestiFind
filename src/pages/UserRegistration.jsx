import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export default function UserRegistration() {
    // 상태 관리
    const [region, setRegion] = useState(""); // 관심 지역
    const [name, setName] = useState(""); // 이름
    const [id, setId] = useState(""); // 아이디
    const [password, setPassword] = useState(""); // 비밀번호
    const [confirmPassword, setConfirmPassword] = useState(""); // 비밀번호 확인
    const [errors, setErrors] = useState({}); // 오류 메시지 상태
    const navigate = useNavigate();

    // 관심 지역 변경 핸들러
    const handleRegionChange = (event) => {
        setRegion(event.target.value);
        setErrors((prev) => ({ ...prev, region: "" })); // 관심 지역 오류 초기화
    };

    // 회원가입 버튼 클릭 핸들러
    const handleRegister = () => {
        const newErrors = {};
        {/*정렬해야 함*/}
        if (!name) newErrors.name = "이름을 입력해주세요";
        if (!id) newErrors.id = "아이디를 입력해주세요";
        if (!password) newErrors.password = "비밀번호를 입력해주세요";
        if (!confirmPassword) newErrors.confirmPassword = "비밀번호를 다시 입력해주세요";
        if (password !== confirmPassword) newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
        if (!region) newErrors.region = "관심 지역을 선택해주세요";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        alert("회원가입 완료!");
        navigate("/");
    };

    const formRowStyle = {
        display: "flex",
        alignItems: "center",
        marginBottom: "16px",
        position: "relative", // 상대 위치 설정
    };

    const errorStyle = {
        color: "red",
        position: "absolute",
        right: "-160px", // 텍스트 필드 오른쪽으로 고정된 위치
        fontSize: "12px",
    };

    
    return (
        <div>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "80vh",
                }}
            >
                <h2>회원가입</h2>

                {/* 이름 입력 */}
                <div style={formRowStyle}>
                    <TextField
                        id="outlined-name"
                        value={name}
                        type="text"
                        placeholder="이름 입력"
                        onChange={(e) => {
                            setName(e.target.value);
                            setErrors((prev) => ({ ...prev, name: "" }));
                        }}
                        error={!!errors.name}
                        sx={{ width: "300px" }}
                    />
                    {errors.name && <span style={errorStyle}>{errors.name}</span>}
                </div>

                {/* 아이디 입력 */}
                <div style={formRowStyle}>
                    <TextField
                        id="outlined-id"
                        placeholder="아이디 입력"
                        value={id}
                        onChange={(e) => {
                            setId(e.target.value);
                            setErrors((prev) => ({ ...prev, id: "" }));
                        }}
                        error={!!errors.id}
                        sx={{ width: "300px" }}
                    />
                    {errors.id && <span style={errorStyle}>{errors.id}</span>}
                </div>

                {/* 비밀번호 입력 */}
                <div style={formRowStyle}>
                    <TextField
                        id="outlined-password"
                        type="password"
                        autoComplete="current-password"
                        placeholder="비밀번호 입력"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setErrors((prev) => ({ ...prev, password: "" }));
                        }}
                        error={!!errors.password}
                        sx={{ width: "300px" }}
                    />
                    {errors.password && <span style={errorStyle}>{errors.password}</span>}
                </div>

                {/* 비밀번호 확인 입력 */}
                <div style={formRowStyle}>
                    <TextField
                        id="outlined-password-confirm"
                        type="password"
                        autoComplete="current-password"
                        placeholder="비밀번호 다시 입력"
                        value={confirmPassword}
                        onChange={(e) => {
                            setConfirmPassword(e.target.value);
                            setErrors((prev) => ({ ...prev, confirmPassword: "" }));
                        }}
                        error={!!errors.confirmPassword}
                        sx={{ width: "300px" }}
                    />
                    {errors.confirmPassword && <span style={errorStyle}>{errors.confirmPassword}</span>}
                </div>

                {/* 관심 지역 선택 */}
                <div style={formRowStyle}>
                    <FormControl error={!!errors.region} sx={{ width: "300px" }}>
                        <InputLabel id="region-select-label">관심 지역</InputLabel>
                        <Select
                            labelId="region-select-label"
                            id="region-select"
                            value={region}
                            label="관심 지역"
                            onChange={handleRegionChange}
                        >
                            <MenuItem value={10}>서울특별시</MenuItem>
                            <MenuItem value={20}>인천광역시</MenuItem>
                            <MenuItem value={30}>대전광역시</MenuItem>
                            <MenuItem value={40}>대구광역시</MenuItem>
                            <MenuItem value={50}>울산광역시</MenuItem>
                            <MenuItem value={60}>부산광역시</MenuItem>
                            <MenuItem value={70}>광주광역시</MenuItem>
                            <MenuItem value={80}>세종특별자치시</MenuItem>
                            <MenuItem value={90}>경기도</MenuItem>
                            <MenuItem value={100}>강원도</MenuItem>
                            <MenuItem value={110}>충청북도</MenuItem>
                            <MenuItem value={120}>충청남도</MenuItem>
                            <MenuItem value={130}>전라북도</MenuItem>
                            <MenuItem value={140}>전라남도</MenuItem>
                            <MenuItem value={150}>경상북도</MenuItem>
                            <MenuItem value={160}>경상남도</MenuItem>
                            <MenuItem value={170}>제주특별자치도</MenuItem>
                        </Select>
                    </FormControl>
                    {errors.region && <span style={errorStyle}>{errors.region}</span>}
                </div>

                {/* 회원가입 버튼 */}
                <Stack spacing={2} direction="row">
                    <Button variant="contained" onClick={handleRegister}>
                        회원가입
                    </Button>
                </Stack>
            </Box>
        </div>
    );
}
