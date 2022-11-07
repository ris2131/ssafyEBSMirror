import React, { useState } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';
import './Calendar.css';
import TimeTableComponent from './TimeTableComponent';
const Reservation = () => {

    
    const [value, onChange] = useState(new Date());
    const [mode, changeMode] = useState(0);
    console.log(moment(value).format("YYYY-MM-DD"))
    const selectDate = () => {
        changeMode(1)
    }
    return (
        <div>
            <h1>예약</h1>
            {mode === 0 ?(
                <div>
        
                 <Calendar onChange={onChange} onClickDay={selectDate} value={value} />
                 <div className="text-gray-500 mt-4">
                   {moment(value).format("YYYY년 MM월 DD일")} 
                 </div>
                 </div>
        
  ) : (mode === 1
    ? <TimeTableComponent />
    : (mode === 2)
    ? <p> 디자이너선택 </p>
    : <p> ㅍㅍㅍㅍ</p>  )
  }
           

        </div>
    );
};

export default Reservation;