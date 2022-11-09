import HairshopCarouselComponent from "../../components/mainpage/HairshopCarouselComponent";
import React from 'react';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { Container } from "react-bootstrap";
import styled from "styled-components";
import { getsubscribeinfo } from "../../store/slices/subscribeSlice";
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
        <Subinfo>
          예약하러 가볼까요?
        </Subinfo>
        <div>
          {mysubscribe.length === 0? (
              <EmptyComponent/>
            ) : (
              mysubscribe.map((a, i) => {
                return (
                  <TestComponent
                    subscribe={mysubscribe[i]}
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

