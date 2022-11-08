import React, {useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";

import NavBar from "../../components/NavBar";
import styled from "styled-components";
import { getTimeSheet } from '../../redux/ScheduleSlice';
import moment from "moment";
import {getDesigner} from "../../redux/DesignerSlice";

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

const TimeSheet = () => {
  const date = useSelector((state) => state.schedule.date) // state.

  const dateStr = moment(date).format("yyyy-MM-DD");
  const dispatch = useDispatch();
  const reservations = useSelector((state) => state.schedule.reservations);
  const designers = useSelector((state) => state.designer.designers);
  
  useEffect(() => {
    dispatch(getTimeSheet(date))
      .unwrap()
      .catch((err) => console.error(err));
    dispatch(getDesigner());
  },[dispatch, date]);

  const time = ["10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",];
  
  function isReserved(designerName, timeStr) {
    let result = 0;
    reservations.forEach((reservation) => {
      if (reservation["name"] === designerName && reservation["time"].slice(11, 16) === timeStr) {
        result = reservation["reservation_seq"];
      }
    });
    return result;
  }

  return (
    <>
      <NavBar></NavBar>
      <ScheduleMain>
        <ScheduleSection>
          <TitleDiv>{dateStr} 예약 시간표</TitleDiv>
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
                                isReserved(designer["name"], timeStr) === 0 ?
                                  <TimeTableData key={timeStr}></TimeTableData> :
                                  <TimeTableData className={"reserved"} key={timeStr}>상세</TimeTableData>
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
      </ScheduleMain>
    </>
  );
}

export default TimeSheet;