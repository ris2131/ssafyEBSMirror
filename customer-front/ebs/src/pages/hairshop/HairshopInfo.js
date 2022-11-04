// import React from 'react';
import styled from "styled-components";
import Hairshopimage01 from "../../assets/Hairshopimage01.png"
import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CenteredTabs from "../../components/hairshop/TabmenuComponent";
import BasicTabs from "../../components/hairshop/TabmenuComponent2";


const Container = styled.div`
    background-color: #F9F9F9;
    height: 100vh;
`;

const Shopimg = styled.img`
    display: block;
    width: 70%;
    height: auto;
    margin: auto;
`;

const Title = styled.div`
    font-size: 25px;
    font-weight: bold;
    text-align: center;
    margin-top: 10px;
`;

const Discription = styled.div`
    margin: 20px 20px;
`;


const discription = '저희 이발소는 150년 전통을 자랑하는 남성전문 바버샵입니다. 구독권 할인 이벤트 하고 있으니 많은 참여 바랍니다^^'
const shopname = '쌈봉이발소 1호점'



const HairshopInfo = () => {
    return (
        <Container>
            <Shopimg src={Hairshopimage01}/>
            <Title>
                {shopname}
            </Title>
            <Discription>
                {discription}
            </Discription>
            {/* <CenteredTabs/> */}
            <BasicTabs/>
        </Container>
    );
};

export default HairshopInfo;