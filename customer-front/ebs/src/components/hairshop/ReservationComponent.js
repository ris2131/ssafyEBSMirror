import React, {useState} from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';
import './Calendar.css';
import TimeTableComponent from './TimeTableComponent';
import styled from "styled-components";

const ReservationDiv = styled.div`
  user-select: none;
`;

const ReservationComponent = () => {
  const [mode, setMode] = useState(0);
  const [resDate, setDate] = useState("");

  const selectDate = (day) => {
    setDate(moment(day).format("YYYY-MM-DD"))
    setMode(1)
  }

  return (
    <ReservationDiv>
      {
        mode === 0 ?
          (<div>
            <Calendar formatDay={(locale, date) => date.toLocaleString('en', {day: "numeric"})} onClickDay={selectDate}
                      resDate={resDate}/>
          </div>) :
        (mode === 1 ?
          <TimeTableComponent mode={mode} resDate={resDate}/> :
        (mode === 2) ?
          <p> 디자이너선택 </p> :
          <p>?</p>)
      }
    </ReservationDiv>
  );
};

export default ReservationComponent;