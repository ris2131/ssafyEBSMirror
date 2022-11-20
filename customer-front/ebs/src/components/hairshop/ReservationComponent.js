import React, {useState} from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';
import './Calendar.css';
import Swal from 'sweetalert2';
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {getAvailableDesigners, makeReservation} from "../../store/slices/reservationSlice";
import DesignerReservationComponent from "./DesignerReservationComponent";
import SelectBox from "./Selectbox";
import {ProgressBar, Step} from "react-step-progress-bar/index.mjs";
import "./Progress.css";


const MyButton = styled.button`
  border: none;
  border-radius: 10px;
  color: white;
  background-color: #b08664;
  padding: 5px 10px;
  margin: 5px;
  width: 60px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #DFD3C3;
  }
`;

const QueryDiv = styled.div`
  margin-top: 20px;
`;

const StyledTextarea = styled.textarea`
  padding: 5px 10px;
  //height: 40vh;
  width: 100%;
  height: 72px;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  resize: none;
  font-size: 16px;
  transition-duration: 200ms;

  margin-bottom: 20px;
  border: 1px solid #000000;
  border-radius: 10px;

  &:empty {
    font-size: 14px;
    height: 36px;
    transition-duration: 200ms;
  }

  &:focus {
    border: none;
    transition-duration: 200ms;
  }
`;

const Container = styled.div`
  background-color: #F9F9F9;
  // height: 100vh;
  flex: 1;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
`;

const ConfirmButton = styled.button`
  border: none;
  border-radius: 10px;
  color: white;
  background-color: #b08664;
  padding: 5px 10px;
  margin: 5px;
  font-size: 14px;
  cursor: pointer;
`;

const ReservationComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const seq = useSelector((state) => state.business.hairshop.businessSeq);
  const designerList = useSelector((state) => state.reservation.designers);
  const [mode, setMode] = useState(0);
  const [resDate, setDate] = useState("");
  const [designerSeq, setDesignerSeq] = useState();
  const [designerName, setDesignerName] = useState("");
  const [progress, setProgress] = useState(0);
  const [time, setTime] = useState("");
  const [content, setContent] = useState("");
  const [reservationStyle, setStyle] = useState("만나서 스타일 협의");
  const [reservationService, setService] = useState("잘 부탁드려요^^.");

  const steps = [
    "날짜 선택",
    "시간 선택",
    "디자이너 선택",
    "세부 내용 입력",
    "예약 완료"
  ];

  const timeTable = ["10:00:00", "10:30:00", "11:00:00", "11:30:00", "12:00:00", "12:30:00", "13:00:00", "13:30:00", "14:00:00", "14:30:00", "15:00:00", "15:30:00", "16:00:00", "16:30:00", "17:00:00", "17:30:00"];

  const designOptions = [
    {value: "만나서 스타일 협의", name: "만나서 스타일 협의"},
    {value: "투블럭 해주세요 옆라인은 협의할게요.", name: "투블럭 해주세요 옆라인은 협의할게요."},
    {value: "시원하게 다 밀어주세요.", name: "시원하게 다 밀어주세요."},
    {value: "아래에 기입할게요.", name: "아래에 기입할게요."},
  ];

  const designSub = "design";
  const serviceSub = "service";

  const serviceOptions = [
    {value: "잘 부탁드려요^^.", name: "잘 부탁드려요^^."},
    {value: "커트 후 머리에 뭐 바르지 말아 주세요.", name: "커트 후 머리에 뭐 바르지 말아 주세요."},
    {value: "음료는 율무차로 해주세요.", name: "음료는 율무차로 해주세요."},
    {value: "말을 최소한으로 해주세요.", name: "말을 최소한으로 해주세요."},
  ];

  const setTimer = (selectedTime) => {
    setTime(selectedTime);
    changeMode(2);
    const finalDate = resDate + " " + selectedTime;
    const data = {
      finalDate: finalDate,
      seq: seq
    };
    dispatch(getAvailableDesigners(data));
  };

  const makeRes = () => {
    const reservationData = {
      designerSeq: designerSeq,
      reservationDate: resDate + " " + time,
      reservationPhoto: "image",
      reservationStyle: reservationStyle,
      reservationService: reservationService,
      reservationEtc: content
    };
    dispatch(makeReservation(reservationData))
      .then((res) => {
        {
          res.payload.status === "SUCCESS"
            ? (
              Swal.fire({
                icon: "success",
                title: "완료",
                text: "예약이 완료되었습니다.",
                showConfirmButton: true,
                timer: 3000
              }).then(navigate('/reservation-info'))
            )

            : (
              Swal.fire({
                icon: "error",
                title: "오류",
                text: "오류가 발생했습니다. 관리자에게 문의해주세요.",
                showConfirmButton: true,
                timer: 3000
              })
            )
        }
        navigate('/')
      });
  };

  const changeMode = (value) => {
    setMode(value);
    setProgress(value * 100 / (steps.length - 1));
  };

  const getDesignValue = (data) => {
    setStyle(data);
  };

  const getServiceValue = (data) => {
    setService(data);
  };

  const selectDate = (day) => {
    //날짜 비교 해서 넘어가기
    if (moment().isAfter(day)) {
      Swal.fire({
        'title': '예약은 최소 1일 전부터 가능합니다.',
        'icon': 'error',
        'iconColor': "#876445",
        'confirmButtonColor': "#876445",
        'confirmButtonText': '<div style="font-weight:bold;">OK</div>'
      });
    } else {
      setDate(moment(day).format("YYYY-MM-DD"));
      changeMode(1);
    }
  };

  const previous = (index) => {
    if (mode > index) {
      changeMode(index);
    }
  }

  const progressText = (index) => {
    switch (index) {
      case 0: return resDate;
      case 1: return time.slice(0,5);
      case 2: return designerName;
    }
  }

  return (
    <div>
      <ProgressBar percent={progress}>
        {steps.map((label, key) => (
          <Step key={key}>
            {({ accomplished, index }) => (
              <>
                <div
                  className={`indexedStep${accomplished ? " accomplished" : ""}`}
                  onClick={() => previous(index)}
                >{index + 1}</div>
                <div className={"text"}>{index >= mode ? label : progressText(index)}</div>
              </>
            )}
          </Step>
        ))}
      </ProgressBar>
      {
        {
          0:
            <div>
              <Calendar formatDay={(locale, date) => date.toLocaleString('en', {day: "numeric"})} onClickDay={selectDate} resDate={resDate}/>
            </div>,
          1:
            <div>
              {
                timeTable.length ?
                  timeTable.map((timeStr, i) => {
                    return (
                      <MyButton key={i} onClick={() => setTimer(timeStr)}>{timeStr.slice(0, 5)}</MyButton>
                    );
                  }) :
                  <></>
              }
            </div>,
          2:
            <Container>
              {designerList !== null && designerList.length ? (
                  designerList.map((a, i) => {
                    return (
                      <DesignerReservationComponent
                        designer={designerList[i]}
                        func={changeMode}
                        setDesignerSeq={setDesignerSeq}
                        setDesignerName={setDesignerName}
                        num={i}
                        key={i}
                      />
                    );
                  })) :
                <>예약가능한 디자이너가 없습니다.</>}
            </Container>,
          3:
            <div>
              <QueryDiv>
                스타일 선택사항
                <SelectBox subject={designSub} options={designOptions} defaultValue="design_1"
                           dfunc={getDesignValue}/>
              </QueryDiv>
              <QueryDiv>
                서비스 선택사항
                <SelectBox subject={serviceSub} options={serviceOptions} defaultValue="service_1"
                           sfunc={getServiceValue}/>
              </QueryDiv>
              <QueryDiv>
                추가 요청사항
              </QueryDiv>
              <StyledTextarea
                onChange={(e) => {
                  setContent(e.target.value);
                }}
                className="text"
                placeholder="추가 요청사항이 있으면 기입해 주세요."
                value={content}
              />
              <ConfirmButton onClick={makeRes}>예약하기</ConfirmButton>
            </div>
        } [mode]
      }
    </div>
  );
};

export default ReservationComponent;