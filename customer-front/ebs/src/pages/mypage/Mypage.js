import style from './Mypage.module.css';
import styled from "styled-components";
import Card from 'react-bootstrap/Card';
import HorizonLine from '../../components/mypage/HorizonLine';
import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getuser } from "../../store/slices/userSlice";


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

const Mypage = () => {

    const nickName = useSelector((state) => state.user.member.nickname)
    const address = useSelector((state) => state.user.member.address)
    const data = {
        nickname : nickName,
        address : address, 
    } 
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
       dispatch(getuser())
    }, []);
    const handleEdit = () => {
        navigate("/myinfo-edit", { state: { ...data } })
    }
    // const handleQuit = () => {
    //     dispatch(quituser())
    // }

    return (
        <div className={style.Layout}>
            <div className={style.Title}>
                <h1>
                    마이페이지
                </h1>
            </div>
            <div className={style.nickName}>
                <span>
                    닉네임 : 
                </span>
                <span>
                    {nickName}
                </span>
                <HorizonLine />
            </div>
            <div className={style.address}>
                <span>
                    주소 : 
                </span>
                <span>
                    {address}
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
            <MyButton onClick={handleEdit}>수정</MyButton>
            {/* <MyButton onClick={handleQuit}>탈퇴</MyButton> */}
        </div>
    );
};

export default Mypage;