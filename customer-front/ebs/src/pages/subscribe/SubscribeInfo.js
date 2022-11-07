import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SubscribeInfoComponent from "../../components/SubscribeInfo/SubscribeInfoComponent";
import { getsubscribeinfo } from "../../store/slices/subscribeSlice";

const SubscribeInfo = () => {
  const mysubscribe = useSelector((state) => state.subscribe.mysubscribe);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getsubscribeinfo());
  }, []);

  return (
    <div>
      <div>
        <h1>구독 내역</h1>
        <div>
          {mysubscribe.length === 0? (
            <>구독 정보가 없습니다.</>
          ) : (
            mysubscribe.map((a, i) => {
              return (
                <SubscribeInfoComponent
                  subscribe={mysubscribe[i]}
                  num={i}
                  key={i}
                />
              );
            })
          )}
        </div>
        {/* {mysubscribe.length ? <>a</> : <>구독 정보가 없습니다.</>} */}
      </div>
    </div>
  );
};

export default SubscribeInfo;
