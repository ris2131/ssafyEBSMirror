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
  height: 100vh;
  background-size: 100vw 100vh;
`;

const InputDiv = styled.div`
  @media screen and (max-width: 1000px) {
    width: 50vw;
    // margin-left: 6vw;
  }

  width: 20vw;
  margin-bottom: 10px;
  
`;

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
const LoginButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
    console.log(data);
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
        <div>안녕하세로그인화면</div>
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
      </LoginContainer>
    </>
      
    );
  };

export default Login;