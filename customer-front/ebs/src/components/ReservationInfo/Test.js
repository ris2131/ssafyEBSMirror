import * as React from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";


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
  console.log(typeof props.reservation.reservationDate)
  const navigate = useNavigate();

  const data = {
    businessSeq : props.reservation.businessSeq
  }

  const move = () => {
    navigate('/reservation-info-detail', {
      state: {
        item: props.reservation
      }
    });
  };

  const moveshop = () => {
    navigate('/hairshop-info', {state:{...data}});
  }

  const date1 = new Date(props.reservation.reservationDate);
  const date2 = new Date();
  
  return (
            <Box>
                <Item elevation={24}>
                  
                  <ThemeProvider theme={theme}>
                    <div> 예약 일시 : {props.reservation.reservationDate}</div>
                    <div>                              </div>
                    {date1>date2?<div>방문 예정</div>:<div>방문 완료</div>}
                    <div onClick={moveshop}>헤어샵 이름 : {props.reservation.hairshopName}</div>
                    <div>디자이너 이름 : {props.reservation.designerName}</div>
                    <Button variant="contained" color="brown" onClick={move}>상세보기</Button>
                  </ThemeProvider>
                </Item>
            </Box>
          
  );
}


