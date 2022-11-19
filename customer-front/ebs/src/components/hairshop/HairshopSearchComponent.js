import React from "react";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BsArrowUpRightCircle } from "react-icons/bs"

const Container = styled.div`
  text-align: left;
  font-family: GowunBatang-Regular, 'sans-serif'; 
  margin: 5px 5px 5px 5px;
  
`;

const Customspan = styled.span`
  font-size: 10px;
  margin-right: 2px;
  
`;

const Namespan = styled.span`
  font-weight: bold;
`;

const Gotoshop = styled.span`
  
`;

const Customdiv = styled.div`
  display: flex;
  justify-content: space-between;
`;


const HairshopSearchComponent = (props) => {
  const data = {
    businessSeq : props.hairshop.businessSeq
  }
  const navigate = useNavigate();
  const getInfor = () => {
    navigate("/hairshop-info", {state: { ...data } })

  }
  console.log(props)
  return (
    <Container>
      <Card>
        <Card.Body onClick={getInfor}>
          <Namespan>{props.hairshop.name}</Namespan>
          <br/>
          <Customdiv>
            <span>{props.hairshop.address}</span>
            <Gotoshop>
              <Customspan>헤어숍 보러가기</Customspan>
              <BsArrowUpRightCircle size="12"/>
            </Gotoshop>
          </Customdiv>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default HairshopSearchComponent;

