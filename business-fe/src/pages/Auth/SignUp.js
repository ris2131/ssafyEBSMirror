import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Toast } from "../../assets/Toast";

import {
  signup,
  checkEmail,
  // confirmEmail,
  // sendEmail,
  
  checkReg,
} from "../../redux/AuthSlice";

// style
import styled from "styled-components";
import TextField from "@mui/material/TextField";
//import MenuItem from "@mui/material/MenuItem";
//import Select from "@mui/material/Select";
import Swal from "sweetalert2";

import logoImage from '../../assets/Logo.png'


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
  background-color: #9D7F5C;
  padding: 8px;
  margin: 10px 20px;
  width: 20vw;
  cursor: pointer;
`;

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [emailCheck, setEmailCheck] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [regOwner, setRegOwner] = useState("");
  const [regFoundDate, setRegFoundDate] = useState("");
  const [regNum, setRegNum] = useState("");
  

  const [profile, setProfile] = useState("");
  const [preview, setPreview] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  );
  const [nickname, setNickname] = useState("");
  //const [page, setPage] = useState(1);
  //const [timeOn, setTimeOn] = useState(false);

  //이메일 형식
  const [emailStatus, setEmailStatus] = useState(false);

  
  const [emailPass, setEmailPass] = useState(false);
  const [regPass, setRegPass] = useState(false);

  const inputRef = useRef();
  const nicknameRef = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // 회원가입 요청
  const handleSubmit = () => {
    const data = {
      email,
      password,
      "owner" : regOwner,
      "registration" : regNum,
    };
    if(emailPass ===false){
      Toast.fire({
        icon: "error",
        title: "이메일 중복체크를 해주세요",
      });
      console.log("emailPass");
      return;
    }
    if (password !== passwordCheck) {
      Toast.fire({
        icon: "error",
        title: "비밀번호를 다시 확인해주세요",
      });
      console.log("diff pass");
      return;
    }
    if(regPass===false){
      Toast.fire({
        icon: "error",
        title: "사업자등록정보를 다시 확인해주세요",
      });
      console.log("diff regnumPass");
      return;
    }
    dispatch(signup(data))
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
  // 이메일 형식 체크 함수
  const handleEmailCheck = (email) => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    const check = !emailRegex.test(email) ? false : true;
    setEmailStatus(check);
  };
  
  //이메일 중복 확인 함수
  const handleEmailValidation = () => {
    const data = {
      email,
    };
    if (!emailStatus) {
      setEmailPass(false)
      Swal.fire({ icon: "error", title: "이메일 형식이 올바르지 않습니다" });
      return;
    }
    
    dispatch(checkEmail(data))
      .unwrap()
      .then((res) => {
        if (res.data === true) {
          //handleSendMail();
          setEmailPass(true);
          Swal.fire({ icon: "success", title: "사용 가능한 이메일입니다." });
        } else{
          setEmailPass(false);
          Swal.fire({ icon: "error", title: "이미 가입한 이메일입니다." });
        }
      })
      .catch((err) => console.error(err));
  };
  //사업자등록번호 인증 
  const handleRegistrationValidation = () => {
    const data = {
      businesses : [{
        b_no : regNum,
        start_dt : regFoundDate,
        p_nm : regOwner,
      }]
    }
    const businesses = [{
      b_no : regNum,
      start_dt : regFoundDate,
      p_nm : regOwner,
    }];
    //api 호출하고 then REGPASS 설정
    dispatch(checkReg(data))
      .unwrap()
      .then((res) => { 
        if(res.data[0].valid === "01"){
          setRegPass(true);
          Swal.fire({ icon: "success", title: "사업자등록번호 인증이 완료 되었습니다." });
        }else{
          setRegPass(false);
          Swal.fire({ icon: "error", title: "사업자등록번호 인증 실패." });
        }
      })
    
  };
  // const fetchState = useCallback(() => {
  //   setEmail(originData.email);
  //   setNickname(originData.nickname);
  //   setBirth(originData.birth_YMD);
  //   setPreview(originData.picturePath);
  // }, [originData]);


  return (
    <SignUpBox>
      <LogoImg src={logoImage} alt="#logo_image" />
      <LogoDiv>
        <LogoText>회원가입</LogoText>
      </LogoDiv>
      <FlexInputDiv>
        <TextField
          fullWidth
          label="ID (email)"
          variant="standard"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailPass(false);
            handleEmailCheck(e.target.value);
          }}
        />
        <SButton
          onClick={() => {
            handleEmailValidation();
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
        />
      </InputDiv>
      <InputDiv>
        <TextField
          fullWidth
          label="대표자명"
          variant="standard"
          value={regOwner}
          onChange={(e) => {
            setRegOwner(e.target.value);
            setRegPass(false);
          }}
        />
      </InputDiv>
      <InputDiv>
        <TextField
          fullWidth
          label="설립연월일(yymdd)"
          variant="standard"
          value={regFoundDate}
          onChange={(e) => {
            setRegFoundDate(e.target.value);
            setRegPass(false);
          }}
        />
      </InputDiv>
      <FlexInputDiv>
        <TextField
          fullWidth
          label="사업자등록번호"
          variant="standard"
          value={regNum}
          onChange={(e) => {
            setRegNum(e.target.value);
            setRegPass(false);
          }}
        />
        <SButton
          onClick={() => {
            //사업자등록번호 API
            setRegPass(false);
            handleRegistrationValidation();
          }}
        >
          인증하기
        </SButton>
      </FlexInputDiv>
      <SButton margin="7vw" onClick={handleSubmit}>
        가입하기
      </SButton>
      <IconDiv onClick={() => navigate("/login")}>로그인 페이지로</IconDiv>
      
    </SignUpBox>
  );
};

export default SignUp;
