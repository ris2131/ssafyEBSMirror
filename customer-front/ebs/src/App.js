import './App.css';
import { BrowserRouter, Route, Routes, Router, Navigate } from "react-router-dom";
import Home from "./pages/mainpage/Home";
import GoogleIntro from './pages/Auth/GoogleIntro';
import ReservationInfo from './pages/reservation/ReservationInfo';
import ReservationInfoDetail from './pages/reservation/ReservationInfoDetail';
import Subscribe from './pages/subscribe/Subscribe';
import SubscribeInfo from './pages/subscribe/SubscribeInfo';
import Login from './pages/Auth/Login';
import NavBar from "./components/NavBar"
import Mypage from "./pages/mypage/Mypage";
import MyInfoEdit from './pages/mypage/MyInfoEdit';
import HairshopSearch from './pages/search/HairshopSearch';
import HairshopInfo from './pages/hairshop/HairshopInfo';
import Approved from './pages/pay/Approved';

import { useSelector } from "react-redux";

import Ebsnav from './components/ebsnav/Ebsnav';



function App() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const token = localStorage.getItem('token')
  return (
    <BrowserRouter>
      <div >
        {
          isLoggedIn || token
          ? <Ebsnav/>
          : null
        }
      </div>
      <Routes>
            <Route path="login" element={<Login />} />

            <Route path="/" element={<Home />} />
            
            <Route path="/googleintro" element={<GoogleIntro />} />
            <Route path="/reservation-info" element={<ReservationInfo />} />
            <Route path="/reservation-info-detail" element={<ReservationInfoDetail />} />
            <Route path="/subscribe" element={<Subscribe/>}/>
            <Route path="/subscribe-info" element={<SubscribeInfo />} />
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/myinfo-edit" element={<MyInfoEdit />} />
            <Route path="/search" element={<HairshopSearch />} />   
            <Route path="/hairshop-info" element={<HairshopInfo />} />
            <Route path="/pay/approved" element={<Approved/>} />
      </Routes>

    </BrowserRouter>
      
    
  );
}

export default App;
