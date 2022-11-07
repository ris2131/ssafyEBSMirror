import style from "./ReservationInfo.module.css";
import ReservationInfocardComponent from "../../components/ReservationInfo/ReservationInfoCardComponent";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getreservations } from "../../store/slices/reservationSlice";

const ReservationInfo = () => {
  const myreservation = useSelector((state) => state.reservation.myreservation);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getreservations()).then((res) => {
      console.log(res);
    });
  }, []);

  return (
    <div className={style.Layout}>
      <div className={style.Title}>
        <h1>예약 내역</h1>
      </div>
      <div className={style.Infocard}>
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
    </div>
  );
};

export default ReservationInfo;
