import styled from "styled-components";
import TextField from "@mui/material/TextField";

import Swal from "sweetalert2";

import {useState,useEffect ,useRef} from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import NavBar from "../../components/Navbar/NavBar";

//import defaultImage from '../../assets/Logo.png';

import {imgApi} from "../../shared/imgApi";

const defaultImage= "https://business.ssafy-ebs.com/photo/designer/default.jpg";

const DesignerMain = styled.main`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  padding: 20px 100px;
  align-items: center;
`;

const DesignerSection = styled.section`
  @media screen and (max-width: 1000px) {
    width: 60%;
  }
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  //background-color: #cfcfcf;
  padding: 40px;
  //box-shadow: #3f3f3f 10px 10px 5px;
`;

const ProfileDiv = styled.div`
  width: 100%;
  display: flex;
  align-items: end;
  margin-bottom: 80px;
`;

const Pimg = styled.img`
  width: 150px;
  height: 150px;
  border: solid 1px #3f3f3f;
  border-radius: 10px;
  box-shadow: #7f7f7f 5px 5px 5px;
  user-select: none;
`;

const ImgButton = styled.button`
  border-radius: 5px;
  color: white;
  border: none;
  padding: 5px;
  margin: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;

  &.edit {
    background-color: #1e90ff7f;
  }
  
  &.delete {
    background-color: #ff00007f;
  }
`;

const FlexInputDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const ButtonDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 10px;
`;

const SButton = styled.button`
  border-radius: 5px;
  color: white;
  border: none;
  background-color: #9D7F5C;
  padding: 10px;
  margin-top: 40px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
`;

const DesignerAdd = () => {
  const [preview, setPreview] = useState("");//미리보기 사진
  const [photo, setPhoto] = useState("");//보낼 파일 사진
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const inputRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  useEffect(()=>{
    setPreview(defaultImage);
    setPhoto(defaultImage);
  },[]);

  const clearImg = (e)=>{
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
          <ProfileDiv>
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
            <ImgButton className={"edit"} onClick={() => inputRef.current.click()}>
              변경
            </ImgButton>
            <ImgButton className={"delete"} onClick={() => clearImg()}>
              초기화
            </ImgButton>
          </ProfileDiv>
          <FlexInputDiv>
            <TextField
              fullWidth
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
              label="디자이너 소개페이지"
              type="text"
              multiline
              rows={8}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FlexInputDiv>
          <ButtonDiv>
            <SButton onClick={handleSubmit}>
              디자이너 추가
            </SButton>
          </ButtonDiv>
        </DesignerSection>
      </DesignerMain>
    </>
  );
};
export default DesignerAdd;