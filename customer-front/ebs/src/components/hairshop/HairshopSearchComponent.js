import React from "react";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";

const HairshopSearchComponent = (props) => {
  const data = {
    businessSeq : props.hairshop.businessSeq
  }
  const navigate = useNavigate();
  const getInfor = () => {
    navigate("/hairshop-info", {state: { ...data } })

  }
  return (
    <div>
      <Card>
        <Card.Body>
          <Card.Title onClick={getInfor}>헤어숍 이름 : {props.hairshop.name}</Card.Title>
          <Card.Text onClick={getInfor} >
            주소 : {props.hairshop.address} 
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default HairshopSearchComponent;

