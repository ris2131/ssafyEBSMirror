import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';
import './Calendar.css';
import TimeTableComponent from './TimeTableComponent';
import { useDispatch, useSelector } from 'react-redux';
import { businessActions } from '../../store/slices/businessSlice';
const ReservationComponent = () => {

    const [mode, setMode] = useState(0);
    const [resDate, setDate] = useState("");

    const selectDate = (day) => {
        setDate(moment(day).format("YYYY-MM-DD"))
        setMode(1)
        
    }


    return (
        <div>
            <h1>예약</h1>
            {mode === 0 ?(
                <div>
        
                 <Calendar  onClickDay={selectDate} resDate={resDate} />

                 </div>
        
  ) : (mode === 1
    ? <TimeTableComponent mode={mode} resDate={resDate}/>
    : (mode === 2)
    ? <p> 디자이너선택 </p>
    : <p> ㅍㅍㅍㅍ</p>  )
  }
           

        </div>
    );
};

export default ReservationComponent;