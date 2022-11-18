import React from "react";
import Card from "react-bootstrap/Card";
import "./Card.css";
import styled from "styled-components";

const ImgDiv = styled.div`
  width: 100%;
  align-items: center;
  aspect-ratio: 1 / 1;
  background-color: #f3f3f3;
  border-bottom: 1px solid #7f7f7f7f;
  border-radius: 10px 10px 0 0;
  display: flex;
  justify-content: center;
  overflow: hidden;
`;

const DesignerImg = styled.img`
  max-width: 100%;
  max-height: 100%;
  background-color: #fdfdfd;
`;

const DesignerListComponent = (props) => {
  return (
    <div>
      <Card>
        <ImgDiv>
          <DesignerImg src={props.designer.photo}/>
        </ImgDiv>
        <Card.Body>
          <Card.Title>{props.designer.name}</Card.Title>
          <Card.Text>
            {props.designer.description}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default DesignerListComponent;

