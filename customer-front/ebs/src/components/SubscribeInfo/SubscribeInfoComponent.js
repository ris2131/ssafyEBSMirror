import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const SubscribeInfoComponent = (props) => {
  return (
    <div>
      <Card>
        <Card.Header>
          <span> 2022.10.22</span>
          <span>방문 완료</span>
        </Card.Header>
        <Card.Body>
          <Card.Title>헤어숍 이름 : {props.subscribe.hairshopName}</Card.Title>
          <Card.Text>
            전체 횟수 : {props.subscribe.pricingNumber} 남은 횟수 :
            {props.subscribe.subscriptionLeft}
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <Card.Text>
            구독 시작일 : {props.subscribe.subscriptionStart} 구독 만료일 :
            {props.subscribe.subscriptionExpiration}
          </Card.Text>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default SubscribeInfoComponent;
