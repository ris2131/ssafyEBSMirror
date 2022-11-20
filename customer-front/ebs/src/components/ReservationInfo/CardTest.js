import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import styled from "styled-components";
import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

// const CustomCard = styled.Card`
//   width: 40px;
// `;

import { useNavigate } from "react-router-dom";


const ReservationInfocardComponent = (props) => {
  const navigate = useNavigate();

  const data = {
    businessSeq : props.reservation.businessSeq
  }

  const move = () => {
    navigate('/reservation-info-detail', {
      state: {
        item: props.reservation
      }
    });
  };

  const moveshop = () => {
    navigate('/hairshop-info', {state:{...data}});
  }

  const date1 = new Date(props.reservation.reservationDate);
  const date2 = new Date();
  
  

  //reservationDate는 String으로 넘어온다.
  return (
    <Card style={{ width: '90%' }}>
      <Card.Header>
        <span> 예약 일시 : {typeof(props.reservation.reservationDate)}</span>
        <span>                              </span>
        {date1>date2?<span>방문 예정</span>:<span>방문 완료</span>}
      </Card.Header>
      <Card.Body>
        <Card.Title onClick={moveshop}>헤어샵 이름 : {props.reservation.hairshopName}</Card.Title>
        <Card.Text>디자이너 이름 : {props.reservation.designerName}</Card.Text>
        
        <Button variant="primary" onClick={move}>상세 보기</Button>
      </Card.Body>
    </Card>
  );
};

export default ReservationInfocardComponent;
