import {useState, useEffect, useRef} from "react";
import { useDispatch , useSelector} from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from "styled-components";

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
  justify-content: center;
  font-size:30px;
  font-weight:bold;
`;
const TitleDiv = styled.div`
  display: flex; 
  justify-content: start;
`;
const PhotoTitle = styled.div`
  display: flex; 
  justify-content: center;
  font-size:30px;
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

  const reservation = location.state.item;
  const seq = {
      hairshopSeq : reservation.businessSeq
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
    console.log("사진 추가하기");
  }
  const handleDelete=()=>{
    console.log("사진 삭제하기");
  }

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
            <TitleDiv>
              디자인 선택사항
            </TitleDiv>
            <div>
              {reservation.reservationStyle?<div>{reservation.reservationStyle}</div>:<></>}
            </div>
            <TitleDiv>
              서비스 선택사항
            </TitleDiv>
            <div>
              {reservation.reservationService?<div>{reservation.reservationService}</div>:<></>}
            </div>
            <TitleDiv>
              추가 선택사항
            </TitleDiv>
            <div>
                {reservation.reservationEtc?<div>{reservation.reservationEtc}</div>:<></>}
            </div>
            <PhotoTitle>나의 사진</PhotoTitle>
            <PhotoSection>
              {/* {
                photoList.length ? (
                  photoList.map((photo) => {
                    return (
                        <MyPhoto src={photo}></MyPhoto>
                        
                        <EditButton value={designer["designer_seq"]}
                                    onClick={(e) => handleEdit(e.target.value)}>편집</EditButton>
                        
                    );
                  })
                ) : <div>등록된 디자이너가 없습니다.</div>
              } */}
              {/* <MyPhoto></MyPhoto>
              <MyPhoto></MyPhoto>
              <MyPhoto></MyPhoto> */}
            </PhotoSection>
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
            <PhotoText className='addPhoto' onClick={handleAdd}>
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