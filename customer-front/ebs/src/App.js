import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes,  Navigate } from "react-router-dom";
import Mainpage from "./pages/mainpage/Mainpage";
import Ebsnav from "./pages/ebsnav/Ebsnav";
import Mypage from "./pages/mypage/Mypage";

function App() {
  // const authenticated = useSelector((state) => state.auth.authenticated);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Ebsnav />} >
          {/* <Routes> */}
          <Route path="/mainpage" element={<Mainpage />}></Route>
          <Route path="/mypage" element={<Mypage />}></Route>  

          {/* </Routes> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
