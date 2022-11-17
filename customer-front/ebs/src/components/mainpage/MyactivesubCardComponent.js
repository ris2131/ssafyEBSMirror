import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Hairshopimage01  from "../../assets/Hairshopimage01.png";
import forwardArrow from "../../assets/forward_arrow_585858.png";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Customcard = styled.div`
    width: 80%;
    font-family: GowunBatang-Regular;
    margin: auto;
    margin-top: 20px;
`;

const Shopname = styled.div`
    margin: 0 auto;
    font-size: 30px;
    font-weight: bold;
`;
const ReservationTextDiv = styled.div`
  margin: 0 0 0 auto;
  position: relative;
`;
const ReservationImg = styled.img`
    width:20px;
    height:20px;
    top: 0;
    right: 0;
    transform: translate(1px, -2px);
`;

const ReservationText = styled.div`
    margin: 0 0 0 auto;
    font-family: GowunBatang-Regular; 
    color: #585858;
`;



export default function MultiActionAreaCard(props) {
    const navigate = useNavigate();
    console.log(props)
    const data = {
        businessSeq : props.subscribe.businessSeq
      }
    const moveshop = () => {
        navigate('/hairshop-info', {state:{...data}});
      }

  return (
    <Customcard onClick={moveshop}>
        <Card sx={{ Width: '50%' }}>
        <CardActionArea>
            <CardMedia
            component="img"
            height="300"
            image={require('../../assets/Hairshopimage01.png')}
            alt="HairshopImage"
            />
            <CardContent>
            <Shopname >
                {props.subscribe.hairshopName}
            </Shopname>
            </CardContent>
        </CardActionArea>
        <CardActions >
            <ReservationTextDiv style={{cursor : "pointer"}}>
              <ReservationText>
              예약하러 가기
              <ReservationImg src={forwardArrow}  alt = "#"/>
              </ReservationText>
            </ReservationTextDiv>
        </CardActions>
        </Card>
    </Customcard>
  );
}





//import Hairshopimage01  from "../../assets/Hairshopimage01.png";
//import ReservationButton from "./ReservationButton";