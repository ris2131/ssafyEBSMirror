import * as React from 'react';
import "../../fonts/font.css"
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';


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
  const date1 = new Date(props.subscribe.subscriptionExpiration);
  const date2 = new Date();
  return (
            (props.subscribe.subscriptionLeft<=0 || date1>date2) ?
            <Box>
                <Item elevation={24}>
                  
                  <ThemeProvider theme={theme}>
                    <div>헤어숍 이름 : {props.subscribe.hairshopName}</div>
                    <div>전체 횟수 : {props.subscribe.pricingNumber}  </div>
                    <div>남은 횟수 : {props.subscribe.subscriptionLeft}</div>
                    <div>구독 시작일 : {props.subscribe.subscriptionStart.substring(0,19).replace('T', ' ')} </div>
                    <div>구독 만료일 : {props.subscribe.subscriptionExpiration.substring(0,19).replace('T', ' ')}</div>
                  </ThemeProvider>
                </Item>
            </Box>
          :
          <Box>
                <AlterItem elevation={24}>
                  
                  <ThemeProvider theme={theme}>
                    <div>헤어숍 이름 : {props.subscribe.hairshopName}</div>
                    <div>전체 횟수 : {props.subscribe.pricingNumber}  </div>
                    <div>남은 횟수 : {props.subscribe.subscriptionLeft}</div>
                    <div>구독 시작일 : {props.subscribe.subscriptionStart.substring(0,19).replace('T', ' ')} </div>
                    <div>구독 만료일 : {props.subscribe.subscriptionExpiration.substring(0,19).replace('T', ' ')}</div>
                  </ThemeProvider>
                </AlterItem>
            </Box>
  );
}







