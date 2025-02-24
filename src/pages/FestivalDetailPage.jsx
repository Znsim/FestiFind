import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { festivalDetailPageApi } from "../api/festivalDetailsApi";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import "./FestivalDetailPage.css";

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
    const [value, setValue] = React.useState(0);
    const [detail, setDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false); // 이미지 확대 모달 상태

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
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        getDetail();
    }, [contentId, safeType]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
      };

    if (loading) return <p>상세 정보를 불러오는 중입니다...</p>;
    if (error) return <p>오류 발생: {error}</p>;

    return (
        <div className="header">
            <div className="festival-container">
                {/* 이미지 영역 */}
                <div className="festival-image-container">
                    {image ? (
                        <>
                            <img 
                                src={image} 
                                alt={stateTitle || "축제 이미지"} 
                                className="festival-image"
                                onClick={() => setIsModalOpen(true)} // 클릭하면 모달 열림
                            />

                            {/* 모달 창 */}
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

                {/* 축제 상세 정보 영역 */}
                <div className="festival-info">
                    {/* 제목 (빨간 상자 위) */}
                    <h1 className="festival-title">{stateTitle || (detail ? detail.title : "정보 없음")}</h1>

                    {/* 빨간 상자 안의 상세 정보 */}
                    <div className="info-box">
                        {parseInt(safeType, 10) === 15 && (
                            <>
                             <Box sx={{ width: '100%' }}>
                                <Box sx={{ width: '100%', height: '100%' }} className="festival-tabs-container">
                                    <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%' }}>
                                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" variant="fullWidth">
                                            <Tab label="기본 정보" {...a11yProps(0)} />
                                            <Tab label="주최 및 기관" {...a11yProps(1)} />
                                            <Tab label="행사 정보" {...a11yProps(2)} />
                                            <Tab label="방문 정보" {...a11yProps(3)} />
                                        </Tabs>
                                    </Box>
                                </Box>



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
                              
                               
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
