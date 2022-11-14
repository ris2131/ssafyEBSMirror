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

const theme = createTheme({
    palette: {
        brown: {
            main: '#9D7F5C'
        }
    }
});

export default function SubscribeInfoComponent(props) {
  return (
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
          
  );
}







