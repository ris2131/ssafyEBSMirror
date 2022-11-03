import './App.css';
import { BrowserRouter, Route, Routes, Router, Navigate } from "react-router-dom";
import Home from "./pages/mainpage/Home";
import GoogleIntro from './pages/Auth/GoogleIntro';
import ReservationInfo from './pages/reservation/ReservationInfo';
import ReservationInfoDetail from './pages/reservation/ReservationInfoDetail';
import SubscribeInfo from './pages/subscribe/SubscribeInfo';
import Login from './pages/Auth/Login';
import NavBar from "./components/NavBar"
import Mypage from "./pages/mypage/Mypage";
import HairshopSearch from './pages/search/HairshopSearch';
import { useSelector } from "react-redux";




function App() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  
  return (
    <BrowserRouter>
      <div >
        {
          isLoggedIn
          ? <NavBar />
          : null
        }
      </div>
      <Routes>
            <Route path="login" element={<Login />} />

            <Route path="/" element={<Home />} />
            
            <Route path="/googleintro" element={<GoogleIntro />} />
            <Route path="/reservation-info" element={<ReservationInfo />} />
            <Route path="/reservation-info-detail" element={<ReservationInfoDetail />} />
            <Route path="/subscribe-info" element={<SubscribeInfo />} />
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/search" element={<HairshopSearch />} />   

      </Routes>

    </BrowserRouter>
      
    
  );
}

export default App;
