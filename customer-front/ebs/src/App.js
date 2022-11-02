import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes, Router, Navigate } from "react-router-dom";
import Home from "./pages/mainpage/Home";
import GoogleIntro from './pages/Auth/GoogleIntro';
import ReservationInfo from './pages/reservation/ReservationInfo';
import ReservationInfoDetail from './pages/reservation/ReservationInfoDetail';
import SubscribeInfo from './pages/subscribe/SubscribeInfo';
import Login from './pages/Auth/Login';


import Ebsnav from "./pages/ebsnav/Ebsnav";
import Mypage from "./pages/mypage/Mypage";
import { useSelector } from "react-redux";
import HairshopSearch from './pages/search/HairshopSearch';





function App() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route> */}
        {/* <Route
          path="/"
          element={
            isLoggedIn ? <Ebsnav /> : <Navigate to="/login" /> //replace="replace"
            } 
          > */}
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="/googleintro" element={<GoogleIntro />} />
            <Route path="/reservation-info" element={<ReservationInfo />} />
            <Route path="/reservation-info-detail" element={<ReservationInfoDetail />} />
            <Route path="/subscribe-info" element={<SubscribeInfo />} />
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/search" element={<HairshopSearch />} />   
        {/* </Route> */}
        {/* <Route
          path="/login"
          element={!isLoggedIn ? <GoogleIntro /> : <Navigate to="/" />}
        /> */}
      </Routes>
    </BrowserRouter>
      
    
  );
}

export default App;
