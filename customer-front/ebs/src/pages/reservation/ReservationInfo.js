import ReservationInfocardComponent from "../../components/ReservationInfo/ReservationInfoCardComponent";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getreservations } from "../../store/slices/reservationSlice";
import styled from "styled-components";

const Container = styled.div`
  background-color: #8B4513;
`;

const Title = styled.div`
  font-size: 50px;
  text-align: center;
  font-weight: bold;
  margin-bottom: 30px;
  color: #FFFFFF;
`;

// const Reservation = styled.div`
//   color: #FFFFFF;
// `;

const ReservationInfo = () => {
  const myreservation = useSelector((state) => state.reservation.myreservation);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getreservations()).then((res) => {
      console.log(res);
    });
  }, []);

  return (
    <Container>
      <Title>예약 내역</Title>
      
      <div>
        {myreservation.length ? (
          // <SubscribeInfoComponent subscribe={mysubscribe[0]} />
          myreservation.map((a, i) => {
            return (
              <ReservationInfocardComponent
                reservation={myreservation[i]}
                num={i}
                key={i}
              />
            );
          })
        ) : (
          <>예약 정보가 없습니다.</>
        )}
      </div>
    </Container>
  );
};

export default ReservationInfo;
