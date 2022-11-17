import * as React from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { styled as muistyled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { fontWeight } from '@mui/system';
import visited from '../../visited.png';

const Forfont = styled.div`
  font-family: GowunBatang-Regular;
  
`;

const Shopname = styled.span`
  color: blue;
`;

const Time = styled.div`
 color: red;
 font-weight: bold;
 margin-top: -30px;
`;

const Visit = styled.div`
  font-weight: bold;
  margin-bottom : 20px;
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
  fontWeight: 'bold'
  
  
}));

const AlterItem = muistyled(Paper)(() => ({
  
  textAlign: 'center',
  color: '#000000',
  margin: '30px 30px 30px 30px',
  height: 'auto',
  width: 'auto',
  lineHeight: '60px',
  backgroundColor: '#F9F9F9',
  backgroundImage: `url(${visited})`,
  backgroundSize: 'cover',
//   color: '#FFFFFF',
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

export default function ReservationCardComponent(props) {
  console.log(typeof props.reservation.reservation_date)
  const navigate = useNavigate();

  const data = {
    businessSeq : props.reservation.business_seq
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

  const date1 = new Date(props.reservation.reservation_date);
  const date2 = new Date();
  
  return (
            date1>date2?
            <Box>
                <Item elevation={24}>
                  
                  <ThemeProvider theme={theme}>
                    <Visit>방문 예정</Visit>
                    <Time> 예약 날짜 : {props.reservation.reservation_date.substring(2,10).replace('T', ' ').replaceAll('-','/')}</Time>
                    <Time> 예약 시간 : {props.reservation.reservation_date.substring(11,16).replace('T', ' ')}</Time>
                    <span>헤어숍 이름 :</span>
                    <Shopname onClick={moveshop}> @{props.reservation.hairshop_name}</Shopname>
                    <div>디자이너 이름 : {props.reservation.designer_name}</div>
                    <Button variant="contained" color="brown"  onClick={move} sx={{ fontFamily: 'GowunBatang-Regular', fontWeight: 'bold'}}>상세보기</Button>
                  </ThemeProvider>
                </Item>
            </Box>
            :
            <Box>
                <AlterItem elevation={24}>
                  
                  <ThemeProvider theme={theme}>
                    <Visit>방문 완료</Visit>
                    <Time> 예약 날짜 : {props.reservation.reservation_date.substring(2,10).replace('T', ' ').replaceAll('-','/')}</Time>
                    <Time> 예약 시간 : {props.reservation.reservation_date.substring(11,16).replace('T', ' ')}</Time>
                    <span>헤어숍 이름 :</span>
                    <Shopname onClick={moveshop}> @{props.reservation.hairshop_name}</Shopname>
                    <div>디자이너 이름 : {props.reservation.designer_name}</div>
                    <Button variant="contained" color="brown"  onClick={move} sx={{ fontFamily: 'GowunBatang-Regular', fontWeight: 'bold'}}>상세보기</Button>
                  </ThemeProvider>
                </AlterItem>
            </Box>
          
  );
}


