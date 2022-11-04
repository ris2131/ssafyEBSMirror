import axios from 'axios';
import React, { useEffect } from 'react';
import styled from "styled-components";

const Container = styled.div`

`;

const Adress = styled.div`

`;

const PhoneNumber = styled.div`

`;

const Homepage = styled.div`
`;

const Description1 = styled.div`
`;

const HomeComponent = () => {
    const params = { search_keyword : "이" }
    useEffect(() => {
        axios.get("http://localhost:8080/search/hairshop/1/designer").then((res) => (console.log(res))).catch(()=>(console.log("!!!!!!!!!")))
     }, []);
    
    return (
        <Container>
            <Adress>
                
            </Adress>
            <PhoneNumber>

            </PhoneNumber>
            <Homepage>

            </Homepage>
            <Description1>

            </Description1>
        </Container>
    );
};

export default HomeComponent;