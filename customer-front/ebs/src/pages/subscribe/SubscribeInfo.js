import React from 'react';
import SubscribeInfoComponent from "../../components/SubscribeInfo/SubscribeInfoComponent";

const SubscribeInfo = () => {
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