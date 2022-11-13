import React, { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { makeSubscribe } from "../../store/slices/subscribeSlice";
import { useDispatch } from "react-redux";



export default function Approved() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = JSON.parse(window.localStorage.getItem('order'));

    const datas = {
        cid: params.cid,
        tid: window.localStorage.getItem('tid'),
        partner_order_id: params.partner_order_id,
        partner_user_id: params.partner_user_id,
        pg_token: window.location.search.split("=")[1]
    };
    useEffect(() => {
        dispatch(makeSubscribe(datas))
            .then((res) => {
                if (res.payload.status === "SUCCESS") {
                    alert("구독 결제에 성공했습니다.");
                    window.localStorage.removeItem('order');
                    window.localStorage.removeItem('tid');
                    navigate('/');
                } else if (res.payload.status !== "SUCCESS") {
                    alert("구독에 실패했습니다. 관리자에게 문의바랍니다.")
                    window.localStorage.removeItem('order');
                    window.localStorage.removeItem('tid');
                    navigate('/');
                }
            }
            );
    }, []);

    
}