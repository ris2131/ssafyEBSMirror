import * as React from 'react';
import { useNavigate } from "react-router-dom";
import "../../fonts/font.css"
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';



const Item = styled(Paper)(() => ({
  
  textAlign: 'center',
  margin: '30px 30px 30px 30px',
  height: 'auto',
  width: 'auto',
  lineHeight: '60px',
  
  backgroundColor: '#F9F9F9',
//   color: '#FFFFFF',
  borderRadius: '10px',
  fontFamily: 'GowunBatang-Regular'
  
  
  
}));

const AlterItem = styled(Paper)(() => ({
  
  textAlign: 'center',
  color: '#d3d3d3',
  margin: '30px 30px 30px 30px',
  height: 'auto',
  width: 'auto',
  lineHeight: '60px',
  backgroundColor: '#808080',
//   color: '#FFFFFF',
  borderRadius: '10px'
  
  
  
}));

const theme = createTheme({
    palette: {
        brown: {
            main: '#9D7F5C'
        }
    }
});



export default function SubscribeInfoComponent(props) {
  
  // const data = {
  //   businessSeq : props.reservation.businessSeq
  // }
  console.log(props.subscribe.businessSeq)

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



  const unsub = () =>{
    console.log("!!!!!!"+props.subscribe.businessSeq);
    if(window.confirm('구독을 해지하시겠습니까?')){
      axios({
        url: `/api/subscribe/${props.subscribe.businessSeq}`,
        method: "DELETE",
        headers : {
          Authorization : localStorage.getItem("token"),
          "Content-Type": "application/json;charset=UTF-8",
          accept: "application/json",
        },
      })
      .then((res)=>{
        console.log(res);
        if(res.data.status === 'SUCCESS'){
          alert("구독 갱신을 취소했습니다.");
          navigate('/');
        }else{
          alert("구독 갱신 취소에 실패했습니다. 관리자에게 문의해주세요.");
          navigate('/');
        }

      })
    }
  }

  return (
            (props.subscribe.subscriptionLeft<=0 || date1>date2) ?
              (props.subscribe.subscriptionRenew)?
              <Box>
                  <Item elevation={24}>
                    
                    <ThemeProvider theme={theme}>
                      <div onClick={moveshop}>헤어숍 이름 : {props.subscribe.hairshopName}</div>
                      <div>전체 횟수 : {props.subscribe.pricingNumber}  </div>
                      <div>남은 횟수 : {props.subscribe.subscriptionLeft}</div>
                      <div>구독 시작일 : {props.subscribe.subscriptionStart.substring(0,19).replace('T', ' ')} </div>
                      <div>구독 만료일 : {props.subscribe.subscriptionExpiration.substring(0,19).replace('T', ' ')}</div>
                      <button onClick={unsub}>구독취소버튼</button>
                    </ThemeProvider>
                  </Item>
              </Box>
              :
              <Box>
                  <Item elevation={24}>
                    
                    <ThemeProvider theme={theme}>
                      <div onClick={moveshop}>헤어숍 이름 : {props.subscribe.hairshopName}</div>
                      <div>전체 횟수 : {props.subscribe.pricingNumber}  </div>
                      <div>남은 횟수 : {props.subscribe.subscriptionLeft}</div>
                      <div>구독 시작일 : {props.subscribe.subscriptionStart.substring(0,19).replace('T', ' ')} </div>
                      <div>구독 만료일 : {props.subscribe.subscriptionExpiration.substring(0,19).replace('T', ' ')}</div>
                    </ThemeProvider>
                  </Item>
              </Box>
          :
          (props.subscribe.subscriptionRenew)?
            <Box>
                <AlterItem elevation={24}>
                  
                  <ThemeProvider theme={theme}>
                    <div onClick={moveshop}>헤어숍 이름 : {props.subscribe.hairshopName}</div>
                    <div>전체 횟수 : {props.subscribe.pricingNumber}  </div>
                    <div>남은 횟수 : {props.subscribe.subscriptionLeft}</div>
                    <div>구독 시작일 : {props.subscribe.subscriptionStart.substring(0,19).replace('T', ' ')} </div>
                    <div>구독 만료일 : {props.subscribe.subscriptionExpiration.substring(0,19).replace('T', ' ')}</div>
                    <button onClick={unsub}>구독취소버튼</button>
                  </ThemeProvider>
                </AlterItem>
            </Box>
          :
            <Box>
                <AlterItem elevation={24}>
                  
                  <ThemeProvider theme={theme}>
                    <div onClick={moveshop}>헤어숍 이름 : {props.subscribe.hairshopName}</div>
                    <div>전체 횟수 : {props.subscribe.pricingNumber}  </div>
                    <div>남은 횟수 : {props.subscribe.subscriptionLeft}</div>
                    <div>구독 시작일 : {props.subscribe.subscriptionStart.substring(0,19).replace('T', ' ')} </div>
                    <div>구독 만료일 : {props.subscribe.subscriptionExpiration.substring(0,19).replace('T', ' ')}</div>
                  </ThemeProvider>
                </AlterItem>
            </Box>
  );
}







