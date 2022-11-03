import style from './ReservationInfo.module.css';
import ReservationInfocardComponent from "../../components/ReservationInfo/ReservationInfoCardComponent";   
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';

const ReservationInfo = () => {
    //const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const accesstoken = localStorage.getItem("token")

    useEffect(() => {
        axios.get("/api/reservations", {
            headers: {
                    Authorization: accesstoken
            }
        })
        .then((res) => {
            console.log("예약내역");
            console.log(res.data);
        })
        .catch((error) => {
            console.log("에러");
            console.log(error);
        });
    }, []);
    return (
        <div className={style.Layout}>
            <div className={style.Title}>
                <h1>예약 내역</h1>
            </div>
                <div className={style.Infocard}>
                    <ReservationInfocardComponent />
                </div>
            
        </div>
    );
};

export default ReservationInfo;