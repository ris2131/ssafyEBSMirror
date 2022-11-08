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
import Designer from './pages/Designer/Designer';
import DesignerAdd from './pages/Designer/DesignerAdd';
import TimeSheet from "./pages/Schedule/TimeSheet";

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

        {/* 디자이너 추가 페이지 */}
        <Route path="/schedule" element={<TimeSheet/>}/>
      </Routes>
    </div>
  );
}

export default App;
