import React from "react";
import Card from "react-bootstrap/Card";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import axios from "axios";
const MyButton = styled.button`
  float: right;
  border: none;
  border-radius: 10px;
  color: white;
  background-color: #876445;
  padding: 10px;
  width: 60px;
  font-size: 14px;
  cursor: pointer;
  font-weight: bold;
`;

const Container = styled.div`
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: 6fr 1fr;
    align-items: center;
`;


const SubscribeItemComponent = (props) => {

  const navigate = useNavigate();
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
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
        trypurchase();
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
    const trypurchase=()=>{
      const params = {
          cid : "TCSUBSCRIP",
          partner_order_id : "order"+props.item.pricingSeq,
          partner_user_id : "testuserid",
          item_name : props.item.hairshopName+" 구독권 "+props.item.pricingSeq,
          quantity : 1,
          total_amount : props.item.pricingPrice,
          tax_free_amount : 0,
          approval_url : "https://www.ssafy-ebs.com/pay/approved/",
          cancel_url : "https://www.ssafy-ebs.com/pay/canceled/",
          fail_url : "https://www.ssafy-ebs.com/pay/failed/"
      }
      axios({
          url: "https://kapi.kakao.com/v1/payment/ready",
          method : "POST",
          headers : {
              Authorization : "KakaoAK d08fb758ac87e7487a96eb2cf1bd4b5e",
              "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
          },
          params,
      }).then((res)=>{console.log(res);
          //window.location.assign(res.data.next_redirect_pc_url)
          window.localStorage.setItem('tid', res.data.tid);
          window.localStorage.setItem('order', JSON.stringify(params));
          //ios는 app_url 잘되는데 안드로이드는 안된다...
          isMobile ?window.location.assign(res.data.next_redirect_mobile_url) : window.location.assign(res.data.next_redirect_pc_url);
      })
      

  }
  
  return (
    
      <Card style={{textAlign : "left"}}>
        <Card.Header>
            상품번호 : {props.num + 1}
        </Card.Header>
        <Card.Body>
        {/* <Card.Title>헤어숍 이름 : {props.item.hairshopName}</Card.Title> */}
          <Container>
            <div>
            <Card.Text>
              유효기간 : {props.item.pricingMonth} 개월
            </Card.Text>
            <Card.Text>
              이용횟수 : {props.item.pricingNumber}
              </Card.Text>
              </div>
            <MyButton onClick={handleSubscribe}>구독하기</MyButton>
          </Container>  
        </Card.Body>
        <Card.Footer>
        <Card.Text>
            가격 : {props.item.pricingPrice} 원
          </Card.Text>
      </Card.Footer>
      </Card>
  );
};

export default SubscribeItemComponent;
