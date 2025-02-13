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
import { registerUser } from "../../api/userApi";
import { Password } from "@mui/icons-material";

export default function UserRegistration() {
    // 상태 관리
    const [region, setRegion] = useState(""); // 관심 지역
    const [username, setUsername] = useState(""); // 이름
    const [email,setEmail] = useState("") //이메일
    const [id, setId] = useState(""); // 아이디
    const [pw, setPw] = useState(""); // 비밀번호
    const [confirmPassword, setConfirmPassword] = useState(""); // 비밀번호 확인
    const [errors, setErrors] = useState({}); // 오류 메시지 상태
    const navigate = useNavigate();

    // 관심 지역 변경 핸들러
    const handleRegionChange = (event) => {
        setRegion(event.target.value);
        setErrors((prev) => ({ ...prev, region: "" })); // 관심 지역 오류 초기화
    };

    // 회원가입 버튼 클릭 핸들러
    const handleRegister = async () => {
        const newErrors = {};
        {/*정렬해야 함*/}
        if (!username) newErrors.username = "이름을 입력해주세요";
        if (!id) newErrors.id = "아이디를 입력해주세요";
        if (!email) newErrors.email = "이메일을 입력해주세요";
        if (!pw) newErrors.pw = "비밀번호를 입력해주세요";
        if (!confirmPassword) newErrors.confirmPassword = "일치하지 않습니다";
        if (pw !== confirmPassword) newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
        if (!region) newErrors.region = "관심 지역을 선택해주세요";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        //api 데이터 보내기기
       try{
            const userData = {
                username,
                email,
                id,
                pw,
                region,
            };

            
            const response = await registerUser(userData);
            //회원가입 성공했을 경우 이동
            if(response){
                console.log("회원가입 성공", response);
                alert("회원가입 완료");
                navigate("/");
            }
       }
       catch (error) {
        console.error("회원가입 실패:", error);
        alert("회원가입에 실패했습니다.");
    }
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
                        value={username}
                        type="text"
                        placeholder="이름 입력"
                        onChange={(e) => {
                            setUsername(e.target.value);
                            setErrors((prev) => ({ ...prev, username: "" }));
                        }}
                        error={!!errors.username}
                        sx={{ width: "300px" }}
                    />
                    {errors.username && <span style={errorStyle}>{errors.username}</span>}
                </div>

                {/*이메일 입력*/}
                <div style={formRowStyle}>
                        <TextField 
                            id = "outloned-name"
                            value={email}
                            type="text"
                            placeholder="이메일 입력"
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setErrors((prev) => ({...prev,email: "" }));
                            }}
                            error={!!errors.email}
                            sx={{width : "300px"}}
                        />
                        {errors.email && <span style={errorStyle}>{errors.email}</span>}
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
                        value={pw}
                        onChange={(e) => {
                            setPw(e.target.value);
                            setErrors((prev) => ({ ...prev, pw: "" }));
                        }}
                        error={!!errors.pw}
                        sx={{ width: "300px" }}
                    />
                    {errors.pw && <span style={errorStyle}>{errors.pw}</span>}
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
                             <MenuItem value={1}>서울특별시</MenuItem>
                            <MenuItem value={2}>인천광역시</MenuItem>
                            <MenuItem value={3}>대전광역시</MenuItem>
                            <MenuItem value={4}>대구광역시</MenuItem>
                            <MenuItem value={5}>광주광역시</MenuItem>
                            <MenuItem value={6}>부산광역시</MenuItem>
                            <MenuItem value={7}>울산광역시</MenuItem>
                            <MenuItem value={8}>세종특별자치시</MenuItem>
                            <MenuItem value={31}>경기도</MenuItem>
                            <MenuItem value={32}>강원도</MenuItem>
                            <MenuItem value={33}>충청북도</MenuItem>
                            <MenuItem value={34}>충청남도</MenuItem>
                            <MenuItem value={35}>전라북도</MenuItem>
                            <MenuItem value={36}>전라남도</MenuItem>
                            <MenuItem value={37}>경상북도</MenuItem>
                            <MenuItem value={38}>경상남도</MenuItem>
                            <MenuItem value={39}>제주특별자치도</MenuItem>
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
