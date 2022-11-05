

import styled from "styled-components";
import TextField from "@mui/material/TextField";

import { useState } from "react";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

import pencil from "../../assets/Pencil.png";


const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
const FlexInputDiv = styled.div`
  @media screen and (max-width: 1000px) {
    width: 45vw;
  }
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 20vw;
  margin-bottom: 10px;
  cursor: pointer;
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
const PButton = styled.img`
  padding : 10px;
  width: 20px;
  height: 20px;
`;

const Info = () =>{
  const[name, setName] = useState();
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();
  const [homepage, setHomepage] = useState();
  const [introduction, setIntroduction] = useState();
  const [notice, setNotice] = useState();
  //const [input1, setInput1] = useState("true");

  const[nameDisabled, setNameDisabled] = useState(true);
  const[phoneDisabled, setPhoneDisabled] = useState(true);
  const[addressDisabled, setAddressDisabled] = useState(true);
  const[hompageDisabled, setHompageDisabled] = useState(true);
  const[introductionDisabled, setIntroductionDisabled] = useState(true);
  const[noticeDisabled, setNoticeDisabled] = useState(true);

    return(
      <InfoBox>

        <FlexInputDiv>
          <TextField
          fullWidth
          disabled = {nameDisabled}
          label="상호명"
          type="text"
          variant="standard"
          value={name}
          onChange={(e) => setName(e.target.value)}
          />
          <PButton src={pencil} alt="pencil_image" onClick={(e) => setNameDisabled(!nameDisabled)}/>
            
            
          
        </FlexInputDiv>
        <FlexInputDiv>
          <TextField
          fullWidth
          disabled = {phoneDisabled}
          label="전화번호"
          type="text"
          variant="standard"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          />
          
          <PButton src={pencil} alt="pencil_image" onClick={(e) => setPhoneDisabled(!phoneDisabled)}/>
        </FlexInputDiv>
        <FlexInputDiv>
          <TextField
          fullWidth
          disabled = {addressDisabled}
          label="주소"
          type="text"
          variant="standard"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          />
          <PButton src={pencil} alt="pencil_image" onClick={(e) => setAddressDisabled(!addressDisabled)}/>
        </FlexInputDiv>
        <FlexInputDiv>
          <TextField
          fullWidth
          disabled = {hompageDisabled}
          label="홈페이지주소"
          type="text"
          variant="standard"
          value={homepage}
          onChange={(e) => setHomepage(e.target.value)}
          />
          <PButton src={pencil} alt="pencil_image"  onClick={(e) => setHompageDisabled(!hompageDisabled)}/>
        </FlexInputDiv>
        <FlexInputDiv>
          <TextField
          fullWidth
          disabled = {introductionDisabled}
          label="매장소개란"
          multiline
          rows={4}
          value={introduction}
          />
          <PButton src={pencil} alt="pencil_image"  onClick={(e) => setIntroductionDisabled(!introductionDisabled)}/>
        </FlexInputDiv>
        <FlexInputDiv>
          <TextField
          fullWidth
          disabled = {noticeDisabled}
          label="공지 사항"
          multiline
          rows={4}
          value={notice}
          />
          <PButton src={pencil} alt="pencil_image"  onClick={(e) => setNoticeDisabled(!noticeDisabled)}/>
        </FlexInputDiv>
        <InputDiv>
          <SButton>
            정보수정
          </SButton>
        </InputDiv>
      </InfoBox>
    );
};


export default Info;