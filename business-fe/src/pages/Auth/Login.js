// import React from "react";

import styled from "styled-components";
import TextField from "@mui/material/TextField";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/AuthSlice";

import Swal from "sweetalert2";

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const LogoText = styled.h1`
  text-shadow: -1px 0 #000, 0 1px #000, 1px 0 #000, 0 -1px #000;
  font-size: 30px;
  font-family: OKDDUNG;
  margin: 10px;
`;

const InputDiv = styled.div`
  width: 30vw;
  margin-bottom: 10px;
  
`;

const SButton = styled.button`
  border-radius: 5px;
  color: white;
  border: none;
  background-color: #9D7F5C;
  padding: 5px;
  margin-top: 40px;
  width: 20vw;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
`;

const LoginButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SignUpButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const S2Button = styled.button`
  border-radius: 5px;
  color: white;
  border: none;
  background-color: #6C6C6C;
  padding: 5px;
  margin-top: 40px;
  width: 20vw;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
`;

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    const data = {
      email,
      password,
    };
    dispatch(login(data))
      .unwrap()
      .then(() => navigate("/"))
      .catch(() => {
        Swal.fire({ icon: "error", title: "사용자 정보를 확인해주세요" });
      });
  };

  return (
    <>
    <LoginContainer>
        <InputDiv>
          <LogoText>Ebs에 오신것을 환영합니다</LogoText>
        </InputDiv>
        <InputDiv>
          <TextField
            fullWidth
            label="ID(email)"
            variant="standard"
            value={email || ""}
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputDiv>
        <InputDiv>
          <TextField
            fullWidth
            type="password"
            label="Password"
            variant="standard"
            value={password || ""}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </InputDiv>
        <LoginButtonBox>
            <SButton onClick={handleSubmit}>로그인</SButton>
        </LoginButtonBox>
        <SignUpButtonBox>
            <S2Button onClick={() =>  navigate("/signup")}>회원가입</S2Button>
        </SignUpButtonBox>
      </LoginContainer>
    </>
    );
  };

export default Login;