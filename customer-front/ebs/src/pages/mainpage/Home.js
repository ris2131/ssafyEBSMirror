import HairshopCarouselComponent from "../../components/mainpage/HairshopCarouselComponent";
import CarouselTest from "../../components/mainpage/CarouselTest";
import React from 'react';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { Container } from "react-bootstrap";
import styled from "styled-components";
import { getsubscribeinfo } from "../../store/slices/subscribeSlice";
import Carousel from 'react-bootstrap/Carousel';

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

  const mysubscribe = useSelector((state) => state.subscribe.mysubscribe);
  console.log(mysubscribe)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getsubscribeinfo());
  }, []);

  return (
    <Container>
        <Welcome>
          안녕하세요
        </Welcome>
        <Name>
          {nickName}님 환영합니다 *^_^*
        </Name> 
        <div>
      {mysubscribe.length ? (
        mysubscribe.map((a, i) => {
          return (
            <CarouselTest
              subscribe={mysubscribe[i]}
              num={i}
              key={i}
            />
          );
        })
      ) : (
        <HairshopCarouselComponent/>
      )}
    </div>
    </Container>
    
  );
};

export default Home;

