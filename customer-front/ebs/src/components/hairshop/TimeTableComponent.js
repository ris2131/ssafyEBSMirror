import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import DesignerListComponent from "./DesignerListComponent";
import { getAvailableDesigners } from "../../store/slices/reservationSlice"
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



const TimeTableComponent = (props) => {
    const dispatch = useDispatch();
    const seq = useSelector((state) => state.business.hairshop.businessSeq)
    const designerList = useSelector((state) => state.reservation.designers);

    const [time, setTime] = useState("")
    const resDate = props.resDate
    const [mode, setMode] = useState(props.mode)
    


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
    <div>
            
            {designerList.length != 0 ? (
        
            designerList.map((a, i) => {
          return (
            <DesignerListComponent
              designer={designerList[i]}
              num={i}
              key={i}
            />
          );
        })
      ) : (
        <>예약가능한 디자이너가 없습니다.</>
      )}


        </div>
    </>
    : mode === 3
    ? <>예약상세페이지</>
    : <> 잘못된 접근입니다.</>
  }
        

    </div>
  );
};

export default TimeTableComponent;

