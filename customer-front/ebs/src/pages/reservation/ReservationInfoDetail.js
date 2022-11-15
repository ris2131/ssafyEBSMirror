import {useState, useEffect, useRef} from "react";
import { useDispatch , useSelector} from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from "styled-components";


import Swal from "sweetalert2";
import {imgApi} from "../../api/imgApi";
import backButton from "../../assets/back_arrow.png";

const Container = styled.main`
  background-color: #DBD7CC;
  //background-color: #8a817c;
  // font-family: GowunBatang-Regular;
  display: flex;
  flex-direction: column;
  flex:1;
`;

const ButtonBox = styled.div`
  display: flex; 
  justify-content: start;
`;
const ButtonImg = styled.img`
  width: 20px;
  height: 20px;
`;

const ButtonText = styled.div`
  font-size:15px;
`;

const CardSection = styled.section`
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  flex: 0.6;
  justify-content: center;
  align-items: center;
`;
const CardContents = styled.div`
  background-color: #FFFFFF;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  flex: 0.6;
  
  width: 300px;
`;

const HeadTitleDiv = styled.div`
  display: flex; 
  font-size:30px;
  font-weight:bold;
  justify-content: center;
  margin-bottom: 10px;
`;
const ContentsDiv = styled.div`
  display:flex;
  flex-direction: column;
  margin-bottom: 30px;
`;
const TitleDiv = styled.div`
  display: flex; 
  font-weight: bold;
  justify-content: start;
  margin-bottom: 10px;
`;
const TextDiv = styled.div`
  display:flex;
  justify-content: start;
  margin-left: 20px;
`;
const PhotoTitle = styled.div`
  display: flex; 
  justify-content: center;
  font-size:25px;
  font-weight:bold;
`;
const PhotoSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const MyPhoto = styled.img`
  width: 250px;
  height: 200px;
  //padding: 10px;
  margin:10px;
  
`;
const PhotoText = styled.div`
  display: flex; 
  justify-content: end;
  margin-top: 5px;
  margin-right: 15px;
  &.displayNone{
    display:none;
  }
  &.addPhoto{
    color: blue;
  }
  &.deletePhoto{
    color: red;
  }
`;

const ReservationInfoDetail = () => {
  const [preview, setPreview] = useState("");//미리보기 사진
  const [photo, setPhoto] = useState("");
  const [photoNum, setPhotoNum ] = useState("");//사진 갯수
  
  //const photoList = useSelector((state) => state.designer.designers);
  //const photoList = location.state.photoList;
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const inputRef = useRef();

  const photoMounted = useRef(false);

  const reservation = location.state.item;
  const seq = {
      hairshopSeq : reservation.business_seq,
      reservationSeq : reservation.reservation_seq,
  }

  const move = () =>{
      navigate('/reservation-info');
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

  const handleAdd=()=>{
    console.log("사진 추가하기!");
    
    //post
    const formData = new FormData();
    formData.append("photo", photo);
    //dispatch
    imgApi.addReservationPhoto(formData,reservation.reservation_seq)
      .then(Swal.fire({icon: "success", title: "디자이너 수정되었습니다." 
      ,confirmButtonColor: '#688087'// confrim 버튼 색깔 지정
      ,iconColor:'#688087',//아이콘 색깔 설정.
    }))
      // .then(() => navigate("/reservation-info"))
      .catch(() => {
        Swal.fire({icon: "error", title: "정보를 확인해주세요"});
      });
  }
  const handleDelete=()=>{
    console.log("사진 삭제하기");
  }

  useEffect(()=>{
    if (!photoMounted.current) {
      photoMounted.current = true;
    } else {
      handleAdd();
    }
  },[photo]);

  return (
    <>
      <Container>
        <ButtonBox onClick={move}>
          <ButtonImg src={backButton} ></ButtonImg>
          <ButtonText>돌아가기</ButtonText>
        </ButtonBox>

        <CardSection> 
          <CardContents>
            <HeadTitleDiv>
                요청사항
            </HeadTitleDiv>
            <ContentsDiv>
              <TitleDiv>
                디자인 선택사항
              </TitleDiv>
              <TextDiv>
                {reservation.reservation_style?<div>{reservation.reservation_style}</div>:<></>}
              </TextDiv>
            </ContentsDiv>
            <ContentsDiv>
              <TitleDiv>
                서비스 선택사항
              </TitleDiv>
              <TextDiv>
                {reservation.reservation_service?<div>{reservation.reservation_service}</div>:<></>}
              </TextDiv>
            </ContentsDiv>
            <ContentsDiv>
              <TitleDiv>
                추가 선택사항
              </TitleDiv>
              <TextDiv>
                  {reservation.reservation_etc?<div>{reservation.reservation_etc}</div>:<></>}
              </TextDiv>
            </ContentsDiv>
            
            <PhotoTitle>헤어스타일 기록</PhotoTitle>
            <PhotoSection>
              {
                reservation.reservation_photo_list.length ? (
                  reservation.reservation_photo_list.map((photo, i) => {
                    return (
                        <MyPhoto src={photo} key={i}></MyPhoto>
                    );
                  })
                ) : <div>등록된 사진이 없습니다.</div>
              }
            </PhotoSection>
            <input
              id="file"
              type="file"
              name="file"
              style={{ display: "none" }}
              ref={inputRef}
              onChange={(e) => {
                if(e.target.files.length){
                  // changeImg(e);
                  setPhoto(e.target.files[0]);
                  encodeFileToBase64(e.target.files[0]);
                }
              }}
            />
            <PhotoText className='addPhoto' onClick={() => inputRef.current.click()}>
              사진 추가하기.
            </PhotoText>
            <PhotoText className='deletePhoto' onClick={handleDelete}>
              사진 삭제하기.
            </PhotoText>
          </CardContents>
        </CardSection>
      </Container>
    </>
  );
};

export default ReservationInfoDetail;