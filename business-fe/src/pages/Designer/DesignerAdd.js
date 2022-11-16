import styled from "styled-components";
import TextField from "@mui/material/TextField";

import Swal from "sweetalert2";

import {useState,useEffect ,useRef} from "react";
import {useNavigate} from "react-router-dom";

import NavBar from "../../components/Navbar/NavBar";
import {imgApi} from "../../shared/imgApi";

import designerBackground from "../../assets/designer_background.png";

const defaultImage= "https://business.ssafy-ebs.com/photo/designer/default.jpg";

const DesignerMain = styled.main`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  padding: 50px 100px;
  align-items: center;
  background: center / cover no-repeat url(${designerBackground});
`;

const DesignerSection = styled.section`
  width: 60%;
  align-items: center;
  background-color: #DCD7C9;
  border-radius: 50px;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  padding: 50px;
  position: relative;
  
  @media screen and (max-width: 1000px) {
    width: 80%;
  }
`;

const HeadDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0 10px 75px 10px;
  user-select: none;
`;

const TitleDiv = styled.div`
  font-family: 'Do Hyeon', sans-serif;
  font-size: 60px;
`;

const InputDiv = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 10px 30px 10px;
`;

const ProfileDiv = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  margin: 0 50px 0 10px;
`;

const PImgBox = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid 1px #3f3f3f;
  border-radius: 10px;
  box-shadow: #7f7f7f 5px 5px 5px;
  user-select: none;
  overflow: hidden;
  background-color: #fdfdfd;
`;

const Pimg = styled.img`
  max-width: 100%;
  max-height: 100%;
  //border-radius: 10px;
`;

const ButtonDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 20px;
`;

const ImgButton = styled.button`
  border-radius: 5px;
  color: #ffffff;
  border: none;
  padding: 5px 10px;
  margin: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition-duration: 200ms;

  &.edit {
    background-color: #5d7576;
  }

  &.edit:hover {
    background-color: #3F4E4F;
    transition-duration: 200ms;
  }
  
  &.delete {
    background-color: #5f5f5f7f;
  }

  &.delete:hover {
    background-color: #5f5f5fbf;
    transition-duration: 200ms;
  }
`;

const TextInputDiv = styled.div`
  width: 60%;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
`;

const FlexInputDiv = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: space-between;
  margin: 0 10px 10px 10px;
  
  & > div > label {
    font-weight: bold;
    font-size: 18px;
  }
`;

const SButton = styled.button`
  position: absolute;
  right: 30px;
  bottom: 30px;
  border-radius: 5px;
  color: white;
  border: none;
  background-color: #9D7F5C;
  padding: 10px 20px;
  margin: 0 50px 50px 0;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition-duration: 200ms;
  
  &:hover {
    background-color: #CCA578;
    transition-duration: 200ms;
  }
`;

const DesignerAdd = () => {
  const [preview, setPreview] = useState("");//미리보기 사진
  const [photo, setPhoto] = useState("");//보낼 파일 사진
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const inputRef = useRef();
  const navigate = useNavigate();
  
  useEffect(()=>{
    setPreview(defaultImage);
    setPhoto(defaultImage);
  },[]);

  const clearImg = ()=>{
    setPreview(defaultImage);
    setPhoto(defaultImage);
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
      description,
    };
    //exception
    if (name === "") {
      Swal.fire({icon: "error", title: "디자이너 이름을 확인해주세요."});
      return;
    }
    //post
    const formData = new FormData();
    const blob = new Blob([JSON.stringify(data)], {
      type: "application/json",
    }); 
    formData.append("data", blob);
    formData.append("photo", photo);

    //dispatch
    imgApi.addDesigner(formData)
      .then(Swal.fire({icon: "success", title: "디자이너 추가되었습니다." 
      ,confirmButtonColor: '#688087'// confrim 버튼 색깔 지정
      ,iconColor:'#688087',//아이콘 색깔 설정.
     }))
      .then(() => navigate("/designer"))
      .catch(() => {
        Swal.fire({icon: "error", title: "정보를 확인해주세요"});
      });
  };

  return (
    <>
      <NavBar></NavBar>
      <DesignerMain>
        <DesignerSection>
          <HeadDiv>
            <TitleDiv>새로운 디자이너</TitleDiv>
          </HeadDiv>
          <InputDiv>
            <ProfileDiv>
              <PImgBox>
                <Pimg src={preview} alt="#hairshop_image"></Pimg>
                <input
                  id="file"
                  type="file"
                  name="file"
                  style={{ display: "none" }}
                  ref={inputRef}
                  onChange={(e) => {
                    if(e.target.files.length){
                      changeImg(e);
                      encodeFileToBase64(e.target.files[0]);
                    }
                  }}
                />
              </PImgBox>
              <ButtonDiv>
                <ImgButton className={"edit"} onClick={() => inputRef.current.click()}>
                  변경
                </ImgButton>
                <ImgButton className={"delete"} onClick={() => clearImg()}>
                  초기화
                </ImgButton>
              </ButtonDiv>
            </ProfileDiv>
            <TextInputDiv>
              <FlexInputDiv>
                <TextField
                  fullWidth
                  inputProps={{style: {fontSize: 20}}}
                  label="디자이너 이름"
                  type="text"
                  variant="standard"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FlexInputDiv>
              <FlexInputDiv>
                <TextField
                  fullWidth
                  inputProps={{style: {fontSize: 20}}}
                  label="디자이너 소개멘트"
                  type="text"
                  multiline
                  rows={8}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </FlexInputDiv>
            </TextInputDiv>
          </InputDiv>
          <SButton onClick={handleSubmit}>디자이너 추가</SButton>
        </DesignerSection>
      </DesignerMain>
    </>
  );
};
export default DesignerAdd;