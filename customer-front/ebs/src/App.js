import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes, Router, Navigate } from "react-router-dom";
import Mainpage from "./pages/mainpage/Mainpage";
import Ebsnav from "./pages/ebsnav/Ebsnav";
import Mypage from "./pages/mypage/Mypage";
import { useSelector } from "react-redux";

function App() {
  // const authenticated = useSelector((state) => state.auth.authenticated);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Ebsnav />
            } 
          >
          
            <Route path="/mainpage" element={<Mainpage />} />
            <Route path="/mypage" element={<Mypage />} />
        </Route>


    
      </Routes>
      </BrowserRouter>
    
  );
}

export default App;
