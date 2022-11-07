import React from "react";
import Card from "react-bootstrap/Card";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
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
const SubscribeItemComponent = (props) => {

  const navigate = useNavigate();

  const move = () => {
    navigate('/api', {
      state: {
        item: props.item
      }
    });
  };
  
  return (
    <div>
      <Card>
        <Card.Header>
            상품번호 : {props.num + 1}
        </Card.Header>
        <Card.Body>
          {/* <Card.Title>헤어숍 이름 : {props.item.hairshopName}</Card.Title> */}
          <Card.Text>
            유효기간 : {props.item.pricingMonth} 개월
          </Card.Text>
          <MyButton onClick={move}>구독하기</MyButton>
          <Card.Text>
            횟수 : {props.item.pricingNumber}
          </Card.Text>
          
        </Card.Body>
        <Card.Footer>
          <Card.Text>
            가격 : {props.item.pricingPrice} 원
          </Card.Text>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default SubscribeItemComponent;
