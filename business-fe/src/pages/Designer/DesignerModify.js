import styled from "styled-components";
import TextField from "@mui/material/TextField";

import Swal from "sweetalert2";

import {useState, useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useLocation} from "react-router-dom";

import {getDesignerInfo, deleteDesigner} from "../../redux/DesignerSlice";
import NavBar from "../../components/Navbar/NavBar";
import {imgApi} from "../../shared/imgApi";

import designerBackground from "../../assets/designer_background.png";

const DesignerMain = styled.main`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  padding: 50px 100px;
  align-items: center;
  background: center / cover no-repeat fixed url(${designerBackground});
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

const ConfirmButtonDiv = styled.div`
  position: absolute;
  right: 30px;
  bottom: 30px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const SButton = styled.button`
  border-radius: 5px;
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 0 50px 50px 0;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition-duration: 200ms;

  &.submit {
    background-color: #9D7F5C;
  }

  &.submit:hover {
    background-color: #CCA578;
    transition-duration: 200ms;
  }

  &.delete {
    background-color: #ff00005f;
  }

  &.delete:hover {
    background-color: #ff0000bf;
    transition-duration: 200ms;
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
  }, [dispatch, state, originName, originDescription, originPhoto, originDesignerSeq]);

  const clearImg = () => {
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
      "designer_seq": designerSeq,
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
      "designer_seq": designerSeq,
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
          <HeadDiv>
            <TitleDiv>{originName} 디자이너 수정</TitleDiv>
          </HeadDiv>
          <InputDiv>
            <ProfileDiv>
              <PImgBox>
                <Pimg src={preview} alt="#hairshop_image"></Pimg>
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
                  label="디자이너이름"
                  type="text"
                  variant="standard"
                  value={name || ""}
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
                  value={description || ""}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </FlexInputDiv>
            </TextInputDiv>
          </InputDiv>
          <ConfirmButtonDiv>
            <SButton onClick={handleDelete} className={"delete"}>
              디자이너 삭제
            </SButton>
            <SButton onClick={handleModify} className={"submit"}>
              디자이너 수정
            </SButton>
          </ConfirmButtonDiv>
        </DesignerSection>
      </DesignerMain>
    </>
  );
};
export default DesignerModify;