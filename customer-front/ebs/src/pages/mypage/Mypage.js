import axiosClient from "../../api";
import style from './Mypage.module.css';
import Card from 'react-bootstrap/Card';
import HorizonLine from '../../components/mypage/HorizonLine';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Mypage = () => {
    const Nickname = '김싸피'
    const Adress = "대구광역시 달서구 파호동"
    useEffect(() => {
        axios.get("/api/members", {
            headers: {
                    Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJlYnMiLCJzdWIiOiJJRW5nIEFjY2Vzc1Rva2VuIiwiZXhwIjoxNjY3NDY4MzE1LCJtZW1iZXJ1aWQiOiIxMDIyNzUwNDY4MTA1NjA1MjY3NjQifQ.5ALt9ex4azAeNll0kJnx0UdWP51JZb2P4Q4S4Tg33lw"
            }
        })
        .then((res) => {
            
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