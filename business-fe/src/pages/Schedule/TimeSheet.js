import React, {useEffect, useState, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";

import NavBar from "../../components/Navbar/NavBar";
import styled from "styled-components";
import {getReservationDetail, getTimeSheet} from '../../redux/ScheduleSlice';
import moment from "moment";
// 한글로 출력되게 해준다.
import 'moment/locale/ko';
import {getDesigner} from "../../redux/DesignerSlice";
import ScheduleDetail from "../../components/ScheduleDetail/ScheduleDetail";
import DesignerRow from "../../components/ScheduleDetail/DesignerRow";

//배경화면이미지
import backgroundImage from "../../assets/calendar_background.png";


const ScheduleMain = styled.main`
  align-items: center;
  background: url(${backgroundImage});
  background-size: cover;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  padding: 50px 100px;
`;

const ScheduleSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  border-radius:50px;
  flex: 0.5;
  background-color: #DCD7C9;
  padding: 50px;
  //box-shadow: #3f3f3f 10px 10px 5px;
`;
const DateDiv = styled.div`
  font-family: 'Do Hyeon', sans-serif;
  font-size: 60px;
  // margin-top: 20px;
`;
const TitleDiv = styled.div`
  font-family: 'Do Hyeon', sans-serif;
  font-size: 40px;
  margin-bottom: 30px;

`;

const TimeTable = styled.table`
  color: #ffffff;
  user-select: none;
`;

const TimeTableHead = styled.thead`
  background-color: #A27B5C;
`;

const TimeTableHeadRow = styled.tr`
`;

const TimeTableHeadMain = styled.th`
  background-color: #bfbfbf;
`;

const TimeTableHeadData = styled.th`
  padding: 5px 10px;
`;

const TimeTableBody = styled.tbody`
`;

const DisplayBlock = styled.div`
  background-color: #7f7f7f7f;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

const TimeSheet = () => {
  const dispatch = useDispatch();

  const originDate = useSelector((state) => state.schedule.date) // state.
  const [date,setDate] = useState("");
  //const reservations = useSelector((state) => state.schedule.reservations);
  const [reservations, setReservations] = useState("");

  const designers = useSelector((state) => state.designer.designers);

  const [showDetail, setShowDetail] = useState(false);

  const time = ["10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",];

  const scheduleMain = document.querySelector('main');
  
  const addDetailButton = (() => {
    console.log("addDB 내 date"+date+", 호출직전(length):"+reservations.length);
    if (reservations.length && scheduleMain) {
      reservations.forEach((reservation) => {
        console.log("slice: "+document.getElementsByClassName(`${reservation['designer_seq']} ${reservation['time'].slice(11, 16)}`)[0]);
        const reservedCell = document.getElementsByClassName(`${reservation['designer_seq']} ${reservation['time'].slice(11, 16)}`)[0];
        if (reservedCell) {
          reservedCell.classList.add('reserved');
          reservedCell.addEventListener('click', eventAction.bind(null, reservation["reservation_seq"]));
        }
      });
    }
  });

  function eventAction(seq) {
    dispatch(getReservationDetail(seq));
    console.log("eventAction!");
    setShowDetail(true);
  }

  const dateMounted = useRef(false);
  const reservationsMounted = useRef(false);

  //designer 가져오기(이건 순서 노상관임).
  useEffect(()=>{
    
    dispatch(getDesigner());
    console.log("designer 초기화");
  },[])

  //redux.state 변경시 origin date 를 렌더 이후에 가져오기에 이에따라 date 변경
  useEffect(()=>{
    setDate(originDate);
  },[originDate]);
  //reservations를 state.schedule 에서 가져옴 , state 바뀔떄만(mount 됐을떄만) 하기.
  useEffect(()=>{
    if (!dateMounted.current) {
      dateMounted.current = true;
    } else {
      dispatch(getTimeSheet(date))
      .then((res)=>{
        setReservations(res.payload.data);
        //console.log("res.data"+JSON.stringify(res));
      });
    }
  },[date]);
 
  useEffect(()=>{
    if (!reservationsMounted.current) {
      reservationsMounted.current = true;
    } else {
      //console.log("reservations:"+reservations);
      addDetailButton();
    }
  },[reservations]);

  
  return (
    <>
      <NavBar></NavBar>
      <ScheduleMain>
        <ScheduleSection>
          <DateDiv>{moment(date).lang("ko").format("yyyy-MM-DD (ddd)")}</DateDiv>
          <TitleDiv> 예약 시간표</TitleDiv>

          <TimeTable>
            <TimeTableHead>
              <TimeTableHeadRow>
                <TimeTableHeadMain></TimeTableHeadMain>
                {
                  time.length ?
                    time.map((timeStr) => {
                      return (
                        <TimeTableHeadData key={timeStr}>{timeStr}</TimeTableHeadData>
                      );
                    }) :
                    <></>
                }
              </TimeTableHeadRow>
            </TimeTableHead>
            <TimeTableBody>
              {
                designers.length ?
                  designers.map((designer) => {
                    return (
                      <DesignerRow key={designer["designer_seq"]} designerSeq={designer["designer_seq"]} designerName={designer["name"]}></DesignerRow>
                    );
                  }) :
                  <></>
              }
            </TimeTableBody>
          </TimeTable>
        </ScheduleSection>
        {
          showDetail ?
            <>
              <DisplayBlock onClick={() => {
                setShowDetail(false);
              }}></DisplayBlock>
              <ScheduleDetail></ScheduleDetail>
            </> :
            <></>
        }
      </ScheduleMain>
    </>
  );

  
}

export default TimeSheet;