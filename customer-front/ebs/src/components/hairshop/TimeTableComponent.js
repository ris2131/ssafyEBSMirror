import React, { useState } from "react";
import styled from "styled-components";

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



const TimeTableComponent = () => {
    
    const [time, setTime] = useState("")
    console.log(time)

  return (
    <div>
        <div>오전
            <MyButton onClick={() => setTime("10:00")}>10:00</MyButton>
            <MyButton onClick={() => setTime("11:00")}>11:00</MyButton>
        </div>
        <div>오후
            <MyButton onClick={() => setTime("13:00")}>13:00</MyButton>
            <MyButton onClick={() => setTime("14:00")}>14:00</MyButton>
            <MyButton onClick={() => setTime("15:00")}>15:00</MyButton>
            <MyButton onClick={() => setTime("16:00")}>16:00</MyButton>
            <MyButton onClick={() => setTime("17:00")}>17:00</MyButton>            
        </div>

    </div>
  );
};

export default TimeTableComponent;

