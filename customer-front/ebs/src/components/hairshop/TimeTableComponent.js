import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import DesignerListComponent from "./DesignerListComponent";
import { getAvailableDesigners, makeReservation } from "../../store/slices/reservationSlice"
import SelectBox from "./Selectbox"
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
// import { useNavigate } from "react-router-dom";
const MyButton = styled.button`
  border: none;
  border-radius: 10px;
  color: white;
  background-color: #42a5f5;
  padding: 10px;
  width: 60px;
  font-size: 14px;
  cursor: pointer;
`;

const StyledTextarea = styled.textarea`
padding: 15px;
height: 40vh;
width: 40vw;

resize: none;
font-size: 1.8vw;

border-radius: 20px;
margin: 10px;
`;

const Container = styled.div`
    background-color: #F9F9F9;
    // height: 100vh;
    flex: 1;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center center;
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: repeat(2, minmax(0, 1fr));
`;


const TimeTableComponent = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const seq = useSelector((state) => state.business.hairshop.businessSeq)
    const [designerSeq, setDseq] = useState()
    const designerList = useSelector((state) => state.reservation.designers);

    const designSub = "design"
    const serviceSub = "service"

    const [time, setTime] = useState("")
    const resDate = props.resDate
    const [mode, setMode] = useState(props.mode)

    const [content, setContent] = useState("");
    const [reservationStyle, setStyle] = useState("만나서 디자인 협의");
    const [reservationService, setService] = useState("잘 부탁드려요^^.");


    const designOptions = [
      { value: "만나서 디자인 협의", name: "만나서 디자인 협의" },
      { value: "투블럭 해주세요 옆라인은 협의할게요.", name: "투블럭 해주세요 옆라인은 협의할게요." },
	    { value: "시원하게 다 밀어주세요.", name: "시원하게 다 밀어주세요." },
	    { value: "아래에 기입할게요.", name: "아래에 기입할게요." },

    ]

    const serviceOptions = [
      { value: "잘 부탁드려요^^.", name: "잘 부탁드려요^^." },
	    { value: "커트 후 머리에 뭐 바르지 말아 주세요.", name: "커트 후 머리에 뭐 바르지 말아 주세요." },
	    { value: "음료는 율무차로 해주세요.", name: "음료는 율무차로 해주세요." },
	    { value: "말을 최소한으로 해주세요.", name: "말을 최소한으로 해주세요." },
    ]

    const setTimer = (selectedTime) => {
      setTime(selectedTime)
      setMode(2)
      const finalDate = resDate+" "+selectedTime
      const data = {
        finalDate : finalDate,
        seq : seq
      }
      dispatch(getAvailableDesigners(data))
    }

    const makeRes = () => {
      const reservationData = {
        designerSeq : designerSeq,
        reservationDate : resDate+" "+time,
        reservationPhoto : "image",
        reservationStyle : reservationStyle,
        reservationService : reservationService,
        reservationEtc : content
      };
      dispatch(makeReservation(reservationData))
      .then((res)=> 
      {
        {res.payload.status === "SUCCESS"
        ?(
          Swal.fire({
            icon: "success",
            title: "완료",
            text: "예약이 완료되었습니다.",
            showConfirmButton: true,
            timer: 3000
          }).then(navigate('/reservation-info'))
        )
      
        :(
          Swal.fire({
            icon: "error",
            title: "오류",
            text: "오류가 발생했습니다. 관리자에게 문의해주세요.",
            showConfirmButton: true,
            timer: 3000
          })
        )
        }
        navigate('/')})
    }

    const changeMode = (num) => {
      setMode(num)
    }

    const getDesignValue = (data) => {
      setStyle(data)
    }

    const getServiceValue = (data) => {
      setService(data)
    }

    const getDisgnerSeq = (data) => {
      setDseq(data)
    }

  return (
    <div>
      {mode === 1

      ?<><div>오전
      <MyButton onClick={() => setTimer("10:00:00")}>10:00</MyButton>
      <MyButton onClick={() => setTimer("11:00:00")}>11:00</MyButton>
  </div>
  <div>오후
      <MyButton onClick={() => setTimer("13:00:00")}>13:00</MyButton>
      <MyButton onClick={() => setTimer("14:00:00")}>14:00</MyButton>
      <MyButton onClick={() => setTimer("15:00:00")}>15:00</MyButton>
      <MyButton onClick={() => setTimer("16:00:00")}>16:00</MyButton>
      <MyButton onClick={() => setTimer("17:00:00")}>17:00</MyButton>            
  </div></>
  : mode === 2
    ?<>
    <Container>
            
            {designerList.length != 0 ? (
        
            designerList.map((a, i) => {
          return (
            <DesignerListComponent
              designer={designerList[i]}
              func = {changeMode}
              setDisgnerSeq = {getDisgnerSeq}
              num={i}
              key={i}
            />
          );
        })
      ) : (
        <>예약가능한 디자이너가 없습니다.</>
      )}


        </Container>
    </>
    : mode === 3
    ? (
    <div>
      <p>예약 상세페이지</p>
      <div>
      디자인 선택사항
        <SelectBox subject={designSub} options={designOptions} defaultValue="design_1" dfunc = {getDesignValue}/>
      </div>
      <div>
      서비스 선택사항
        <SelectBox subject={serviceSub} options={serviceOptions} defaultValue="service_1" sfunc = {getServiceValue}/>
      </div>
      <div>
        추가 요청사항
        </div>
        <div>
        <StyledTextarea
                onChange={(e) => {
                  setContent(e.target.value);
                }}
                className="text"
                placeholder="추가 요청사항이 있을 경우 기입해 주세요."
                value={content}
              />
      </div>
      <MyButton onClick={makeRes}>예약</MyButton>
    </div>
    )
    : <> 잘못된 접근입니다.</>
  }
        

    </div>
  );
};

export default TimeTableComponent;

