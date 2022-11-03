import HairshopCarouselComponent from "../../components/mainpage/HairshopCarouselComponent";
import NavBar from "../../components/NavBar"
import React from 'react';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import styled from "styled-components";

// const Container = styled.div`
//   background-color: #F9F9F9;
//   justify-content: center;

// `;

// const TitleDiv = styled.div`
//   justify-content: center;
//   font-size: 20px;
// `;

const Home = () => {

  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const member_nickname = "김싸피"
  const haircut_term = 35
  console.log(isLoggedIn)
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div>
      <NavBar />
      
        <div>
            안녕하세요 {member_nickname}님.
        </div>
        <div>
            미용실을 이용한지 {haircut_term}일이 되었습니다.
        </div>
        <div>
        <HairshopCarouselComponent />
        </div>        
    
    </div>
    
  );
};

export default Home;

