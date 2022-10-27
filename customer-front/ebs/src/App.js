import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes,  Navigate } from "react-router-dom";
import Mainpage from "./pages/mainpage/Mainpage";
import Ebsnav from "./pages/ebsnav/Ebsnav";

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
            

          {/* </Routes> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
