import styled from "styled-components";
import TextField from "@mui/material/TextField";
import Swal from "sweetalert2";

import pencil from "../../assets/Pencil.png";

import {useState, useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {getinfo} from "../../redux/InfoSlice";

import {imgApi} from "../../shared/imgApi";
import NavBar from "../../components/Navbar/NavBar";

import manageImg from "../../assets/manage_background.png"

const InfoMain = styled.main`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 100px;
  background: center / cover no-repeat url(${manageImg});
`;

const InfoSection = styled.section`
  width: 60%;
  align-items: center;
  background-color: #DCD7C9;
  border-radius: 30px;
  display: flex;
  flex: 0.9;
  flex-direction: row;
  justify-content: space-around;
  padding: 50px 100px;
  user-select: none;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const PimgBox = styled.div`
  width: 400px;
  height: 300px;
  overflow: hidden;
`;

const Pimg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px;
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
  padding: 10px;
  width: 20px;
  height: 20px;
`;

const Info = () => {

  const [preview, setPreview] = useState("");//default 박아두면 될듯
  const [photo, setPhoto] = useState("");//사진
  const [name, setName] = useState(""); // 이페이지에서 요로콤 이름을 핸들링하겠다  name이라는변수를 ("")초기값설정해두고
  const [phone, setPhone] = useState("");// 내가 name을 변경하면 알아서 setname통해서 name변수를 바까라 대신에 요페이지한정
  const [address, setAddress] = useState("");
  const [homepage, setHomepage] = useState("");
  const [description, setDescription] = useState("");
  const [notice, setNotice] = useState("");

  const inputRef = useRef();


  const originPhoto = useSelector((state) => state.info.profile.photo) // state. 
  const originName = useSelector((state) => state.info.profile.name) // state.
  const originPhone = useSelector((state) => state.info.profile.phone) // state.
  const originAddress = useSelector((state) => state.info.profile.address) // state.
  const originHomepage = useSelector((state) => state.info.profile.homepage) // state.
  const originDescription = useSelector((state) => state.info.profile.description) // state.
  const originNotice = useSelector((state) => state.info.profile.notice) // state.

  const [nameDisabled, setNameDisabled] = useState(true);
  const [phoneDisabled, setPhoneDisabled] = useState(true);
  const [addressDisabled, setAddressDisabled] = useState(true);
  const [hompageDisabled, setHompageDisabled] = useState(true);
  const [descriptionDisabled, setDescriptionDisabled] = useState(true);
  const [noticeDisabled, setNoticeDisabled] = useState(true);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const fetchInfo = (() => {
    dispatch(getinfo());
    console.log("fetch");
  });

  //컴포넌트가 렌더링 될 때 특정 작업을 실행할 수 있도록 하는 Hook
  useEffect(() => {
    fetchInfo();
  }, []);
  useEffect(() => {
    setPreview(originPhoto);
    setPhoto(originPhoto);
    setName(originName);
    setPhone(originPhone);
    setAddress(originAddress);
    setHomepage(originHomepage);
    setDescription(originDescription);
    setNotice(originNotice);
  }, [originPhoto, originName, originPhone, originAddress, originHomepage, originDescription, originNotice]);

  const clearImg = (e) => {
    setPreview(originPhoto);
    setPhoto(originPhoto);
  }
  const changeImg = (e) => {
    setPhoto(e.target.files[0]);
    setPreview(e.target.files[0]);
    console.log("photochanged");
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

    const formData = new FormData();
    const blob = new Blob([JSON.stringify(data)], {
      type: "application/json",
    });

    formData.append("data", blob);
    formData.append("photo", photo);

    imgApi.modifyinfo(formData)
      .then(() => {
        Swal.fire({icon: "success", 
          title: "매장정보가 수정되었습니다!",
          confirmButtonColor: '#688087', // confrim 버튼 색깔 지정
          iconColor:'#688087',//아이콘 색깔 설정.
        })
          //.then(()=>{window.location.reload()});
          .then(() => {
            navigate("/")
          });
      })
      .catch((err) => {
        if (err.response.status === 409) {
          Swal.fire({icon: "error", title: "닉네임 중복입니다!"});
        }
      });

  };

  return (
    <>
      <NavBar></NavBar>
      <InfoMain>
        <InfoSection>
          <InputBox>
            <PimgBox>
              <Pimg src={preview} alt="#hairshop_image"></Pimg>
            </PimgBox>
            <input
              id="file"
              type="file"
              name="file"
              style={{display: "none"}}
              ref={inputRef}
              onChange={(e) => {
                if (e.target.files.length) {
                  changeImg(e);
                  encodeFileToBase64(e.target.files[0]);
                }
              }}/>
            <ImgTextBox>
              <ImgText color="#42a5f5" onClick={() => inputRef.current.click()}>
                변경
              </ImgText>
              <ImgText color="#42a5f5" onClick={() => clearImg()}>
                초기화
              </ImgText>
            </ImgTextBox>
          </InputBox>
          <InputBox>
            <FlexInputDiv>
              <TextField
                fullWidth
                disabled={nameDisabled}
                label="상호명"
                type="text"
                variant="standard"
                value={name}
                onChange={(e) => setName(e.target.value)}/>
              <PButton src={pencil} alt="pencil_image" onClick={(e) => setNameDisabled(!nameDisabled)}/>
            </FlexInputDiv>
            <FlexInputDiv>
              <TextField
                fullWidth
                disabled={phoneDisabled}
                label="전화번호"
                type="text"
                variant="standard"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}/>
              <PButton src={pencil} alt="pencil_image" onClick={(e) => setPhoneDisabled(!phoneDisabled)}/>
            </FlexInputDiv>
            <FlexInputDiv>
              <TextField
                fullWidth
                disabled={addressDisabled}
                label="주소"
                type="text"
                variant="standard"
                value={address}
                onChange={(e) => setAddress(e.target.value)}/>
              <PButton src={pencil} alt="pencil_image" onClick={(e) => setAddressDisabled(!addressDisabled)}/>
            </FlexInputDiv>
            <FlexInputDiv>
              <TextField
                fullWidth
                disabled={hompageDisabled}
                label="홈페이지주소"
                type="text"
                variant="standard"
                value={homepage}
                onChange={(e) => setHomepage(e.target.value)}/>
              <PButton src={pencil} alt="pencil_image" onClick={(e) => setHompageDisabled(!hompageDisabled)}/>
            </FlexInputDiv>
            <FlexInputDiv>
              <TextField
                fullWidth
                disabled={descriptionDisabled}
                label="매장소개란"
                multiline
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}/>
              <PButton src={pencil} alt="pencil_image" onClick={(e) => setDescriptionDisabled(!descriptionDisabled)}/>
            </FlexInputDiv>
            <FlexInputDiv>
              <TextField
                fullWidth
                disabled={noticeDisabled}
                label="공지 사항"
                multiline
                rows={4}
                value={notice}
                onChange={(e) => setNotice(e.target.value)}/>
              <PButton src={pencil} alt="pencil_image" onClick={(e) => setNoticeDisabled(!noticeDisabled)}/>
            </FlexInputDiv>
            <InputDiv>
              <SButton onClick={handleSubmit}>
                정보수정
              </SButton>
            </InputDiv>
          </InputBox>
        </InfoSection>
      </InfoMain>
    </>
  );
};


export default Info;