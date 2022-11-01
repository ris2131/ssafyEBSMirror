import React from 'react';
import axiosClient from "../../api";
import style from './Mypage.module.css';
import Card from 'react-bootstrap/Card';
import HorizonLine from '../../components/mypage/HorizonLine';


const Mypage = () => {
    const Nickname = '김싸피'
    const Adress = "대구광역시 달서구 파호동"
    return (
        <div className={style.Layout}>
            <div className={style.Title}>
                <h1>
                    마이페이지
                </h1>
            </div>
            <div className={style.Nickname}>
                <span>
                    닉네임
                </span>
                <span>
                    {Nickname}
                </span>
                <HorizonLine />
            </div>
            <div className={style.Adress}>
                <span>
                    주소
                </span>
                <span>
                    {Adress}
                </span>
                <HorizonLine/>
            </div>
            <div className={style.Subscribe}>
                <Card>
                    <Card.Body>구독 정보</Card.Body>
                </Card>
            </div>
            <div className={style.reservation}>
                <Card>
                    <Card.Body>예약 내역</Card.Body>
                </Card>
            </div>
        </div>
    );
};

export default Mypage;