// import React from "react";

import styled from "styled-components";

import logoImg from "../assets/logo_white.png";
import {useNavigate} from "react-router-dom";

const NavHeader = styled.header`
  height: 80px;
  background-color: #7f7f7f;
  display: flex;
  align-items: center;
  user-select: none;
`;

const LogoImg = styled.img`
  width: auto;
  height: 60px;
  margin: 10px 10px 10px 150px;
  cursor: pointer;
  transition-duration: 150ms;
  
  &:hover {
    filter: brightness(0.25);
    transition-duration: 150ms;
  }
`;

const TitleH1 = styled.h1`
  color: #ffffff;
  margin: 10px 50px;
`;

const SpringSpan = styled.span`
  flex: 1;
`;

const MenuNav = styled.nav`
  display: flex;
  flex-direction: row;
  margin: 10px 50px;
`;

const MenuButton = styled.button`
  background-color: #bfbfbf;
  border: none;
  border-radius: 10px;
  color: #ffffff;
  cursor: pointer;
  font-size: 16px;
  margin: 10px;
  padding: 10px;
  transition-duration: 100ms;

  &:hover {
    background-color: #dfdfdf;
    transition-duration: 100ms;
  }
`;

const NavBar = () => {
  const navigate = useNavigate();

  const home = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // const manage = () => {
  //   localStorage.removeItem("token");
  //   navigate("/login");
  // };

  const designer = () => {
    localStorage.removeItem("token");
    navigate("/designer");
  };

  // const reservation = () => {
  //   localStorage.removeItem("token");
  //   navigate("/reservation");
  // };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <NavHeader>
        <LogoImg alt="logo" className="logo" src={logoImg} onClick={home}></LogoImg>
        <TitleH1>EBS</TitleH1>
        <SpringSpan></SpringSpan>
        <MenuNav>
          <MenuButton>매장</MenuButton>
          <MenuButton onClick={designer}>디자이너</MenuButton>
          <MenuButton>예약</MenuButton>
          <MenuButton onClick={logout}>로그아웃</MenuButton>
        </MenuNav>
      </NavHeader>
    </>
  );
}

export default NavBar;