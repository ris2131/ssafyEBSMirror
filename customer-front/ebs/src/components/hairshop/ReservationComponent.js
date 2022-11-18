import React, {useState} from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';
import './Calendar.css';
import TimeTableComponent from './TimeTableComponent';
import Swal from 'sweetalert2';
import styled from "styled-components";

const ReservationDiv = styled.div`
  user-select: none;
`;

const ReservationComponent = () => {

    const [mode, setMode] = useState(0);
    const [resDate, setDate] = useState("");

    const selectDate = (day) => {
        //오늘 날짜
        //클릭 날짜 console.
        const clickDay = moment(day).format("YYYY-MM-DD");
        //오늘 날짜 console. 
        const today = moment().format("YYYY-MM-DD");
        //비교
        const before = moment(clickDay).isBefore(today);
        
        //날짜 비교 해서 넘어가기
        if(before){
          Swal.fire({
            'title':'오늘보다 이전날짜에는 예약 불가입니다.',
            'icon':'error',
            'iconColor':"#876445",
            'confirmButtonColor':"#876445",
            'confirmButtonText': '<div style="font-weight:bold;">OK</div>'
          });
        }else{
          setDate(moment(day).format("YYYY-MM-DD"))
          setMode(1)
        }
        
    }


  return (
    <div>
      <h1>예약</h1>
      {mode === 0 ?(
        <div>
          <Calendar onClickDay={selectDate} resDate={resDate} />
        </div>
            
        ) : (mode === 1
          ? <TimeTableComponent mode={mode} resDate={resDate}/>
          : (mode === 2)
          ? <p> 디자이너선택 </p>
          : <p> 없음</p>  
        )
      }
    </div>
  );
};

export default ReservationComponent;