import axios from 'axios';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from "styled-components";


const Container = styled.div`
    text-align: left;
`;

const Adress = styled.div`

`;

const PhoneNumber = styled.div`

`;

const Homepage = styled.div`
`;

const Notice = styled.div`
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
            <Adress>
                주소 : {address}
            </Adress>
            <PhoneNumber>
                전화번호 : {phoneNumber}
            </PhoneNumber>
            <Homepage>
                홈페이지 : {homepage}
            </Homepage>
            <Notice>
                설명 : {notice}
            </Notice>
        </Container>
    );
};

export default HomeComponent;