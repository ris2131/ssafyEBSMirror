import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import styled from "styled-components";
import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

// const CustomCard = styled.Card`
//   width: 40px;
// `;

const ReservationInfocardComponent = (props) => {
  return (
    <Card style={{ width: '90%' }}>
      <Card.Header>
        <span> 예약 일시 : {props.reservation.reservationDate}</span>
      </Card.Header>
      <Card.Body>
        <Card.Title>헤어샵 이름 : {props.reservation.hairshopName}</Card.Title>
        <Card.Text>디자이너 이름 : {props.reservation.designerName}</Card.Text>
        <Card.Text>스타일요청 : {props.reservation.reservationStyle}</Card.Text>
        <Card.Text>
          서비스요청 : {props.reservation.reservationService}
        </Card.Text>
        <Card.Text>기타요청 : {props.reservation.reservationEtc}</Card.Text>
        <Button variant="primary">상세 보기</Button>
      </Card.Body>
    </Card>
  );
};

export default ReservationInfocardComponent;
