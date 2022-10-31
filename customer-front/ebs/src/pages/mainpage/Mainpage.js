import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import style from './Mainpage.module.css';
import axiosClient from "../../api";
import HairshopCarouselComponent from "../../components/mainpage/HairshopCarouselComponent";
import Card from 'react-bootstrap/Card';
// import Ebsnav from '../ebsnav/Ebsnav';


const Mainpage = (props) => {
    const member_nickname = "김싸피"
    const haircut_term = 35
    const [User_name, setUsers] = useState();

    // const accessToken = useSelector((state) => state.auth.accessToken);

    // // 유저 닉네임, 헤어숍이용텀, 구독한 헤어숍 정보 받아오기  
    // axiosClient
    // .get('', {
    //   headers: {
    //     Authorization: accessToken,
    //   },
    // })
    // .then((response) => {
    //   console.log(response);
    //   const myinformation = response
    //   console.log(myinformation)
    // })
    // .catch((error) => {
    //   console.log("에러");
    //   console.log(error);
    // });

    return (
        <div className={style.Layout}>
          {/* <Ebsnav /> */}
            <div className={style.Comment}>
                안녕하세요 {User_name}님.
            </div>
            <div className={style.Termday}>
                미용실을 이용한지 {haircut_term}일이 되었습니다.
            </div>
            <div className={style.Carousel}>
            <HairshopCarouselComponent />
            </div>
            
        </div>
    );
};

export default Mainpage;