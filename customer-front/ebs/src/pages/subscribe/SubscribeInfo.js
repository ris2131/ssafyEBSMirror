import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import SubscribeInfoComponent from "../../components/SubscribeInfo/SubscribeInfoComponent";
import { subscribeApi } from "../../api/subscribeApi";
import axios from 'axios';

const SubscribeInfo = () => {
    // const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const = [subscribe, setSubscribe] = useState();
  

    useEffect(() => {
        axios.get("https://k7d107.p.ssafy.io/api/subscribe")
        .then((res) => {
            console.log("구독정보");
            console.log(res.data);
        })
        .catch((error) => {
            console.log("에러");
            console.log(error);
        });
    }, []);
        
    return (
        <div>
            <div>
                <h1> 
                    구독 내역 
                </h1>
                    <div>
                        <SubscribeInfoComponent />
                    </div>
            </div>
        </div>
    );
};

export default SubscribeInfo;