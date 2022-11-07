import React from "react";
import Card from "react-bootstrap/Card";

const SubscribeItemComponent = (props) => {
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
