import React from "react";
import Card from "react-bootstrap/Card";
import Swal from "sweetalert2";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
const MyButton = styled.button`
  float: right;
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
    navigate('/subscribe', {
      state: {
        item: props.item
      }
    });
  };
  
  const handleSubscribe=()=>{
    console.log("구독?");
    Swal.fire({
      title: '상품을 구독 하시겠습니까?',
      icon: "question",
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: 'No',

      confirmButtonColor: '#876445',// confrim 버튼 색깔 지정
      iconColor:'#876445',//아이콘 색깔 설정.
      denyButtonColor:'#dfd3c3',
      customClass: {
        actions: 'my-actions',
        confirmButton: 'order-1',
        denyButton: 'order-2',
      }
    }).then((result) => {
      //yes 눌렀을때
      if (result.isConfirmed) {
        //To 대희: 여기다가 subscribe.js 의 tryPurchase를 넣으면 되는거 같은데 확실치 않아서 안건드렸음. 
        move();//move 하니 일단 네비게이트 됨 ㅋㅋ
      } else if (result.isDenied) {
        Swal.fire({
          title: '구독결정을 취소하셨습니다.', 
          icon: 'info',
          iconColor: '#dfd3c3',
          confirmButtonColor: '#dfd3c3',
        })
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
          <MyButton onClick={handleSubscribe}>구독하기</MyButton>
          <Card.Text>
            이용횟수 : {props.item.pricingNumber}
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
