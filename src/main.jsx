import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // React Router import
import Header from './components/Header'
import FestivalDetailPage from './pages/FestivalDetailPage'
import 'bootstrap/dist/css/bootstrap.min.css';
import HeaderBar from './components/HeaderBar'
import MainPage from './pages/MainPage';
import SearchPage from './pages/SerachPage';

createRoot(document.getElementById('root')).render(
  <div>
    <StrictMode>
      <Router>
        <Header />
        <HeaderBar /> 
        <Routes>
          <Route path='/' element={<MainPage/>}/>
          <Route path='/search' element={<SearchPage/>}/>
        </Routes>
      </Router>
    </StrictMode>
  </div>
)
