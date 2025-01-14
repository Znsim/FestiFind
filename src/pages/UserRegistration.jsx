// 회원 가입

import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate import
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function UserRegistration() {
    // 상태 관리
    const [region, setRegion] = useState(''); // 관심 지역
    const [name, setName] = useState(''); // 이름
    const [id, setId] = useState(''); // 아이디
    const [password, setPassword] = useState(''); // 비밀번호
    const [confirmPassword, setConfirmPassword] = useState(''); // 비밀번호 확인
    const navigate = useNavigate(); // useNavigate 훅 사용

    // 관심 지역 변경 핸들러
    const handleRegionChange = (event) => {
        setRegion(event.target.value);
    };

    // 회원가입 버튼 클릭 핸들러
    const handleRegister = () => {
        // 데이터 저장 (예: 콘솔에 출력하거나 API 호출)
        console.log("회원 정보:");
        console.log("이름:", name);
        console.log("아이디:", id);
        console.log("비밀번호:", password);
        console.log("비밀번호 확인:", confirmPassword);
        console.log("관심 지역 코드:", region);

        if (password !== confirmPassword) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        // 여기서 API로 데이터를 전송하거나 로직을 추가할 수 있습니다.
        alert("회원가입 완료!");
        navigate("/"); // 메인 페이지로 이동
    };

    return (
        <Box
            component="form"
            sx={{
                display: 'flex',
                flexDirection: 'column', // 수직 정렬
                alignItems: 'center', // 수평 가운데 정렬
                justifyContent: 'center', // 수직 가운데 정렬
                height: '80vh', // 화면 전체 높이
                '& .MuiTextField-root': { m: 1, width: '25ch' }, // TextField 스타일
                '& .MuiFormControl-root': { m: 1, width: '25ch' } // FormControl 스타일
            }}
            noValidate
            autoComplete="off"
        >
            <h2>회원가입</h2>

            {/* 이름 입력 */}
            <TextField
                id="outlined-name"
                label="이름"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            {/* 아이디 입력 */}
            <TextField
                id="outlined-id"
                label="아이디"
                value={id}
                onChange={(e) => setId(e.target.value)}
            />

            {/* 비밀번호 입력 */}
            <TextField
                id="outlined-password"
                label="Password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            {/* 비밀번호 확인 입력 */}
            <TextField
                id="outlined-password-confirm"
                label="Password 중복 확인"
                type="password"
                autoComplete="current-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />

            {/* 관심 지역 선택 */}
            <FormControl>
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

            {/* 회원가입 버튼 */}
            <Stack spacing={2} direction="row">
                <Button variant="contained" onClick={handleRegister}>회원가입</Button>
            </Stack>
        </Box>
    );
}
