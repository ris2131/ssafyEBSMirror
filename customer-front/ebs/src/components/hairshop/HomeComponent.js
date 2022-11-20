import axios from 'axios';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from "styled-components";
import { ImLocation } from "react-icons/im";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import { MdDescription } from "react-icons/md";


const Container = styled.div`
    text-align: left;
    font-weight: bold;
    font-size: 18px;
    font-family: GowunBatang-Regular;
    
`;

const Adress = styled.div`
    display: inline;
    margin-left: 13px;
    
`;

const PhoneNumber = styled.div`
    display: inline;
    margin-left: 19px;
`;

const Homepage = styled.div`
    display: inline;
    margin-left: 15px;
`;

const Notice = styled.div`
    display: inline;
    margin-left: 19px;
    
`;

const AddressContainer = styled.div`
    margin-bottom: 5px;
`;

const PhoneContainer = styled.div`
margin-bottom: 5px;
`;

const HomeContainer = styled.div`
margin-bottom: 5px;
`;

const ScriptContainer = styled.div`
margin-bottom: 5px;
`;

const HomeComponent = () => {
    const address = useSelector((state) => state.business.hairshop.address);
    const phoneNumber = useSelector((state) => state.business.hairshop.phone);
    const homepage = useSelector((state) => state.business.hairshop.homepage);
    const notice = useSelector((state) => state.business.hairshop.notice);
    useEffect(() => {
        
     }, []);
    
    return (
        <Container>
            <AddressContainer>
                <ImLocation size="28" color="brown"/>
                <Adress>
                    {address}
                </Adress>
            </AddressContainer>
            <br/>
            <PhoneContainer>
                <FaPhoneAlt size="24" color="brown"/>
                <PhoneNumber>
                    {phoneNumber}
                </PhoneNumber>
            </PhoneContainer>
            <br/>
            <HomeContainer>
                <IoMdHome size="28" color="brown"/>
                <Homepage>
                    {homepage}
                </Homepage>
            </HomeContainer>
            <br/>
            <ScriptContainer>
                <MdDescription size="25" color="brown"/>
                <Notice>
                    {notice}
                </Notice>
            </ScriptContainer>
        </Container>
    );
};

export default HomeComponent;