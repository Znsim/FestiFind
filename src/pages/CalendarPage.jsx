import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CalendarPage.css";
//npm install react-calendar 이 패키지 꼭 설치할 것
const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [festivalData, setFestivalData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const fetchFestivalData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/festivals");
      if (!response.ok) {
        throw new Error("Failed to fetch festival data");
      }
      const data = await response.json();
      setFestivalData(data);
    } catch (error) {
      console.error("Error fetching festival data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFestivalData();
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const formatDateKey = (date) => date.toISOString().split("T")[0];

  const renderEventInfo = () => {
    if (!selectedDate) return null;
    const dateKey = formatDateKey(selectedDate);
    const events = festivalData[dateKey];

    return (
      <div className="event-info">
        <h3>Events on {selectedDate.toDateString()}</h3>
        {events ? (
          <ul>
            {events.map((event, index) => (
              <li key={index}>{event}</li>
            ))}
          </ul>
        ) : (
          <p>No events on this day.</p>
        )}
        <button className="close-button" onClick={() => setSelectedDate(null)}>
          &times;
        </button>
      </div>
    );
  };

  return (
    <div className="calendar-page">
      <div className="calendar-container">
        <div className="calendar-left">
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <Calendar
              onChange={handleDateChange}
              value={selectedDate}
              tileClassName={({ date, view }) => {
                const dateKey = formatDateKey(date);
                const today = new Date();
                const todayKey = formatDateKey(today);

                if (view === "year" || view === "decade" || view === "century") {
                  return "custom-year-tile";
                }

                if (festivalData[dateKey]) return "event-day";
                if (todayKey === dateKey) return "today";

                const dayOfWeek = date.getDay();
                if (dayOfWeek === 6) return "saturday";
                if (dayOfWeek === 0) return "sunday";

                return null;
              }}
              tileContent={({ date }) => {
                const dateKey = formatDateKey(date);
                if (festivalData[dateKey]) {
                  return <div className="event-dot"></div>;
                }
                return null;
              }}
              className="custom-calendar"
            />
          )}
        </div>
        {selectedDate && <div className="calendar-right">{renderEventInfo()}</div>}
      </div>
    </div>
  );
};

export default CalendarPage;
