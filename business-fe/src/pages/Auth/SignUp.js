import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  // checkEmail,
  // confirmEmail,
  // sendEmail,
  signup,
} from "../../redux/AuthSlice";
//import { Toast } from "../../assets/Toast";

//import GoogleComponent from "../OauthLogin/GoogleComponent";

// style
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
//import { GrLinkNext } from "react-icons/gr";
//import { GrLinkPrevious } from "react-icons/gr";
//import { TbCameraPlus } from "react-icons/tb";
import Swal from "sweetalert2";
//import Timer from "./components/Timer";

//const backgroundImage = process.env.PUBLIC_URL + `/assets/testground.jpg`;

import logoImage from '../../assets/logo.jpg'


const SignUpBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const LogoDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const LogoImg = styled.img`
  @media screen and (max-width: 821px) {
    width: 70px;
    height: 70px;
  }

  width: 100px;
  height: 100px;
`;

const LogoText = styled.h1`
  @media screen and (max-width: 821px) {
    font-size: 60px;
  }
  text-shadow: -1px 0 #000, 0 1px #000, 1px 0 #000, 0 -1px #000;
  font-size: 30px;
  font-family: OKDDUNG;
  margin: 10px;
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

const CheckButton = styled.button`
  margin-top: 20px;
  margin-left: 20px;
  border: none;
  border-radius: 10px;
  background-color: ${(props) => props.back};
  padding: 5px;
  color: white;
  width: 100px;
  cursor: ${(props) => props.pointer};
`;

const InputDiv = styled.div`
  @media screen and (max-width: 1000px) {
    width: 45vw;
  }
  width: 20vw;
  margin-bottom: 10px;
`;

const IconDiv = styled.div`
  @media screen and (max-width: 1000px) {
  }
  font-size: 18px;

  margin: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const SButton = styled.button`
  @media screen and (max-width: 1000px) {
    width: 45vw;
  }

  border-radius: 5px;
  color: white;
  border: none;
  background-color: #947EFF;
  padding: 8px;
  margin: 10px 20px;
  width: 20vw;
  cursor: pointer;
`;

const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ProfileBox = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 70%;
  overflow: hidden;
`;

const Profileimg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const DateWrapper = styled.div`
  @media screen and (max-width: 1000px) {
    width: 45vw;
  }
  display: flex;
  align-items: center;
  width: 20vw;
`;

const MarginBox = styled.div`
  @media screen and (max-width: 1000px) {
  }
`;

const SelectBox = styled.div`
  margin: 0px 10px;
`;

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [emailCheck, setEmailCheck] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [represent, setRepresent] = useState("");
  const [registrationNum, setRegistrationNum] = useState("");
  

  const [profile, setProfile] = useState("");
  const [preview, setPreview] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  );
  const [nickname, setNickname] = useState("");
  const [page, setPage] = useState(1);
  const [emailPass, setEmailPass] = useState(false);
  const [timeOn, setTimeOn] = useState(false);

  const [emailStatus, setEmailStatus] = useState(false);

  const inputRef = useRef();
  const nicknameRef = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();
// 회원가입 요청
const handleSubmit = () => {
  const data = {
    provider: "G",
    username: email,
    password,
    nickname,
  };

  const formData = new FormData();

  const blob = new Blob([JSON.stringify(data)], { type: "application/json" });

  formData.append("data", blob);
  formData.append("profile_image", profile);

  dispatch(signup(formData))
    .unwrap()
    .then(() => {
      Swal.fire({ icon: "success", title: "회원가입 완료!" });
      navigate("/");
    })
    .catch((err) => {
      if (err.status === 409) {
        Swal.fire({ icon: "error", title: "중복된 닉네임입니다!" });
      }
    });
};

  return (
    
    <SignUpBox>
      <LogoImg src={logoImage} alt="#logo_image" />
      <LogoDiv>
        <LogoText>회원가입</LogoText>
      </LogoDiv>
      {page === 1 ? (
        <>
          <FlexInputDiv>
            <TextField
              fullWidth
              label="ID (email)"
              variant="standard"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                //handleEmailCheck(e.target.value);
              }}
            />
            <SButton
              onClick={() => {
                //getCode();
              }}
            >
              중복 체크
            </SButton>
          </FlexInputDiv>
          
          <InputDiv>
            <TextField
              fullWidth
              label="password"
              type="password"
              variant="standard"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputDiv>
          <InputDiv>
            <TextField
              fullWidth
              label="password check"
              type="password"
              variant="standard"
              value={passwordCheck}
              onChange={(e) => setPasswordCheck(e.target.value)}
              onKeyPress={(e) => (e.key === "Enter" ? setPage(2) : null)}
            />
          </InputDiv>
          <InputDiv>
            <TextField
              fullWidth
              label="대표자명"
              variant="standard"
              value={represent}
              onChange={(e) => {
                setRepresent(e.target.value);
                //handleEmailCheck(e.target.value);
              }}
            />
          </InputDiv>
          <InputDiv>
            <TextField
              fullWidth
              label="설립연월일(yymdd)"
              variant="standard"
              value={represent}
              onChange={(e) => {
                setRepresent(e.target.value);
                //handleEmailCheck(e.target.value);
              }}
            />
          </InputDiv>
          <FlexInputDiv>
            <TextField
              fullWidth
              label="사업자등록번호"
              variant="standard"
              value={registrationNum}
              onChange={(e) => {
                setRegistrationNum(e.target.value);
                //handleEmailCheck(e.target.value);
              }}
            />
            <SButton
              onClick={() => {
                //getCode();
              }}
            >
              인증하기
            </SButton>
          </FlexInputDiv>
          <SButton margin="7vw" onClick={handleSubmit}>
            가입하기
          </SButton>
          <IconDiv onClick={() => navigate("/login")}>로그인 페이지로</IconDiv>
        </>
      ) : (
        <>
          <h1>프로필 입력</h1>
          <InputDiv>
            <ProfileContainer>
              <ProfileSection>
                <ProfileBox>
                  <Profileimg src={preview} alt="" />
                </ProfileBox>
                <input
                  type="file"
                  name="file"
                  onChange={(e) => {
                    //changeImg(e);
                    //encodeFileToBase64(e.target.files[0]);
                  }}
                  ref={inputRef}
                  style={{ display: "none" }}
                />
                <div style={{ fontSize: "20px", marginTop: "5px" }}>
                  {/* <TbCameraPlus
                    onClick={() => inputRef.current.click()}
                    style={{ cursor: "pointer" }}
                  /> */}
                </div>
              </ProfileSection>
            </ProfileContainer>
          </InputDiv>
          <InputDiv>
            <TextField
              fullWidth
              label="닉네임"
              ref={nicknameRef}
              variant="standard"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </InputDiv>
          <DateWrapper>
            <TextField
              fullWidth
              label="년(4자)"
              variant="standard"
              //value={year}
              //onChange={handleYear}
            />
            <SelectBox>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                //value={month}
                //onChange={handleMonth}
                label="월"
              >
              </Select>
            </SelectBox>
            <TextField
              fullWidth
              label="일"
              variant="standard"
              //onChange={handleDay}
            />
          </DateWrapper>
          <IconDiv>
            {/* <GrLinkPrevious onClick={handlePage} /> */}
          </IconDiv>
          <SButton margin="7vw" onClick={handleSubmit}>
            회원가입
          </SButton>
        </>
      )}
    </SignUpBox>
  );
};

export default SignUp;
