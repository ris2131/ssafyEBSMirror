import React, { useEffect } from "react";
import "../../fonts/font.css"
import { useDispatch, useSelector } from "react-redux";
import SubscribeEmptyComponent from "../../components/SubscribeInfo/SubscribeEmptyComponent";
import SubscribeInfoComponent from "../../components/SubscribeInfo/SubscribeInfoComponent";
import { getsubscribeinfo } from "../../store/slices/subscribeSlice";
import styled from "styled-components";
import hairshop_image from "../../assets/hairshop_image.png"

const Container = styled.div`
  background-color: #efefef;
  font-family: GowunBatang-Regular;
  flex: 1;
  
  
`;

const Title = styled.div`
  font-size: 50px;
  text-align: center;
  font-weight: bold;
  margin-bottom: 30px;
  color: #000000;
  font-family: "GowunBatang-Regular";
`;

const SubscribeInfo = () => {
  const mysubscribe = useSelector((state) => state.subscribe.mysubscribe);


  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getsubscribeinfo());
  }, []);

  return (
    <Container>
        <Title>구독 내역</Title>
        <div>
          {mysubscribe.length === 0? (
            <SubscribeEmptyComponent/>
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
    </Container>
  );
};

export default SubscribeInfo;
