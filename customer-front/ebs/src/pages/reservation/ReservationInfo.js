import style from './ReservationInfo.module.css';
import ReservationInfocardComponent from "../../components/ReservationInfo/ReservationInfoCardComponent";   
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getreservations } from '../../store/slices/reservationSlice';

const ReservationInfo = () => {
    
    const myreservation = useSelector((state)=>state.reservation.myreservation)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getreservations())
        .then((res)=>{console.log(res);});
    }, []);

    return (
        <div className={style.Layout}>
            <div className={style.Title}>
                <h1>예약 내역</h1>
            </div>
                <div className={style.Infocard}>
                    <ReservationInfocardComponent />
                </div>
                <div>{myreservation[0]}</div>
        </div>
    );
};

export default ReservationInfo;