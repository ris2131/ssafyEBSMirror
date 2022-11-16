// import ReservationInfocardComponent from "../../components/ReservationInfo/ReservationInfoCardComponent2";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getreservations } from "../../store/slices/reservationSlice";
import styled from "styled-components";
import ReservationEmpty from "../../components/ReservationInfo/ReservationEmpty";
import ReservationInfoCardComponent from "../../components/ReservationInfo/ReservationInfoCardComponent";
import { style } from "@mui/system";

const Container = styled.div`
  background-color: #efefef;
  font-family: GowunBatang-Regular;
  height: 100vh;
  
  
`;

const Title = styled.div`
  font-size: 50px;
  text-align: center;
  font-weight: bold;
  margin-bottom: 30px;
  color: #000000;
`;



const ReservationInfo = () => {
  const myreservation = useSelector((state) => state.reservation.myreservation);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getreservations()).then((res) => {
      console.log("getreservation Res:"+JSON.stringify(res));
    });
  }, []);

//   return (
//     <Container>
//       <Title>예약 내역</Title>
//       <div>
//         {myreservation.length ? (
//           // <SubscribeInfoComponent subscribe={mysubscribe[0]} />
//           myreservation.map((a, i) => {
//             return (
//               <ReservationInfocardComponent
//                 reservation={myreservation[i]}
//                 num={i}
//                 key={i}
//               />
//             );
//           })
//         ) : (
//           <ReservationEmpty/>
//         )}
//       </div>
//     </Container>
//   );
// };

return (
  <Container>
    <Title>예약 내역</Title>
    <div>
      {myreservation.length ? (
        myreservation.map((a, i) => {
          return (
            <ReservationInfoCardComponent
              reservation={myreservation[i]}
              num={i}
              key={i}
            />
          );
        })
      ) : (
        <ReservationEmpty/>
      )}
    </div>
  </Container>
);
};

export default ReservationInfo;
