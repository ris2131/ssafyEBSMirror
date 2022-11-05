

import styled from "styled-components";
import TextField from "@mui/material/TextField";
import pencil from "../../assets/Pencil.png";

import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
//import {useNavigate} from "react-router-dom";
import { infoApi } from "../../shared/infoApi";
import { info } from "../../redux/InfoSlice";
//import { set } from "immer/dist/internal";

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
  const[name, setName] = useState(""); // 이페이지에서 요로콤 이름을 핸들링하겠다  name이라는변수를 ("")초기값설정해두고 
  const [phone, setPhone] = useState("");// 내가 name을 변경하면 알아서 setname통해서 name변수를 바까라 대신에 요페이지한정
  const [address, setAddress] = useState("");
  const [homepage, setHomepage] = useState("");
  const [description, setDescription] = useState("");
  const [notice, setNotice] = useState("");
  
  const originName = useSelector((state) => state.info.profile.name) // state.
  const originPhone = useSelector((state) => state.info.profile.phone) // state.
  const originAddress = useSelector((state) => state.info.profile.address) // state.
  const originHomepage = useSelector((state) => state.info.profile.homepage) // state.
  const originDescription = useSelector((state) => state.info.profile.description) // state.
  const originNotice = useSelector((state) => state.info.profile.notice) // state.
  
  const[nameDisabled, setNameDisabled] = useState(true);
  const[phoneDisabled, setPhoneDisabled] = useState(true);
  const[addressDisabled, setAddressDisabled] = useState(true);
  const[hompageDisabled, setHompageDisabled] = useState(true);
  const[descriptionDisabled, setDescriptionDisabled] = useState(true);
  const[noticeDisabled, setNoticeDisabled] = useState(true);

  const dispatch = useDispatch();
  
  const fetchInfo = useCallback(() => {
    console.log("1");
    // infoApi.getinfo().then((Response) => setOriginData(Response)).then(console.log("2"));
    dispatch(info())
    // .then((res) => {console.log("!!!!!!!!!!!!"); console.log(res); }).catch(()=>console.log("??????????????")) 
    setName(originName);
    setPhone(originPhone);
    setAddress(originAddress);
    setHomepage(originHomepage);
    setDescription(originDescription);
    setNotice(originNotice);
    

  }, [originName,originPhone, originAddress, originHomepage, originDescription, originNotice]);
  //?

  useEffect(() => {
    fetchInfo();
  },[fetchInfo]);

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
        disabled = {descriptionDisabled}
        label="매장소개란"
        multiline
        rows={4}
        value={description}
        />
        <PButton src={pencil} alt="pencil_image"  onClick={(e) => setDescriptionDisabled(!descriptionDisabled)}/>
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