import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import NavBar from "../../components/Navbar/NavBar";
import styled from "styled-components";
import {getReservationDetail, getTimeSheet} from '../../redux/ScheduleSlice';
import moment from "moment";
import {getDesigner} from "../../redux/DesignerSlice";
import ScheduleDetail from "../../components/ScheduleDetail/ScheduleDetail";

const ScheduleMain = styled.main`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  padding: 20px 100px;
`;

const ScheduleSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  //background-color: #cfcfcf;
  padding: 40px;
  //box-shadow: #3f3f3f 10px 10px 5px;
`;

const TitleDiv = styled.div`
  font-size: 48px;
  margin-bottom: 20px;

`;

const TimeTable = styled.table`
  color: #ffffff;
  user-select: none;
`;

const TimeTableHead = styled.thead`
  background-color: #9D7F5C;
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

const TimeTableRow = styled.tr`
`;

const TimeTableDesignerName = styled.th`
  background-color: antiquewhite;
  padding: 10px 30px;
  color: #9D7F5C;
`;

const TimeTableData = styled.td`
  background-color: #bfbfbf;

  &.reserved {
    background-color: #9D7F5Cbf;
    cursor: pointer;
    font-weight: bold;
  }
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

  const date = useSelector((state) => state.schedule.date) // state.

  // const reservations = useSelector((state) => state.schedule.reservations);

  const [reservations, setReservations] = useState({});

  const designers = useSelector((state) => state.designer.designers);

  const [showDetail, setShowDetail] = useState(false);

  const time = ["10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",];

  const scheduleMain = document.querySelector('main');

  const requestSchedule = useCallback(() => {
    console.log("requestSchedule 호출");
    dispatch(getTimeSheet(date));
  }, [dispatch, date]);

  useEffect(() => {
    requestSchedule().then((data) => setReservations(data));
  }, [requestSchedule]);

  const requestDesignerList = useCallback(() => {
    console.log("requestDesignerList 호출");
    dispatch(getDesigner());
  }, [dispatch]);

  useEffect(() => {
    requestDesignerList();
  }, [requestDesignerList]);

  const requestDetail = useCallback((seq) => {
    console.log("requestDetail 호출");
    dispatch(getReservationDetail(seq));
  }, [dispatch]);

  const addDetailButton = useCallback(() => {
    console.log("addDetailButton 호출");
    console.log("reservations length : " + reservations.length);
    if (reservations.length && scheduleMain) {
      reservations.forEach((reservation) => {
        const reservedCell = document.getElementsByClassName(`${reservation['name'].replace(' ', '_')} ${reservation['time'].slice(11, 16)}`)[0];
        if (reservedCell) {
          reservedCell.classList.add('reserved');
          reservedCell.addEventListener('click', () => {
            requestDetail(reservation["reservation_seq"]);
            setShowDetail(true);
          });
        }
      });
    }
  }, [requestDetail, reservations, scheduleMain]);

  useEffect(() => {
    addDetailButton();
  }, [addDetailButton]);

  return (
    <>
      <NavBar></NavBar>
      <ScheduleMain>
        <ScheduleSection>
          <TitleDiv>{moment(date).format("yyyy-MM-DD")} 예약 시간표</TitleDiv>
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
                      <TimeTableRow key={designer["name"]}>
                        <TimeTableDesignerName>{designer["name"]}</TimeTableDesignerName>
                        {
                          time.length ?
                            time.map((timeStr) => {
                              return (
                                <TimeTableData key={timeStr}
                                               className={`${designer["name"].replace(' ', '_')} ${timeStr}`}></TimeTableData>
                              );
                            }) :
                            <></>
                        }
                      </TimeTableRow>
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