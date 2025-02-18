import React, { useState } from "react";
import { useParams } from "react-router-dom";
import festivals from "./Main/MainFestivalData";
import { locationMap } from "./locationMap";
import { CardMedia, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import Rating from "@mui/material/Rating";
import EditIcon from "@mui/icons-material/Edit";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Input from '@mui/material/Input';


export default function FestivalDetailPage() {
    const { id } = useParams(); // URL에서 id 가져오기
    const festival = festivals.find((f) => f.id === parseInt(id, 10)); // id로 데이터 찾기

    if (!festival) {
        return <p>축제를 찾을 수 없습니다.</p>;
    }

    const [isFavorite, setIsFavorite] = useState(false); // 즐겨찾기 상태
    const [isNotified, setIsNotified] = useState(false); // 알림 설정 상태
    const [isDialogOpen, setIsDialogOpen] = useState(false); // 모달 상태
    const [review, setReview] = useState(""); // 리뷰 내용
    const [rating, setRating] = useState(0); // 별점 상태
    const [inputCount, setInputCount] = useState(0); //글자

    // 리뷰 작성 모달 열기/닫기
    const handleDialogOpen = () => setIsDialogOpen(true);
    const handleDialogClose = () => setIsDialogOpen(false);

    // 즐겨찾기 토글
    const toggleFavorite = () => {
        setIsFavorite((prev) => !prev);
    };

    // 알림 설정 토글
    const toggleNotification = () => {
        setIsNotified((prev) => !prev);
    };

    // 리뷰 저장
    const handleReviewSave = () => {
        console.log("Review:", review); // 리뷰 저장 처리
        console.log("Rating:", rating); // 별점 저장 처리
        setReview(""); // 리뷰 초기화
        setRating(0); // 별점 초기화
        handleDialogClose(); // 모달 닫기
    };

    //글자 수 제한
    const onInputHandler = (e) => {
      setInputCount(e.target.value.length);
    };

    return (
        <div style={{ display: "flex", flexDirection: "row", height: "100vh", overflow: "hidden" }}>
            {/* 이미지와 아이콘 영역 */}
            <div style={{ flex: 1, position: "sticky", top: "20px", alignSelf: "flex-start" }}>
            <CardMedia
                component="img"
                image={festival.image}
                alt={festival.title}
                style={{
                    width: "100%",
                    height: "auto",
                    maxHeight: "400px", // 원하는 최대 높이 설정
                    objectFit: "contain", // 이미지를 축소하여 영역 안에 맞추기
                    marginBottom: "20px",
                }}
            />
                {/* 버튼 영역 */}
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "30px", marginTop: "10px" }}>
                    {/* 리뷰 작성 버튼 */}
                    <div
                        style={{ display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer" }}
                        onClick={handleDialogOpen}
                    >
                        <EditIcon fontSize="large" />
                        <span>리뷰 작성</span>
                    </div>

                    {/* 즐겨찾기 버튼 */}
                    <div
                        style={{ display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer" }}
                        onClick={toggleFavorite}
                    >
                        {isFavorite ? <StarIcon fontSize="large" style={{ color: "gold" }} /> : <StarBorderIcon fontSize="large" />}
                        <span>즐겨찾기</span>
                    </div>

                    {/* 알림 설정 버튼 */}
                    <div
                        style={{ display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer" }}
                        onClick={toggleNotification}
                    >
                        {isNotified ? <NotificationsIcon fontSize="large" style={{ color: "red" }} /> : <NotificationsNoneIcon fontSize="large" />}
                        <span>알림설정</span>
                    </div>
                </div>
            </div>

            {/* 설명 영역 */}
            <div style={{ flex: 2, padding: "20px", overflowY: "auto" }}>
                <h2>{festival.title}</h2>
                <p>{festival.date}</p>
                <p>{locationMap[festival.location]}</p> {/* 지역 텍스트 출력 */}
                <p>{festival.adress}</p>
                <p>{festival.outline}</p>
                <p>{festival.Event_introduction}</p>
                <p>{festival.Event_details}</p>
            </div>

            {/* 리뷰 작성 모달 */}
            <Dialog open={isDialogOpen} onClose={handleDialogClose}>
                <DialogContent>
                    {/* 별점 */}
                    <div style={{ marginBottom: "20px", textAlign: "center" }}>
                        <Rating
                            name="festival-rating"
                            value={rating}
                            onChange={(e, newValue) => setRating(newValue)}
                            precision={0.5} // 별점을 0.5 단위로 설정
                        />
                    </div>

                    {/* 리뷰 입력 */}
                    <Input onChange={onInputHandler} maxLength ="30"/>
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        variant="outlined"
                        placeholder="여기에 리뷰를 작성하세요."
                        value={review}
                        onChange={(e) => {
                          const inputValue = e.target.value;
                          if (inputValue.length <= 30) { // 30자를 초과하지 않도록 제한
                              setReview(inputValue);
                              setInputCount(inputValue.length);
                          }
                        }}
                        inputProps={{ maxLength: 30 }} // 최대 글자 수 제한
                    />
                    <div style={{ textAlign: "right" }}>
                        <span>{inputCount}</span>/<span>30 자</span>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>취소</Button>
                    <Button onClick={handleReviewSave} variant="contained">
                        저장
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
