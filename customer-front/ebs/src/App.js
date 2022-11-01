import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes, Router, Navigate } from "react-router-dom";
import Mainpage from "./pages/mainpage/Mainpage";

import ReservationInfo from './pages/reservation/ReservationInfo';
import ReservationInfoDetail from './pages/reservation/ReservationInfoDetail';
import SubscribeInfo from './pages/subscribe/SubscribeInfo';


import Ebsnav from "./pages/ebsnav/Ebsnav";
import Mypage from "./pages/mypage/Mypage";
import { useSelector } from "react-redux";
import ShopSearch from './pages/shopsearch/ShopSearch';
import ReservationHistory from './pages/reservation/ReservationHistory';

import Home from './pages/home/Home';


function App() {
  // const authenticated = useSelector((state) => state.auth.authenticated);
  return (
    // <BrowserRouter>
      <Routes>
        {/* <Route
          path="/"
          element={
            <Ebsnav />
            } 
          >
            <Route path="/" element={<Home />} /> */}
          
            <Route path="/mainpage" element={<Mainpage />} />
            <Route path="/reservation-info" element={<ReservationInfo />} />
            <Route path="/reservation-info-detail" element={<ReservationInfoDetail />} />
            <Route path="/subscribe-info" element={<SubscribeInfo />} />
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/shop-search" element={<ShopSearch />} />   
        {/* </Route> */}
      </Routes>
      // </BrowserRouter>
    
  );
}

export default App;
