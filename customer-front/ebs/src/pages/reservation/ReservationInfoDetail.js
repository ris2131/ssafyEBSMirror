import React from 'react';
import Card from 'react-bootstrap/Card';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from "styled-components";


const Container = styled.div`
    background-color: #8a817c;
    height: 100vh;
    font-family: GowunBatang-Regular;
`;

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
        <Container>
            <Card>
                <Card.Body>
                    <Card.Text>
                        <div>
                            요청사항
                        </div>
                        <div>
                            {reservation.reservationStyle?<div>{reservation.reservationStyle}</div>:<></>}
                            {reservation.reservationService?<div>{reservation.reservationService}</div>:<></>}
                            {reservation.reservationEtc?<div>{reservation.reservationEtc}</div>:<></>}
                        </div>
                    </Card.Text>
                </Card.Body>
            </Card>
            <br />
            <MyButton onClick={move}>돌아가기</MyButton>
        </Container>
      </>
    );
};

export default ReservationInfoDetail;