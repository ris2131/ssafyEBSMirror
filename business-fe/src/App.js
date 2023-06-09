import './App.css';

//import { useEffect } from "react";
//import { getuser } from "./redux/AuthSlice";
//import { useDispatch } from "react-redux";
import {Routes, Route} from "react-router-dom";

// 메인
import Home from "./pages/Main/Home";
// 로그인
import Login from "./pages/Auth/Login";
import SignUp from './pages/Auth/SignUp';
//매장 관리
import Info from "./pages/Info/Info";
//디자이너 관리
import Designer from './pages/Designer/Designer';
import DesignerAdd from './pages/Designer/DesignerAdd';
import DesignerModify from './pages/Designer/DesignerModify';
//예약내역 관리
import MyCalendar from './pages/Schedule/MyCalendar';
import TimeSheet from './pages/Schedule/TimeSheet';

function App() {
  //const dispatch = useDispatch();
  //const navigate = useNavigate();
  //const token = localStorage.getItem("token"); 

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
        
        {/* 회원가입 */}
        <Route path="/signup" element={<SignUp/>} />

        {/*점주 정보 수정*/}
        <Route path="/info" element={<Info/>}/>

        {/* 디자이너 관리 페이지 */}
        <Route path="/designer" element={<Designer/>}/>

        {/* 디자이너 추가 페이지 */}
        <Route path="/designer/add" element={<DesignerAdd/>}/>

        {/* 디자이너 수정 페이지 */}
        <Route path="/designer/modify" element={<DesignerModify/>}/>

        {/* 예약정보 페이지 */}
        <Route path="/schedule/my-calendar" element={<MyCalendar/>}/>

        {/* 시간표 페이지 */}
        <Route path="/schedule/time-sheet" element={<TimeSheet/>}/>

      </Routes>
    </div>
  );
}

export default App;
