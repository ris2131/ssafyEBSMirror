// import React from 'react';
import styled from "styled-components";
import * as React from 'react';
import BasicTabs from "../../components/hairshop/TabmenuComponent2";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {getInfo} from "../../store/slices/businessSlice"

const Container = styled.div`
    background-color: #FBF8F1;
    flex: 1;
`;

const Shopimg = styled.img`
    display: block;
    width: 70%;
    height: 200px;
    margin: auto;
    margin-top: 10px;
`;

const Title = styled.div`
    font-size: 25px;
    font-weight: bold;
    text-align: center;
    margin-top: 10px;
`;

const Description = styled.div`
    text-align: center;
    margin: 20px 5px 20px;
`;






const HairshopInfo = () => {
    const shopname = useSelector((state) => state.business.hairshop.name)
    const description = useSelector((state) => state.business.hairshop.description)
    const photo = useSelector((state) => state.business.hairshop.photo)
    const dispatch = useDispatch();
    const location = useLocation();
    const hairshopSeq = {...location.state}
    

    useEffect(() => {
        dispatch(getInfo(hairshopSeq.businessSeq))
     }, []);

    return (
        <Container>
            <Shopimg src={photo}/>
            <Title>
                {shopname}
            </Title>
            <Description>
                {description}
            </Description>
            <BasicTabs hairshopSeq={hairshopSeq.businessSeq}/>
        </Container>
    );
};

export default HairshopInfo;