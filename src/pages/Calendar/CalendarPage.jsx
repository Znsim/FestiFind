import React, { useState, useEffect, useRef } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CalendarPage.css";
import { fetchCalendar } from "../../api/calendarApi";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";

const MAX_TITLE_LENGTH = 20;

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [festivalData, setFestivalData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [activeDate, setActiveDate] = useState(new Date());
  const [showEventInfo, setShowEventInfo] = useState(false);
  const [calendarHeight, setCalendarHeight] = useState("auto");

  const navigate = useNavigate();
  const calendarRef = useRef(null);

  const currentYear = activeDate.getFullYear();
  const currentMonth = activeDate.getMonth() + 1;

  useEffect(() => {
    fetchFestivalData(currentYear, currentMonth);
  }, [currentYear, currentMonth]);

  useEffect(() => {
    if (calendarRef.current) {
      setCalendarHeight(`${calendarRef.current.clientHeight}px`);
    }
  }, [festivalData, currentMonth]);

  const fetchFestivalData = async (year, month) => {
    setIsLoading(true);
    try {
      const data = await fetchCalendar(year, month);
      console.log("📌 API에서 받은 축제 데이터:", data); // ✅ 데이터 확인
      setFestivalData(data || {});
    } catch (error) {
      console.error("❌ API 오류:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowEventInfo(true);
  };

  const handleMonthChange = ({ activeStartDate }) => {
    if (activeStartDate) {
      setActiveDate(activeStartDate);
    }
  };

  const formatDateKey = (date) => {
    return date.getDate().toString().padStart(2, "0");
  };

  const handleCloseEventInfo = () => {
    setShowEventInfo(false);
  };

  // ✅ 축제 상세 페이지로 이동하는 함수
  const handleFestivalClick = (festival) => {
    if (!festival || !festival.contentid) {
      console.log("❌ 축제 정보가 없거나 contentid가 없습니다:", festival);
      return;
    }

    console.log("📌 클릭된 축제 데이터:", festival);

    navigate(`/festivalDetailPage/${festival.contentid}/15`, {
      state: {
        title: festival.title,
        image: festival.firstimage || festival.firstimage2 || null
      },
    });
  };

  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const day = date.getDay();
      if (day === 0) return "sunday";
      if (day === 6) return "saturday";
    }
    return null;
  };

  const renderEventInfo = () => {
    if (!selectedDate) return null;
    const dateKey = formatDateKey(selectedDate);
    const events = festivalData[dateKey];

    return (
      <div className="event-info-container">
        <div className="event-header">
          <h2 className="event-title">{selectedDate.toDateString()} 축제 정보</h2>
          <button className="close-button" onClick={handleCloseEventInfo}>
            ×
          </button>
        </div>
        {events && events.length > 0 ? (
          <Grid container spacing={2}>
            {events.map((festival, index) => {
              if (!festival) return null;

              console.log("📸 축제 데이터 확인:", festival); // ✅ 데이터 로그 확인

              const imageUrl = festival.firstimage || festival.firstimage2 || "https://via.placeholder.com/200";
              const truncatedTitle =
                festival.title && festival.title.length > MAX_TITLE_LENGTH
                  ? festival.title.slice(0, MAX_TITLE_LENGTH) + "..."
                  : festival.title || "제목 없음";

              return (
                <Grid item xs={12} key={festival.contentid || `festival-${index}`}>
                  <Card onClick={() => handleFestivalClick(festival)} className="festival-card">
                    <div className="festival-card-content">
                      {imageUrl.startsWith("http") ? (
                        <img src={imageUrl} alt={festival.title || "축제 정보 없음"} className="festival-card-img" />
                      ) : (
                        <div className="placeholder">이미지 없음</div>
                      )}
                      <CardContent className="festival-content">
                        <Tooltip title={festival.title || "축제 정보 없음"} arrow>
                          <h3 className="festival-title">{truncatedTitle}</h3>
                        </Tooltip>
                        {festival.eventstartdate && festival.eventenddate && (
                          <p className="festival-date">
                            {festival.eventstartdate} ~ {festival.eventenddate}
                          </p>
                        )}
                        <p className="festival-location">{festival.addr1 || "위치 정보 없음"}</p>
                      </CardContent>
                    </div>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        ) : (
          <p className="no-event">해당 날짜에 축제 정보가 없습니다.</p>
        )}
      </div>
    );
  };

  return (
    <div className="calendar-page">
      <div className="calendar-container">
        <div className="calendar-left" ref={calendarRef}>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <Calendar
              onChange={handleDateChange}
              value={selectedDate}
              activeStartDate={activeDate}
              onActiveStartDateChange={handleMonthChange}
              tileClassName={tileClassName}
              tileContent={({ date }) => {
                const dateKey = formatDateKey(date);
                return festivalData[dateKey] ? <div className="event-dot"></div> : null;
              }}
              className="custom-calendar"
            />
          )}
        </div>
        <div className={`calendar-right ${showEventInfo ? "visible" : ""}`} style={{ height: calendarHeight }}>
          {renderEventInfo()}
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
