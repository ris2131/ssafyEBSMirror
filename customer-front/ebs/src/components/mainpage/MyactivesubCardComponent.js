import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Hairshopimage01  from "../../assets/Hairshopimage01.png";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Customcard = styled.div`
    width: 80%;
    font-family: GowunBatang-Regular;
    margin: auto;
    margin-top: 20px;
    

    
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
            height="200"
            image={require('../../assets/Hairshopimage01.png')}
            alt="HairshopImage"
            />
            <CardContent>
            <Typography gutterBottom variant="h5" component="div">
                {props.subscribe.hairshopName}
            </Typography>
            </CardContent>
        </CardActionArea>
        <CardActions>
            <Button  size="small" color="primary">
            예약하러 가기
            </Button>
        </CardActions>
        </Card>
    </Customcard>
  );
}





//import Hairshopimage01  from "../../assets/Hairshopimage01.png";
//import ReservationButton from "./ReservationButton";