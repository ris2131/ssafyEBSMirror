import './App.css';
import { BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/mainpage/Home"
import Login from "./pages/Auth/Login";
import GoogleIntro from './pages/Auth/GoogleIntro';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 랜딩페이지 */}
        <Route path="/" element={<Home />} />
        {/* 로그인 */}
        <Route path="/login" element={<Login />} />
        <Route path="/googleintro" element={<GoogleIntro />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
