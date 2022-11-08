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
 
  return (
    <div>
   
      <Card>
        <Card.Body>
          <Card.Title >디자이너 이름 : {props.designer.name}</Card.Title>
          <Card.Text >
            설명 : {props.designer.description}
            <MyButton  onClick={handlerRes} value={props.designer.designer_seq}>예약</MyButton>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default DesignerListComponent;

