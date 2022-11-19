import React from "react";
import Card from "react-bootstrap/Card";
import styled from "styled-components";

const ImgDiv = styled.div`
  width: 100%;
  align-items: center;
  aspect-ratio: 1 / 1;
  background-color: #f3f3f3;
  border-bottom: 1px solid #7f7f7f7f;
  border-radius: 10px 10px 0 0;
  cursor: pointer;
  display: flex;
  justify-content: center;
  overflow: hidden;
  position: relative;
`;

const DesignerImg = styled.img`
  max-width: 100%;
  max-height: 100%;
  background-color: #fdfdfd;
`;

const MyButton = styled.button`
  float: right;
  border: none;
  border-radius: 10px;
  color: white;
  background-color: #b086649f;
  padding: 4px;
  width: 60px;
  font-size: 12px;
  cursor: pointer;
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 8px;
  
  &:hover {
    background-color: #b08664;
  }
`;

const DesignerReservationComponent = (props) => {
  const handlerRes = (e) => {
    console.log(e);
    props.func(3);
    props.setDesignerSeq(props.designer['designer_seq']);
    props.setDesignerName(props.designer['name']);
  }
  console.log(props.designer);

  return (
    <div>
      <Card>
        <ImgDiv onClick={handlerRes} value={props.designer['designer_seq']}>
          <DesignerImg src={props.designer.photo}/>
          <MyButton>예약하기</MyButton>
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

export default DesignerReservationComponent;

