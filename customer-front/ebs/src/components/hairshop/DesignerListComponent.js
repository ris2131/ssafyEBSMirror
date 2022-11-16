import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import styled from "styled-components";
// import { useNavigate } from "react-router-dom";

const DesignerListComponent = (props) => {

//   const navigate = useNavigate();
const MyButton = styled.button`
  float: right;
  border: none;
  border-radius: 10px;
  color: white;
  background-color: #42a5f5;
  padding: 10px;
  width: 60px;
  font-size: 14px;
  cursor: pointer;
`;

const handlerRes = (e) => {
  props.func(3)
  props.setDisgnerSeq(e.target.value)
}
 console.log(props.designer);
  return (
    <div>
   
      <Card>
      <Card.Img variant = "top" src={props.designer.photo} width="200px" height="150px" />
        <Card.Body>
          <Card.Title >{props.designer.name}</Card.Title>
          <Card.Text >
            설명 : {props.designer.description}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default DesignerListComponent;

