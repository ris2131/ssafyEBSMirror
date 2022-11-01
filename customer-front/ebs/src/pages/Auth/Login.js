import styled from "styled-components";
import React from 'react';
import bgImage from '../../assets/Hairshopimage03.png'
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { login } from "../../store/slices/userSlice";
import GoogleTest from "./GoogleTest";

// const backgroundImage = `../../assets/Hairshopimage03.png`;

const LoginContainer = styled.div`
  @media screen and (max-width: 821px) {
    background-image: "../../assets/Hairshopimage03.png" };
  }

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url(${bgImage});
  background-size: 100vw 100vh;
`;

const LogoDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LogoImg = styled.img`
  @media screen and (max-width: 821px) {
    width: 70px;
    height: 70px;
  }

  width: 100px;
  height: 100px;
  margin: 10px;
`;

const LogoText = styled.h1`
  @media screen and (max-width: 821px) {
    font-size: 50px;
  }

  font-size: 80px;
  font-family: OKDDUNG;
  color: red;
  margin: 10px;
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
            src= {bgImage}
            alt="#"
          ></LogoImg>
          <LogoText>Ebs</LogoText>
        </LogoDiv>
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