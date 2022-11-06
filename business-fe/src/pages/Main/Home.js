// import React from "react";

import '../../App.css';

import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import { useDispatch, useSelector} from "react-redux";
import styled from "styled-components";

import NavBar from "../../components/NavBar";
import manageImg from "../../assets/manage.jpg";
import designerImg from "../../assets/designer.jpg";
import scheduleImg from "../../assets/schedule.jpg";

import { getBusiness } from "../../redux/AuthSlice";


const SButton = styled.button`
  @media screen and (max-width: 1000px) {
    width: 50vw;
  }
  border-radius: 5px;
  color: white;
  border: none;
  background-color: #9D7F5C;
  padding: 5px;
  margin-top: 40px;
  width: 10vw;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
`;

const SMain = styled.main`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
`;

const SSection = styled.section`
  width: 33%;
  align-items: center;
  background-size: auto 100%;
  background-repeat: no-repeat;
  background-position-x: center;
  color: #ffffff;
  display: flex;
  filter: brightness(0.5);
  font-size: 3rem;
  font-weight: 700;
  justify-content: center;
  text-shadow: 0.1em 0.1em 0.1em #000000;
  transition-duration: 100ms;
  user-select: none;

  &:not(:last-child):not(:first-child) {
    width: 34%;
  }

  &.manage {
    background-image: url(${manageImg});
  }

  &.designer {
    background-image: url(${designerImg});
    background-position-x: right;
  }

  &.schedule {
    background-image: url(${scheduleImg});
  }

  &:hover {
    width: 45%;
    filter: brightness(1);
    transition-duration: 100ms;
    z-index: 1;
  }
`;
const Home = () => {
  let scheduleStr = "예약 정보";
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isVisible = useSelector((state) => state.auth.isVisible);
  useEffect(() => {
    
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `Ebs`;
    if (!localStorage.getItem("token")) {
        navigate("/login");
    }
    dispatch(getBusiness());
    console.log("useeffect isvisible 은"+isVisible);
      
  }, [isLoggedIn,isVisible, navigate, dispatch]);

  const logout = () => {
      localStorage.removeItem("token");
      navigate("/login");
  };
  const handleVisible = () => {
      console.log("isvisible 은"+isVisible);
      console.log("isLoggedIn 은"+isLoggedIn);
  };

  return (
      <>
        <NavBar></NavBar>
        <SMain>
          <SSection className={"manage"} onClick={navigate("/manage")} >
            <div>매장 관리</div>
          </SSection>
          <SSection className={"designer"}>
            <div>디자이너 관리</div>
          </SSection>
          <SSection className={"schedule"}>
            <div>{scheduleStr}</div>
          </SSection>
        </SMain>
          {/* <div>안녕하세홈화면</div> */}
          {/* <SButton onClick={logout}>로그아웃</SButton> */}
          {/* <SButton onClick={handleVisible}>visible 상태 알려줘</SButton> */}
      </>
  );
};

export default Home;