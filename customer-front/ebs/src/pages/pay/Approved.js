import React, { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { makeSubscribe } from "../../store/slices/subscribeSlice";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";



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
                    Swal.fire({
                        icon: "success",
                        title: "완료",
                        text: "구독에 성공했습니다!\n잠시 후 구독내역페이지로 이동합니다.",
                        showConfirmButton: true,
                        timer: 3000
                    });
                    window.localStorage.removeItem('order');
                    window.localStorage.removeItem('tid');
                    navigate('/subscribe-info');
                } else if (res.payload.status !== "SUCCESS") {
                    Swal.fire({
                        icon: "error",
                        title: "오류",
                        text: "오류가 발생했습니다. 관리자에게 문의해주세요.\n잠시 후 메인페이지로 이동합니다.",
                        showConfirmButton: false,
                        timer: 3000
                    });
                    window.localStorage.removeItem('order');
                    window.localStorage.removeItem('tid');
                    navigate('/');
                }
                window.localStorage.removeItem('order');
                window.localStorage.removeItem('tid');
                navigate('/subscribe-info');
            }
            );
    }, []);

    
}