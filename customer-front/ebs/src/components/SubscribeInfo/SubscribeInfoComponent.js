import * as React from 'react';
import { useNavigate } from "react-router-dom";
import "../../fonts/font.css"
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { styled as muistyled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import Swal from "sweetalert2";
import styled from "styled-components";
import expired from '../../assets/expired.png';

const StampDiv = styled.div`
  background: url(${expired}) no-repeat center / contain;
`;

const Item = muistyled(Paper)(() => ({
  textAlign: 'center',
  margin: '30px 30px 30px 30px',
  height: 'auto',
  width: 'auto',
  lineHeight: '60px',
  
  backgroundColor: '#F9F9F9',
//   color: '#FFFFFF',
  borderRadius: '10px',
  fontFamily: 'GowunBatang-Regular',
  fontWeight: 'bold'
}));

const AlterItem = muistyled(Paper)(() => ({
  
  textAlign: 'center',
  color: '#000000',
  margin: '30px 30px 30px 30px',
  height: 'auto',
  width: 'auto',
  lineHeight: '60px',
  background: `#DDDDDD`,
  borderRadius: '10px',
  fontWeight: 'bold'
}));

const theme = createTheme({
    palette: {
        brown: {
            main: '#DFD3C3'
        }
    }
});

const Shopname = styled.span`
  color: blue;
`;

const Expiration = styled.div`
  color: red;
`;


export default function SubscribeInfoComponent(props) {
  
  // const data = {
  //   businessSeq : props.reservation.businessSeq
  // }

  const data = {
    businessSeq : props.subscribe.businessSeq
  }

  const navigate = useNavigate();

  // const moveshop = () => {
  // navigate('/hairshop-info', {state:{...data}});
  // }

  const moveshop = () => {
    navigate('/hairshop-info', {state:{...data}});
  }
  const date1 = new Date(props.subscribe.subscriptionExpiration);
  const date2 = new Date();

//   const theme = createTheme({
//     palette: {
//         brown: {
//             main: '#DFD3C3'
//         }
//     }
// });



  const unsub = () =>{
    
    Swal.fire({
      icon: "warning",
      title: "구독갱신 취소",
      text: "구독 갱신을 취소하시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "해지",
      cancelButtonText: "취소",
      confirmButtonColor: '#876445',// confrim 버튼 색깔 지정
      iconColor:'#876445',//아이콘 색깔 설정.
      cancelButtonColor:'#dfd3c3'
    }).then((res) => {
      if (res.isConfirmed) {
        axios({
          url: `/api/subscribe/${props.subscribe.businessSeq}`,
          method: "DELETE",
          headers : {
            Authorization : localStorage.getItem("token"),
            "Content-Type": "application/json;charset=UTF-8",
            accept: "application/json",
          },
        })
        .then((resp)=>{
          if (resp.data.status === 'SUCCESS') {
            Swal.fire({
              icon: "success",
              title: "완료",
              text: "구독갱신이 취소되었습니다.",
              showConfirmButton: true,
              timer: 3000,
              confirmButtonColor: '#876445',// confrim 버튼 색깔 지정
              iconColor:'#876445'
            }).then(window.location.reload());
          }else{
            Swal.fire({
              icon: "error",
              title: "오류",
              text: "오류가 발생했습니다. 관리자에게 문의해주세요.",
              showConfirmButton: true,
              timer: 3000,
              confirmButtonColor: '#876445',// confrim 버튼 색깔 지정
              iconColor:'#876445'
            }).then(window.location.reload());
          }
  
        })
      } else {
        Swal.fire({
          icon: "info",
          title: "취소",
          text: "취소하였습니다.",
          showConfirmButton: true,
          timer: 3000,
          confirmButtonColor: '#876445',// confrim 버튼 색깔 지정
          iconColor:'#876445'
        });
      }
    })
  }

  return (
    ((props.subscribe['subscriptionLeft'] > 0) && (date1 > date2)) ?
      (props.subscribe['subscriptionRenew']) ? (
        <Box>
          <Item elevation={24}>
            <ThemeProvider theme={theme}>
              <span>헤어숍 이름 :</span>
              <Shopname onClick={moveshop}> @{props.subscribe.hairshopName}</Shopname>
              <div>횟수 : {props.subscribe.subscriptionLeft} / {props.subscribe.pricingNumber}  </div>
              <div>구독 시작일 : {props.subscribe.subscriptionStart.substring(0, 10).replace('T', ' ')} </div>
              <Expiration>구독 만료일
                : {props.subscribe.subscriptionExpiration.substring(0, 10).replace('T', ' ')}</Expiration>
              <Button variant="contained" color="brown"
                      sx={{fontFamily: 'GowunBatang-Regular', fontWeight: 'bold', color: 'red'}} onClick={unsub}>정기결제
                해지</Button>
            </ThemeProvider>
          </Item>
        </Box>
      ) : (
        <Box>
          <Item elevation={24}>
            <ThemeProvider theme={theme}>
              <span>헤어숍 이름 :</span>
              <Shopname onClick={moveshop}> @{props.subscribe.hairshopName}</Shopname>
              <div>횟수 : {props.subscribe.subscriptionLeft} / {props.subscribe.pricingNumber}  </div>
              <div>구독 시작일 : {props.subscribe.subscriptionStart.substring(0, 10).replace('T', ' ')} </div>
              <div>구독 만료일 : {props.subscribe.subscriptionExpiration.substring(0, 10).replace('T', ' ')}</div>
            </ThemeProvider>
          </Item>
        </Box>
      ) :
      (props.subscribe['subscriptionRenew']) ? (
        <Box>
          <AlterItem elevation={24}>
            <ThemeProvider theme={theme}>
              <StampDiv>
                <span>헤어숍 이름 :</span>
                <Shopname onClick={moveshop}> @{props.subscribe.hairshopName}</Shopname>
                <div>횟수 : {props.subscribe.subscriptionLeft} / {props.subscribe.pricingNumber}  </div>
                <div>구독 시작일 : {props.subscribe.subscriptionStart.substring(0, 10).replace('T', ' ')} </div>
                <div>구독 만료일 : {props.subscribe.subscriptionExpiration.substring(0, 10).replace('T', ' ')}</div>
              </StampDiv>
              <Button variant="contained" color="brown"
                      sx={{fontFamily: 'GowunBatang-Regular', fontWeight: 'bold', color: 'white'}} onClick={unsub}>정기결제
                해지</Button>
            </ThemeProvider>
          </AlterItem>
        </Box>
      ) : (
        <Box>
          <AlterItem elevation={24}>
            <ThemeProvider theme={theme}>
              <StampDiv>
                <span>헤어숍 이름 :</span>
                <Shopname onClick={moveshop}> @{props.subscribe.hairshopName}</Shopname>
                <div>횟수 : {props.subscribe.subscriptionLeft} / {props.subscribe.pricingNumber}  </div>
                <div>구독 시작일 : {props.subscribe.subscriptionStart.substring(0, 10).replace('T', ' ')} </div>
                <div>구독 만료일 : {props.subscribe.subscriptionExpiration.substring(0, 10).replace('T', ' ')}</div>
              </StampDiv>
            </ThemeProvider>
          </AlterItem>
        </Box>)
  );
}