import './App.css';

//import { useEffect } from "react";
//import { getuser } from "./redux/AuthSlice";
//import { useDispatch } from "react-redux";
import { Routes, Route, useNavigate } from "react-router-dom";

// 메인
import Home from "./pages/Main/Home";
// 로그인
import Login from "./pages/Auth/Login";

function App() {
  //const dispatch = useDispatch();
  //const navigate = useNavigate();
  //const token = localStorage.getItem("token");

  //왜 필요?
  // useEffect(() => {
  //   if (token) {
  //     const getUser = () => {
  //       dispatch(getuser())
  //         .unwrap()
  //         .catch(() => {
  //           localStorage.setItem("token", "");
  //           navigate("/login");
  //         });
  //     };
  //     getUser();
  //   }
  // }, [dispatch, navigate, token]);

  return (
    <div className="App">
      <Routes>
        {/* 메인 */}
        <Route path="/" element={<Home />} />
        
        {/* 로그인 */}
        <Route path="/login" element={<Login/>} />
      </Routes>
    </div>
  );
}

export default App;
