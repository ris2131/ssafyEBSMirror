import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";

const ReservationInfocardComponent = (props) => {

  const navigate = useNavigate();

  const move = () => {
    navigate('/reservation-info-detail', {
      state: {
        item: props.reservation
      }
    });
  };
  //reservationDate는 String으로 넘어온다.
  return (
    <Card>
      <Card.Header>
        <span> 예약 일시 : {props.reservation.reservationDate}</span>
      </Card.Header>
      <Card.Body>
        <Card.Title>헤어샵 이름 : {props.reservation.hairshopName}</Card.Title>
        <Card.Text>디자이너 이름 : {props.reservation.designerName}</Card.Text>
        
        <Button variant="primary" onClick={move}>상세 보기</Button>
      </Card.Body>
    </Card>
  );
};

export default ReservationInfocardComponent;
