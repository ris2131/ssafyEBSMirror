import React, { useState  ,useCallback, useEffect} from 'react';

import { useDispatch, useSelector } from "react-redux";


import styled from "styled-components";
import { getTimeSheet } from '../../redux/ScheduleSlice';

const SButton = styled.button`
  border-radius: 5px;
  color: white;
  border: none;
  background-color: #9D7F5C;
  padding: 5px;
  margin-top: 40px;
  width: 20vw;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
`;

const TimeSheet = () => {
  const date = useSelector((state) => state.schedule.date) // state.

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTimeSheet(date))
      .unwrap()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.error(err));
  },[date]);

  const handle11 = () => {
    console.log("넘겨진 데이터"+date)
  }  
  
  return(
    <>
      시간표 페이지
      <SButton onClick={handle11}>
        데이트
      </SButton>
    </>
  );
};

export default TimeSheet;
