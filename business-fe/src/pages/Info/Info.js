

import styled from "styled-components";
import TextField from "@mui/material/TextField";
import Swal from "sweetalert2";

import pencil from "../../assets/Pencil.png";

import { useState, useEffect, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate} from "react-router-dom";
import { getinfo, modifyinfo } from "../../redux/InfoSlice";
//import { set } from "immer/dist/internal";

const InfoBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const InputBox = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
height: 100vh;
`;


const PimgBox = styled.div`
  width: 400px;
  height: 300px;
  overflow: hidden;
`;

const Pimg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ImgTextBox = styled.div`
  display: flex;
  align-items: end;
`;

const ImgText = styled.p`
  font-size: 16px;
  margin: 5px;
  color: ${(props) => props.color};
  cursor: pointer;
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
  
  const [preview, setPreview] = useState("../../assets/Logo_trans.png");//default 박아두면 될듯
  const [photo, setPhoto] = useState("");//사진
  const[name, setName] = useState(""); // 이페이지에서 요로콤 이름을 핸들링하겠다  name이라는변수를 ("")초기값설정해두고 
  const [phone, setPhone] = useState("");// 내가 name을 변경하면 알아서 setname통해서 name변수를 바까라 대신에 요페이지한정
  const [address, setAddress] = useState("");
  const [homepage, setHomepage] = useState("");
  const [description, setDescription] = useState("");
  const [notice, setNotice] = useState("");
  
  const inputRef = useRef();


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

  const navigate = useNavigate();

  const fetchInfo = useCallback(() => {
    // infoApi.getinfo().then((Response) => setOriginData(Response)).then(console.log("2"));
    dispatch(getinfo());
    // .then((res) => {console.log("!!!!!!!!!!!!"); console.log(res); }).catch(()=>console.log("??????????????")) 
    setName(originName);
    setPhone(originPhone);
    setAddress(originAddress);
    setHomepage(originHomepage);
    setDescription(originDescription);
    setNotice(originNotice);
  }, [originName,originPhone, originAddress, originHomepage, originDescription, originNotice]);
  
  //컴포넌트가 렌더링 될 때 특정 작업을 실행할 수 있도록 하는 Hook
  useEffect(() => {
    fetchInfo();
  },[fetchInfo]);

  const changeImg = (e) => {
    setPhoto(e.target.files[0]);
  };
  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setPreview(reader.result);
        resolve();
      };
    });
  };

  const handleSubmit = () => {
    const data = {
      name,
      phone, 
      address,
      homepage,
      description,
      notice,
    };
    dispatch(modifyinfo(data))
      .unwrap()
      .then(Swal.fire({ icon: "success", title: "수정 완료되었습니다." }))
      .then(() => navigate("/"))
      .catch(() => {
        Swal.fire({ icon: "error", title: "정보를 확인해주세요" });
      });
  };

  return(
    <InfoBox>
      <InputBox>
        <PimgBox>
          <Pimg src={preview} alt="#"></Pimg>
        </PimgBox>
        <input
          id="file"
          type="file"
          name="file"
          style={{ display: "none" }}
          ref={inputRef}
          onChange={(e) => {
            changeImg(e);
            encodeFileToBase64(e.target.files[0]);
          }}
        />
        <ImgTextBox>
          <ImgText color="#42a5f5" onClick={() => inputRef.current.click()}>
            변경
          </ImgText>
        </ImgTextBox>
      </InputBox>
      <InputBox>
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
          onChange={(e) => setDescription(e.target.value)}
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
          onChange={(e) => setNotice(e.target.value)}
          />
          <PButton src={pencil} alt="pencil_image"  onClick={(e) => setNoticeDisabled(!noticeDisabled)}/>
        </FlexInputDiv>
        <InputDiv>
          <SButton onClick={handleSubmit}>
            정보수정
          </SButton>
        </InputDiv>
      </InputBox>
    </InfoBox>
  );
};


export default Info;