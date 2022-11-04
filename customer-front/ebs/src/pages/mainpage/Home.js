import HairshopCarouselComponent from "../../components/mainpage/HairshopCarouselComponent";
import React from 'react';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
// import { Container } from "react-bootstrap";
import styled from "styled-components";

const Container = styled.div`
  background-color: #F9F9F9;
  justify-content: center;

`;

const Welcome = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: 40px;
`;

const Name = styled.div`
  text-align: center;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Home = () => {

  const navigate = useNavigate();
  const nickName = localStorage.getItem("nickname")
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  console.log(isLoggedIn)
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  return (
    <Container>
        <Welcome>
          안녕하세요
        </Welcome>
        <Name>
          {nickName}님 환영합니다 *^_^*
        </Name> 
        <HairshopCarouselComponent />
    </Container>
    
  );
};

export default Home;

