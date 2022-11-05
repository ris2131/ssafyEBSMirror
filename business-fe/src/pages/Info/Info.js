

import styled from "styled-components";
import TextField from "@mui/material/TextField";

import { useState } from "react";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";


const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const InputDiv = styled.div`
  @media screen and (max-width: 1000px) {
    width: 45vw;
  }
  width: 20vw;
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

const Info = () =>{
  const [password, setPassword] = useState();
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();
  const [homepage, setHomepage] = useState();
  const [introduction, setIntroduction] = useState();
  const [notice, setNotice] = useState();
  const [input1, setInput1] = useState("true");
  
    return(
      <InfoBox>
        <InputDiv>
              <TextField
              id= {input1}
              fullWidth
              disabled
              label="상호명"
              type="text"
              variant="standard"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              />
            <SButton onClick={input1.disabled}>
            가입하기
            </SButton>
          </InputDiv>
          <InputDiv>
              <TextField
              fullWidth
              label="전화번호"
              type="password"
              variant="standard"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              />
          </InputDiv>
          <InputDiv>
              <TextField
              fullWidth
              label="주소"
              type="text"
              variant="standard"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              />
          </InputDiv>
          <InputDiv>
              <TextField
              fullWidth
              label="홈페이지주소"
              type="text"
              variant="standard"
              value={homepage}
              onChange={(e) => setHomepage(e.target.value)}
              />
          </InputDiv>
          <InputDiv>
            <TextField
              fullWidth
              label="매장소개란"
              multiline
              rows={4}
              value={introduction}
            />
          </InputDiv>
          <InputDiv>
            <TextField
            fullWidth
            label="공지 사항"
            multiline
            rows={4}
            value={notice}
          />
          </InputDiv>
          
      </InfoBox>
    );
};


export default Info;