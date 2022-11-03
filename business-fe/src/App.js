import './App.css';

//import { useEffect } from "react";
//import { getuser } from "./redux/AuthSlice";
//import { useDispatch } from "react-redux";
import { Routes, Route, useNavigate } from "react-router-dom";

// 메인
import Home from "./pages/Main/Home";
// 로그인
import Login from "./pages/Auth/Login";
import SignUp from './pages/Auth/SignUp';

function App() {
  //const dispatch = useDispatch();
  //const navigate = useNavigate();
  //const token = localStorage.getItem("token");

  return (
    <div className="App">
      <Routes>
        {/* 메인 */}
        <Route path="/" element={<Home />} />
        
        {/* 로그인 */}
        <Route path="/login" element={<Login/>} />
        
        {/* 회원가입 */}
        <Route path="/signup" element={<SignUp />} />

      </Routes>
    </div>
  );
}

export default App;
