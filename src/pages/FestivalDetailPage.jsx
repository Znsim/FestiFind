import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { festivalDetailPageApi } from "../api/festivalDetailsApi";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Rating from '@mui/material/Rating';
import "./FestivalDetailPage.css";

//API
import checkLoginStatus from "../api/logincheck";
import { saveReview } from "../api/reviewApi"; 
import { fetchUserId } from "../api/user_idApi"; // ✅ user_id 불러오기
import api from "../api/api";

//icon
import PlaceIcon from '@mui/icons-material/Place';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PublicIcon from '@mui/icons-material/Public';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import BusinessIcon from '@mui/icons-material/Business';
import FeedIcon from '@mui/icons-material/Feed';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DiscountIcon from '@mui/icons-material/Discount';
import GradeIcon from '@mui/icons-material/Grade';
import PlusOneIcon from '@mui/icons-material/PlusOne';
import TimerIcon from '@mui/icons-material/Timer';
import NoteIcon from '@mui/icons-material/Note';

import EditIcon from '@mui/icons-material/Edit';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function FestivalDetailPage() {
    const { contentId, contentTypeId } = useParams();
    const safeType = parseInt(contentTypeId, 10) || 12;
    const location = useLocation();
    const { title: stateTitle, image } = location.state || {};
    const [value, setValue] = useState(0);
    const [detail, setDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [review, setReview] = useState("");
    const [userId, setUserId] = useState(null);
    const [rating, setRating] = useState(0);
    const [alertDialogOpen, setAlertDialogOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false); 
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

    useEffect(() => {
        if (!contentId) return;
    
        const getDetail = async () => {
            setLoading(true);
            try {
                const params = {
                    contentId: parseInt(contentId, 10),
                    contentTypeId: safeType,
                };
    
                const data = await festivalDetailPageApi(params);
                if (!data) throw new Error("API 응답에 정보가 없습니다.");
    
                const correctDetail = Array.isArray(data)
                    ? data.find(item => item.contentid === parseInt(contentId, 10))
                    : data;
    
                if (!correctDetail) throw new Error("해당 contentId에 대한 정보를 찾을 수 없습니다.");
    
                correctDetail.contenttypeid = correctDetail.contenttypeid || safeType;
                setDetail(correctDetail);
    
                fetchReviews();
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
    
        getDetail();
    }, [contentId, safeType]);
    
    

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            fetchUserId(token).then((id) => {
                //console.log("📌 가져온 user_id:", id); // ✅ 확인용 로그
                if (id) {
                    setUserId(id);
                    localStorage.setItem("user_id", id); // ✅ user_id 저장
                }
            });
        }
    }, []);
    
    useEffect(() => {
        const fetchLoginStatus = async () => {
            try {
                const data = await checkLoginStatus(); // ✅ 비동기 처리
                console.log("로그인 상태:", data);
                setIsLoggedIn(data.isAuthenticated);
            } catch (error) {
                console.error("로그인 상태 확인 실패:", error);
                alert("로그인이 만료되었습니다.");
                setIsLoggedIn(false);
            }
        };
        fetchLoginStatus();
    }, []);
    
    //즐겨찾기
    const fetchFavorites = async () => {
        if (!userId || !contentId) return;
    
        try {
            console.log("📌 즐겨찾기 조회 요청 - userId:", userId, "contentId:", contentId);
    
            const response = await api.post(`/fevorites/get_rating_by_id?user_id=${encodeURIComponent(userId)}`);
    
            console.log("📌 서버 응답 데이터:", response.data);
    
            if (!response.data || response.data.length === 0) {
                console.warn("📌 즐겨찾기 데이터 없음, 기존 상태 유지");
                return;  // ✅ 기존 상태 유지 (불필요한 false 설정 방지)
            }
            
            
            // ✅ API에서 현재 userId가 즐겨찾기한 contentId 목록을 가져옴
            const favoriteList = response.data.map(item => Number(item.contentId));
            const isFavorited = favoriteList.includes(Number(contentId));
    
            console.log(`📌 서버 응답에서 찾은 contentId들: ${favoriteList}, 현재 contentId: ${contentId}`);
    
            setIsFavorite(isFavorited);
        } catch (error) {
            console.error("❌ 즐겨찾기 조회 실패:", error);
        }
    };
    
    // ✅ `useEffect`에서 `userId`가 바뀔 때마다 즐겨찾기 상태 갱신
    useEffect(() => {
        fetchFavorites();
    }, [userId, contentId]);
    
    
    
    

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleDialogOpen = () => {
        if (!isLoggedIn) {
          setAlertMessage("로그인 후 리뷰를 작성할 수 있습니다.");
          setAlertDialogOpen(true);
          return;
        }
        setIsDialogOpen(true);
      };

    const handleDialogClose = () => {
        setReview("");
        setRating(0);
        setIsDialogOpen(false);
    };

    const handleAlertClose = () => setAlertDialogOpen(false);

    const [reviews, setReviews] = useState([]);

    const fetchReviews = async () => {
        try {
            const requestUrl = `/ratings/get_rating_by_contentId?contentId=${encodeURIComponent(contentId)}`;
    
            //console.log("📌 요청 URL:", requestUrl); 
            
            const response = await api.post(requestUrl);
    
            //console.log("📌 리뷰 데이터:", response.data); 
            setReviews(response.data);
        } catch (error) {
            console.error("리뷰 불러오기 실패:", error);
        }
    };  

    const handleReviewSave = async () => {
        if (!review.trim() || rating === 0) {
            alert("리뷰 내용을 입력하고 평점을 선택하세요!");
            return;
        }
    
        if (!userId) {
            alert("로그인이 필요합니다.");
            return;
        }
    
        try {
            const requestData = {
                contentId: Number(contentId) || 0,
                contentTypeId: Number(safeType) || 0,
                user_id: String(userId),
                rating: Math.min(5, Math.max(1, Number(rating) || 1)),
                title: review.trim(),
            };
    
            console.log("📌 리뷰 저장 요청 데이터:", requestData);
    
            const response = await saveReview(requestData);
    
            //console.log("📌 서버 응답:", response.data); // ✅ 응답을 확인하기 위한 로그
    
            if (!response || response.success === false) {
                alert(`리뷰 저장 실패: ${response?.message || "알 수 없는 오류"}`);
            } else {
                alert("리뷰가 성공적으로 저장되었습니다!");
                handleDialogClose();
                fetchReviews(); // 리뷰 목록 다시 불러오기
            }
        } catch (error) {
            console.error("❌ 리뷰 저장 중 오류 발생:", error);
    
            const errorMessage = error.response?.data?.message || error.message || "알 수 없는 오류";
            alert(`리뷰 저장 실패: ${errorMessage}`);
        }
    };
     
    
    //즐겨찾기
    // const toggleFavorite = async () => {
    //     if (!userId) {
    //         alert("로그인이 필요합니다.");
    //         return;
    //     }
    
    //     try {
    //         let updatedFavorite = !isFavorite;  // ✅ UI 먼저 업데이트
    //         setIsFavorite(updatedFavorite);
    
    //          // ✅ 즐겨찾기 추가 API가 토글 방식인지 확인 필요
    //         await api.post("/fevorites/insert_fevorites", { 
    //             contentId: Number(contentId),
    //             contentTypeId: Number(safeType),
    //             user_id: String(userId)
    //         });

    //             console.log("📌 즐겨찾기 상태 변경 완료:", updatedFavorite);

    //             // ✅ 최신 상태를 다시 가져와 UI 동기화
    //             await fetchFavorites();
    //     } catch (error) {
    //         console.error("❌ 즐겨찾기 변경 중 오류 발생:", error);
    //         alert("즐겨찾기 변경에 실패했습니다. 다시 시도해주세요.");
    
    //         // ❗ 오류 발생 시 UI 상태를 원래대로 복구
    //         setIsFavorite(!updatedFavorite);
    //     }
    // };


    //프론트에서 UI 임의 수정 
    const toggleFavorite = async () => {
        if (!userId) {
            alert("로그인이 필요합니다.");
            return;
        }
    
        try {
            let updatedFavorite = !isFavorite;  
            setIsFavorite(updatedFavorite); // ✅ UI에서 삭제된 것처럼 보이게 함
    
            // ✅ 즐겨찾기 추가 (실제로는 삭제 기능이 없음)
            await api.post("/fevorites/insert_fevorites", { 
                contentId: Number(contentId),
                contentTypeId: Number(safeType),
                user_id: String(userId)
            });
    
            console.log("📌 즐겨찾기 상태 변경 완료:", updatedFavorite);
    
            // ✅ 최신 상태를 다시 가져와 UI 동기화
            await fetchFavorites(); 
        } catch (error) {
            console.error("❌ 즐겨찾기 변경 중 오류 발생:", error);
            alert("즐겨찾기 변경에 실패했습니다. 다시 시도해주세요.");
    
            // ❗ 오류 발생 시 UI 상태를 원래대로 복구
            setIsFavorite(!updatedFavorite);
        }
    };
    
    
    
    
    
    const handleReviewModalOpen = () => {
        setIsReviewModalOpen(true);
    };
    
    const handleReviewModalClose = () => {
        setIsReviewModalOpen(false);
    };
    

    if (loading) return <p>상세 정보를 불러오는 중입니다...</p>;
    if (error) return <p>오류 발생: {error}</p>;

    return (
        <div className="header">
            <div className="festival-container">
                <div>
                    {image ? (
                        <>
                            <img 
                                src={image} 
                                alt={stateTitle || "축제 이미지"} 
                                className="festival-image"
                                onClick={() => setIsModalOpen(true)}
                            />

                            {isModalOpen && (
                                <div className="modal" onClick={() => setIsModalOpen(false)}>
                                    <span className="modal-close">&times;</span>
                                    <img src={image} alt="확대된 축제 이미지" />
                                </div>
                            )}
                        </>
                    ) : (
                        <p>이미지 없음</p>
                    )}
                </div>

                <div className="festival-info">
                    <h1 className="festival-title">{stateTitle || (detail ? detail.title : "정보 없음")}</h1>

                    <div className="button-container" style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer" }} onClick={handleDialogOpen}>
                            <EditIcon fontSize="large" />
                            <span>리뷰 작성</span>
                        </div>
                        
                        <div 
                            style={{ display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer" }} 
                            onClick={toggleFavorite}
                        >
                            {isFavorite ? (
                                <StarIcon fontSize="large" style={{ color: "gold" }} />  // ✅ 즐겨찾기 상태 유지됨
                            ) : (
                                <StarBorderIcon fontSize="large" />
                            )}
                            <span>즐겨찾기</span>
                        </div>


                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer" }} onClick={handleReviewModalOpen}>
                            <FeedIcon fontSize="large" />
                            <span>사용자 리뷰</span>
                        </div>
                    </div>

                    

                    <div className="info-box">
                    <Box sx={{ width: '100%' }}>
                        <Tabs value={value} onChange={handleChange} variant="fullWidth">
                            <Tab label="기본 정보" {...a11yProps(0)} />
                            <Tab label="주최 및 기관" {...a11yProps(1)} />
                            <Tab label="행사 정보" {...a11yProps(2)} />
                            <Tab label="방문 정보" {...a11yProps(3)} />
                        </Tabs>


                           <CustomTabPanel value={value} index={0}>
                                    <p><strong><CalendarMonthIcon/> 축제 기간 : </strong> {detail.eventstartdate || "미정"} ~ {detail.eventenddate || "미정"}</p>
                                    <p><strong><PlaceIcon/> 장소 : </strong> {detail.eventplace || "정보 없음"}</p>
                                    <p><strong><PublicIcon/> 행사 홈페이지 : </strong> {detail.eventhomepage || "정보 없음"}</p>
                                    <p><strong><ConfirmationNumberIcon/> 입장료 : </strong> {detail.usetimefestival || "무료"}</p>
                                </CustomTabPanel>
                                <CustomTabPanel value={value} index={1}>
                                    <p><strong><BusinessIcon/> 주최 : </strong> {detail.sponsor1 || "정보 없음"} / {detail.sponsor2 || "정보 없음"}</p>
                                    <p><strong><FeedIcon/> 주최자 정보 : </strong>{detail.sponsor1 || "정보 없음"}</p>
                                    <p><strong><LocalPhoneIcon/> 주최자 연락처 : </strong>{detail.sponsor1tel || "정보 없음"}</p>
                                    <p><strong><FeedIcon/> 주관사 정보 : </strong>{detail.sponsor2 || "정보 없음"}</p>
                                    <p><strong><LocalPhoneIcon/> 주관사 연락처 : </strong>{detail.sponsor2tel || "정보 없음"}</p>
                                </CustomTabPanel>
                                <CustomTabPanel value={value} index={2}>
                                    <p><strong> <SentimentSatisfiedAltIcon/> 행사 프로그램 : </strong>{detail.program || "정보 없음"}</p>
                                    <p><strong> <AccessTimeIcon/> 공연시간 : </strong>{detail.playtime || "정보 없음"}</p>
                                    <p><strong><PlaceIcon/> 행사장 위치 : </strong>{detail.palceinfo || "정보 없음"}</p>
                                    <p><strong><DiscountIcon/> 할인 정보 : </strong> {detail.discountinfofestival || "정보 없음"}</p>
                                    <p><strong><GradeIcon/> 축제 등급 : </strong>{detail.festivalgrade || "정보 없음"}</p>
                                </CustomTabPanel> 
                                <CustomTabPanel value={value} index={3}>
                                    <p><strong><PlusOneIcon/> 관람 연령 : </strong> {detail.agelimit || "정보 없음"}</p>
                                    <p><strong><TimerIcon/> 관람소요시간 : </strong>{detail.spendtimefestival || "정보 없음"}</p>
                                    <p><strong><NoteIcon/> 부대행사 : </strong>{detail.subevent || "정보 없음"}</p>
                                </CustomTabPanel>
                    </Box>
                    </div>
                </div>
            </div>
            
            {/* 리뷰 밑에 표시
             <Box sx={{ mt: 3 }}>
                <Typography variant="h6">사용자 리뷰</Typography>
                {reviews.length > 0 ? (
                    reviews.map((r, index) => (
                        <Box key={index} sx={{ p: 2, border: "1px solid #ddd", borderRadius: "5px", mb: 1 }}>
                            <Typography variant="subtitle1">{r.title}</Typography>
                            <Rating value={r.rating} readOnly />
                            <Typography variant="body2">{r.user_id} | {new Date(r.created_at).toLocaleDateString()}</Typography>
                        </Box>
                    ))
                ) : (
                    <Typography>아직 리뷰가 없습니다.</Typography>
                )}
            </Box> */}


            <Dialog open={isDialogOpen} onClose={handleDialogClose}>
                <DialogContent style={{minHeight : "300px"}}>
                    <Rating 
                        name="rating" 
                        value={rating} 
                        onChange={(event, newValue) => setRating(newValue)} 
                    />
                    <TextField 
                        autoFocus 
                        margin="dense" 
                        label="리뷰를 작성하세요" 
                        fullWidth 
                        multiline 
                        rows={9} 
                        value={review} 
                        onChange={(e) => {
                            if (e.target.value.length <= 300) {
                                setReview(e.target.value);
                            }
                        }}
                        inputProps={{ maxLength: 300 }} // 최대 글자 수 제한
                    />
                    <Typography variant="caption" color="textSecondary" align="right">
                        {review.length} / 300 자
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>취소</Button>
                    <Button onClick={handleReviewSave} color="primary">저장</Button>
                </DialogActions>
            </Dialog>
             {/* 로그인 필요 알림 모달 */}
            <Dialog open={alertDialogOpen} onClose={handleAlertClose}>
                <DialogTitle>알림</DialogTitle>
                <DialogContent>
                <p>{alertMessage}</p>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleAlertClose} color="primary">확인</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={isReviewModalOpen} onClose={handleReviewModalClose} maxWidth="md" fullWidth>
                <DialogTitle>사용자 리뷰</DialogTitle>
                <DialogContent>
                    {reviews.length > 0 ? (
                        reviews.map((r, index) => (
                            <Box key={index} sx={{ p: 2, border: "1px solid #ddd", borderRadius: "5px", mb: 1 }}>
                                <Typography variant="subtitle1">{r.title}</Typography>  {/* 리뷰 제목 */}
                                <Rating value={r.rating} readOnly />  {/* 평점 표시 */}
                                <Typography variant="body2">{r.user_id} | {new Date(r.created_at).toLocaleDateString()}</Typography>  
                            </Box>
                        ))
                    ) : (
                        <Typography>아직 리뷰가 없습니다.</Typography>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleReviewModalClose} color="primary">닫기</Button>
                </DialogActions>
            </Dialog>

        </div>
    );
}
