import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes,  Navigate } from "react-router-dom";
import Mainpage from "./pages/mainpage/Mainpage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/mainpage" element={<Mainpage />}></Route>
        

      </Routes>
    </BrowserRouter>
  );
}

export default App;
