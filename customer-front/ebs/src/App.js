import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes,  Navigate } from "react-router-dom";
import Mainpage from "./pages/mainpage/Mainpage";
import ReservationInfo from './pages/reservation/ReservationInfo';
import ReservationInfoDetail from './pages/reservation/ReservationInfoDetail';
import SubscribeInfo from './pages/subscribe/SubscribeInfo';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/mainpage" element={<Mainpage />}></Route>
        <Route path="/reservation-info" element={<ReservationInfo />}></Route>
        <Route path="/reservation-info-detail" element={<ReservationInfoDetail />}></Route>
        <Route path="/subscribe-info" element={<SubscribeInfo />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
