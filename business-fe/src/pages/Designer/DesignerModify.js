import styled from "styled-components";
import TextField from "@mui/material/TextField";

import Swal from "sweetalert2";

import {useState, useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate,useLocation} from "react-router-dom";

import { modifyDesigner, getDesignerInfo, deleteDesigner} from "../../redux/DesignerSlice";
import NavBar from "../../components/Navbar/NavBar";

import testImage from '../../assets/Logo.png'

import {imgApi} from "../../shared/imgApi";

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
  padding: 10px;
  margin-top: 40px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  &.submit{
    background-color: #9D7F5C;
  }
  &.delete {
    background-color: #ff00007f;
  }
`;

const DesignerModify = () => {
  const {state} = useLocation();//미리 가져오는

  
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [preview, setPreview] = useState("");//미리보기 사진
  const [photo, setPhoto] = useState("");
  const [designerSeq, setDesignerSeq] = useState("");

  const originName = useSelector((state) => state.designer.designers.name) // state.
  const originDescription = useSelector((state) => state.designer.designers.description) // state.
  const originPhoto = useSelector((state) => state.designer.designers.photo) // state.
  const originDesignerSeq = useSelector((state) => state.designer.designers.designer_seq) // state.

  const inputRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // useEffect(()=>{
  // },[]);

  useEffect(() => {
    dispatch(getDesignerInfo(state));
    setName(originName);
    setDescription(originDescription);
    setPreview(originPhoto);
    setPhoto(originPhoto);
    setDesignerSeq(originDesignerSeq);
  }, [ dispatch, state, originName, originDescription, originPhoto, originDesignerSeq]);

  const clearImg = (e)=>{
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
  //impApi
  const handleModify = () => {
    const data = {
      name,
      description,
      "designer_seq":designerSeq, 
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
    imgApi.modifyDesigner(formData)
      .then(Swal.fire({icon: "success", title: "디자이너 수정되었습니다." 
      ,confirmButtonColor: '#688087'// confrim 버튼 색깔 지정
      ,iconColor:'#688087',//아이콘 색깔 설정.
     }))
      .then(() => navigate("/designer"))
      .catch(() => {
        Swal.fire({icon: "error", title: "정보를 확인해주세요"});
      });
  };

  const handleDelete = () => {
    //const designer_seq = designerSeq;
    const data = {
      "designer_seq" : designerSeq, 
    }
    //console.log("seq::" +data.designer_seq);
    dispatch(deleteDesigner(data))
      .unwrap()
      .then(Swal.fire({icon: "success", title: "디자이너 삭제되었습니다." 
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
              type="text"
              label="디자이너이름"
              variant="standard"
              value={name||""}
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
              value={description||""}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FlexInputDiv>
          <ButtonDiv>
            <SButton onClick={handleModify} className={"submit"}>
              디자이너 수정
            </SButton>
            <SButton onClick={handleDelete} className={"delete"}>
              디자이너 삭제
            </SButton>
            
          </ButtonDiv>
        </DesignerSection>
      </DesignerMain>
    </>
  );
};
export default DesignerModify;