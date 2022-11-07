import * as React from 'react';
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
  borderRadius: '10px'
  
  
  
}));

const theme = createTheme({
    palette: {
        brown: {
            main: '#9D7F5C'
        }
    }
});

export default function Test(props) {
  return (
            <Box>
                <Item elevation={24}>
                  
                  <ThemeProvider theme={theme}>
                    <div>예약 일시 : {props.reservation.reservationDate}</div>
                    <div>헤어샵 이름 : {props.reservation.hairshopName} </div>
                    <div>디자이너 이름 : {props.reservation.designerName}</div>
                    <div>스타일요청 : {props.reservation.reservationStyle}</div>
                    <div>서비스요청 : {props.reservation.reservationService}</div>
                    <div>기타요청 : {props.reservation.reservationEtc}</div>
                    <Button variant="contained" color="brown">상세보기</Button>
                  </ThemeProvider>
                </Item>
            </Box>
          
  );
}


