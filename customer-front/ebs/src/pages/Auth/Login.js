import styled from "styled-components";
import React from 'react';
import bgImage from '../../assets/back_img4.png'
import logoImage from '../../assets/ebs_logo_beige.png'
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { login } from "../../store/slices/userSlice";
import GoogleTest from "./GoogleTest";

// const backgroundImage = `../../assets/Hairshopimage03.png`;

const LoginContainer = styled.div`
  @media screen and (max-width: 821px) {
    background-image: "../../assets/back_img4.png" };
  }

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url(${bgImage});
  //background-size: 100vw 100vh;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  
`;

const LogoDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LogoImg = styled.img`
  @media screen and (max-width: 821px) {
    width: 220px;
    height: 220px;
  }

  width: 110px;
  height: 110px;
  margin: 10px;
`;

const LogoText = styled.h1`
  @media screen and (max-width: 821px) {
    font-size: 80px;
  }

  
  font-size: 120px;
  font-family: GowunBatang-Regular;
  color: white;
  margin: 10px;
`;

const Welcometext = styled.div`
  color: white;
  font-family: GowunBatang-Regular;
`;

// const InputDiv = styled.div`
//   @media screen and (max-width: 821px) {
//     width: 50vw;
//   }

//   width: 20vw;
//   margin-bottom: 10px;
// `;

// const SButton = styled.button`
//   border-radius: 20px;
//   color: white;
//   border: none;
//   background-color: #42a5f5;
//   padding: 10px;
//   margin-top: 40px;
//   width: 20vw;
//   cursor: pointer;
// `;

const IconDiv2 = styled.div`
  margin: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  border-top: 1px solid #ececec;
`;


// const StyledP = styled.p`
//   font-size: 12px;
//   cursor: pointer;
// `;

// const FooterDiv = styled.div`
//   width: 400px;
//   display: flex;
//   justify-content: space-around;
//   align-items: center;
// `;

const Login = () => {
  // const navigate = useNavigate();

  // const [username, setUsername] = useState();
  // const [password, setPassword] = useState();


  return (
    <>
      <LoginContainer>
        <LogoDiv>
          <LogoImg
            src= {logoImage}
            alt="#"
          ></LogoImg> 
        </LogoDiv>
        <LogoText>EBS</LogoText>
        <Welcometext>남성 전용 헤어숍 구독 서비스</Welcometext>
        <IconDiv2>
          <GoogleTest text="로그인" />
        </IconDiv2>
        {/* <FooterDiv> */}
          {/* <StyledP onClick={() => navigate("/forgotpassword")}> */}
            {/* 비밀번호 찾기 */}
          {/* </StyledP> */}
          {/* <StyledP onClick={() => navigate("/signup")}>회원가입</StyledP> */}
        {/* </FooterDiv> */}
      </LoginContainer>
    </>
  );
};

export default Login;
