import React from 'react';

import Calendar from 'react-calendar';
//import moment from 'moment';
import './Calendar.css';
import {useDispatch} from 'react-redux';
import {useNavigate} from "react-router-dom";
//import { businessActions } from '../../store/slices/businessSlice';
import {clickCalendarDate} from '../../redux/ScheduleSlice';

const CalendarComponent = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const selectDate = (day) => {
    //console.log("click day:"+ day);
    dispatch(clickCalendarDate(day));

    navigate("/schedule/time-sheet");

    //console.log(resDate);
  }

  return (
    <>
      <Calendar formatDay={(locale, date) => date.toLocaleString('en', {day: "numeric"})} onClickDay={selectDate}/>
    </>
  );
};

export default CalendarComponent;
