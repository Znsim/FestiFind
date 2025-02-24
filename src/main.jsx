import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import FestivalDetailPage from "./pages/FestivalDetailPage";
import "bootstrap/dist/css/bootstrap.min.css";
import HeaderBar from "./components/HeaderBar";
import MainPage from "./pages/Main/MainPage";
import SearchPage from "./pages/Serach/SerachPage";
import Signup from "./pages/User/Signup";
import  Login  from "./pages/User/LogIn";
import CalendarPage from "./pages/Calendar/CalendarPage";
createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Router>
            <Header />
            <HeaderBar />
            <Routes>
                <Route path="/" element={<MainPage/>} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/login" element={<Login/>}/>
                <Route path="/calendar" element={<CalendarPage/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/festivalDetailPage/:contentId/:contentTypeId" element={<FestivalDetailPage />} />
                <Route path="/festival/:id" element={<FestivalDetailPage />} />
                
            </Routes>
        </Router>
    </StrictMode>
);
