import HairshopCarouselComponent from "../../components/mainpage/HairshopCarouselComponent";
import React from 'react';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { Container } from "react-bootstrap";
import styled from "styled-components";
import { getactivesubscribe } from "../../store/slices/subscribeSlice";
import TestComponent from "../../components/mainpage/TestComponent";
import EmptyComponent from "../../components/mainpage/EmptyComponent";

const Container = styled.div`
  background-color: #DBD7CC;
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
const Subinfo = styled.div`
  text-align: center;
  font-weight: bold;

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

  const myactivesubscribe = useSelector((state) => state.subscribe.myactivesubscribe);
  console.log(myactivesubscribe)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getactivesubscribe());
  }, []);

  return (
    <Container>
        <Welcome>
          안녕하세요
        </Welcome>
        <Name>
          {nickName}님 환영합니다 *^_^*
        </Name> 
        <Subinfo>
          예약하러 가볼까요?
        </Subinfo>
        <div>
          {myactivesubscribe.length === 0? (
              <EmptyComponent/>
            ) : (
              myactivesubscribe.map((a, i) => {
                return (
                  <TestComponent
                    subscribe={myactivesubscribe[i]}
                    num={i}
                    key={i}
                  />
                );
              })
            )}
        </div>
    </Container>
    
  );
};

export default Home;

