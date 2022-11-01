// import React from "react";

import '../../App.css';

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Home = () => {
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    useEffect(() => {
        const titleElement = document.getElementsByTagName("title")[0];
        titleElement.innerHTML = `Ebs`;
        if (!localStorage.getItem("token")) {
          navigate("/login");
        }
      }, [isLoggedIn, navigate]);
    
    return (
      <div>안녕하세홈화면</div>
    );
  };

export default Home;