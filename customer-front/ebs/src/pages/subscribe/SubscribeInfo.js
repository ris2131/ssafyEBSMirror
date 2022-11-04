import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import SubscribeInfoComponent from "../../components/SubscribeInfo/SubscribeInfoComponent";
import { getsubscribeinfo } from "../../store/slices/subscribeSlice";

const SubscribeInfo = () => {
    
    const mysubscribe = useSelector((state)=>state.subscribe.mysubscribe)
    
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getsubscribeinfo())
    }, []);

    return (
        <div>
            <div>
                <h1> 
                    구독 내역 
                </h1>:
                    <div>
                        <SubscribeInfoComponent />
                    </div>
                    {
                        mysubscribe.length ? <div>{mysubscribe[0].subscriptionSeq}</div>: <></>
                    }
                    
            </div>
        </div>
    );
};

export default SubscribeInfo;