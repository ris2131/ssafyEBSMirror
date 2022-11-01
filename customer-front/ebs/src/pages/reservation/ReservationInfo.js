import React from 'react';
import style from './ReservationInfo.module.css';
import ReservationInfocardComponent from "../../components/ReservationInfo/ReservationInfoCardComponent";   

const ReservationInfo = () => {
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