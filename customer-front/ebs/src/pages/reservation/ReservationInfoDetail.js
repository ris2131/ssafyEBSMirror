import React from 'react';
import Card from 'react-bootstrap/Card';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from "styled-components";
const MyButton = styled.button`
  border: none;
  border-radius: 10px;
  color: white;
  background-color: #42a5f5;
  padding: 10px;
  margin-top: 40px;
  width: 60px;
  font-size: 14px;
  cursor: pointer;
`;

const ReservationInfoDetail = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const reservation = location.state.item;
    const seq = {
        hairshopSeq : reservation.businessSeq
    }

    const move = () =>{
        navigate('/reservation-info');
    }

    return (
      <>
        <Card>
            
            <Card.Body>
                <Card.Text>
                    <div>
                        요청사항
                    </div>
                    <ul>
                        {reservation.reservationStyle?<li>{reservation.reservationStyle}</li>:<></>}
                        {reservation.reservationService?<li>{reservation.reservationService}</li>:<></>}
                        {reservation.reservationEtc?<li>{reservation.reservationEtc}</li>:<></>}
                    </ul>
                </Card.Text>
            </Card.Body>
        </Card>
        <br />
        <MyButton onClick={move}>예약내역조회페이지로 돌아가기</MyButton>
      </>
    );
};

export default ReservationInfoDetail;