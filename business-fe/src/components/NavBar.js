// import React from "react";

import styled from "styled-components";

import logoImg from "../assets/logo_white.png";

const SHeader = styled.header`
  height: 80px;
  background-color: #7f7f7f;
  display: flex;
  align-items: center;
`;

const SImg = styled.img`
  width: auto;
  height: 60px;
  margin: 10px;
`;

const SH1 = styled.h1`
  color: #ffffff;
  margin: 10px 50px;
`;

const SSpring = styled.span`
  flex: 1;
`;

const SNav = styled.nav`
  display: flex;
  flex-direction: row;
  margin: 10px 50px;
`;

const SDiv = styled.div`
  background-color: #bfbfbf;
  border-radius: 10px;
  color: #ffffff;
  font-size: 16px;
  margin: 10px;
  padding: 10px;
`;

const NavBar = () => {
    return (
        <>
            <SHeader>
                <SImg alt="logo" className="logo" src={logoImg}></SImg>
                    <SH1>EBS</SH1>
                    <SSpring></SSpring>
                    <SNav>
                        <SDiv>매장</SDiv>
                        <SDiv>디자이너</SDiv>
                        <SDiv>예약</SDiv>
                    </SNav>
            </SHeader>
        </>
    );
}

export default NavBar;