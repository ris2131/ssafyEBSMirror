import {useState, useEffect, useRef} from "react";
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import styled from "styled-components";
import imageCompression from "browser-image-compression";
import Swal from "sweetalert2";

import { getreservations,deletePhoto } from "../../store/slices/reservationSlice";
import {imgApi} from "../../api/imgApi";
import backButton from "../../assets/back_arrow.png";
import eraseButton from "../../assets/red_x_button.png";
const Container = styled.main`
  background-color: #DBD7CC;
  //background-color: #8a817c;
  font-family: GowunBatang-Regular, 'sans-serif';
  display: flex;
  flex-direction: column;
  flex:1;
  padding-bottom: 30px
`;

const ButtonBox = styled.button`
  display: flex; 
  justify-content: start;
  margin: 15px 10px;
  width: 100px;
  background-color: transparent;
  border:0;
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
  flex: 0.9;
  justify-content: center;
  align-items: center;
  border:30px;
`;
const CardContents = styled.div`
  background-color: #FFFFFF;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  flex: 0.6;
  padding: 15px 10px;
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
  margin-left: 10px;
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
const PhotoDiv = styled.div`
  position: relative;
  padding: 10px;
`;

const MyPhoto = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
`;
const MyPhotoEraseButton= styled.img`
  width: 40px;
  height: 40px;
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(7px, -7px);
  cursor:pointer;
`;
const PhotoText = styled.div`
  display: flex; 
  justify-content: end;
  margin-top: 5px;
  margin-right: 15px;
  font-weight:bold;
  &.displayNone{
    display:none;
  }
  &.addPhoto{
    color: black;
  }
  &.deletePhoto{
    color: red;
  }
`;

const ReservationInfoDetail = () => {
  const [preview, setPreview] = useState("");//미리보기 사진
  const [photo, setPhoto] = useState("");
  const [photoNum, setPhotoNum ] = useState("");//사진 갯수
  const [showErase,setShowErase] = useState(false);//삭제 버튼  

  //const photoList = useSelector((state) => state.designer.designers);
  //const photoList = location.state.photoList;
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const inputRef = useRef();

  const photoMounted = useRef(false);

  const reservation = location.state.item;
  useEffect(() => {
    dispatch(getreservations()).then((res) => {
      console.log("detail 에서 getreservation Res 수정.. :"+JSON.stringify(res));
    });
  }, []);

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

  const actionImgCompress = async (fileSrc) => {
    console.log("압축 시작");

    const options = {
      maxSizeMB: 0.2,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    try {
      // 압축 결과
      const compressedFile = await imageCompression(fileSrc, options);
      setPhoto(compressedFile);

      // const reader = new FileReader();
      // reader.readAsDataURL(compressedFile);
      // reader.onloadend = () => {
      //   const base64data = reader.result;
      //   imageHandling(base64data);
      // };
      console.log("size "+fileSrc.size+" -> "+compressedFile.size );
    } catch (error) {
      console.log(error);
    }
  };


  const handleAdd=()=>{
    console.log("사진 추가하기!");
    
    //post
    const formData = new FormData();
    formData.append("photo", photo);
    //dispatch
    imgApi.addReservationPhoto(formData,reservation.reservation_seq)
      .then(Swal.fire({icon: "success", title: "사진이 추가되었습니다." 
      ,confirmButtonColor: '#688087'// confrim 버튼 색깔 지정
      ,iconColor:'#688087',//아이콘 색깔 설정.
    }))
      .then(() => navigate("/reservation-info"))
      //.then(window.location.reload())
      .catch(() => {
        Swal.fire({icon: "error", title: "정보를 확인해주세요"});
      });
  }
  const handleShowErase=()=>{
    console.log("사진삭제 띄우기");
    setShowErase(!showErase);
  }
 
  const handleDelete=(url)=>{
    console.log("사진 삭제이미지 클릭"+url);
    Swal.fire({
      title: '사진을 삭제 하시겠습니까?',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: 'No',
      customClass: {
        actions: 'my-actions',
        confirmButton: 'order-1',
        denyButton: 'order-2',
      }
    }).then((result) => {
      //yes 눌렀을때
      if (result.isConfirmed) {
        dispatch(deletePhoto(url))
        .then(Swal.fire({icon: "success", title: "사진이 삭제되었습니다." 
          ,confirmButtonColor: '#688087'// confrim 버튼 색깔 지정
          ,iconColor:'#688087',//아이콘 색깔 설정.
        }))
        .then(() => navigate("/reservation-info"))
        //.then(window.location.reload())
        .catch(() => {
          Swal.fire({icon: "error", title: "정보를 확인해주세요"});
        });
      } else if (result.isDenied) {
        Swal.fire('사진 삭제가 취소되었습니다', '', 'info')
      }
    });

    // dispatch(deletePhoto(url))
    // .then(Swal.fire({icon: "success", title: "사진이 삭제되었습니다." 
    //   ,confirmButtonColor: '#688087'// confrim 버튼 색깔 지정
    //   ,iconColor:'#688087',//아이콘 색깔 설정.
    // }))
    // .then(() => navigate("/reservation-info"))
    // //.then(window.location.reload())
    // .catch(() => {
    //   Swal.fire({icon: "error", title: "정보를 확인해주세요"});
    // });
  };
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
                스타일 선택사항
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
                      <PhotoDiv key={i}>
                        <MyPhoto src={photo} />
                        {
                          showErase ?
                            <MyPhotoEraseButton src={eraseButton} onClick={()=>handleDelete(photo)}/>
                            :
                            <></>
                        }
                      </PhotoDiv>
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
                  // setPhoto(e.target.files[0]);
                  actionImgCompress (e.target.files[0]);
                  encodeFileToBase64(e.target.files[0]);
                }
              }}
            />
            <PhotoText className='addPhoto' onClick={() => inputRef.current.click()}>
             + 사진추가
            </PhotoText>
            <PhotoText className='deletePhoto' onClick={handleShowErase}>
              {
                showErase ?
                  <>x 사진취소</>
                  :
                  <>- 사진삭제</>
              }
            </PhotoText>
          </CardContents>
        </CardSection>
      </Container>
    </>
  );
};

export default ReservationInfoDetail;