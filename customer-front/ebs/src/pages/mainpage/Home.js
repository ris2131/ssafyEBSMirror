import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import style from './Home.module.css';
import axiosClient from "../../api";
import HairshopCarouselComponent from "../../components/mainpage/HairshopCarouselComponent";
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
// import Ebsnav from '../ebsnav/Ebsnav';


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
    // console.log(state.user)
  
        // const accessToken = useSelector((state) => state.auth.accessToken);
  
      // // 유저 닉네임, 헤어숍이용텀, 구독한 헤어숍 정보 받아오기  
      // axiosClient
      // .get('', {
      //   headers: {
      //     Authorization: accessToken,
      //   },
      // })
      // .then((response) => {
      //   console.log(response);
      //   const myinformation = response
      //   console.log(myinformation)
      // })
      // .catch((error) => {
      //   console.log("에러");
      //   console.
    return (
      <div className={style.Layout}>
          <div className={style.Comment}>
              안녕하세요 {member_nickname}님.
          </div>
          <div className={style.Termday}>
              미용실을 이용한지 {haircut_term}일이 되었습니다.
          </div>
          <div className={style.Carousel}>
          <HairshopCarouselComponent />
          </div>
          
      </div>
    );
  };
  
  export default Home;
  