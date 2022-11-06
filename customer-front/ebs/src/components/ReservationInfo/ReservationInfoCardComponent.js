import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const ReservationInfocardComponent = (props) => {
  return (
    <Card>
      <Card.Header>
        <span> 예약 일시 : {props.reservation.reservationDate}</span>
      </Card.Header>
      <Card.Body>
        <Card.Title>헤어샵 이름 : {props.reservation.hairshopName}</Card.Title>
        <Card.Text>디자이너 이름 : {props.reservation.designerName}</Card.Text>
        <Card.Text>스타일요청 : {props.reservation.reservationStyle}</Card.Text>
        <Card.Text>
          서비스요청 : {props.reservation.reservationService}
        </Card.Text>
        <Card.Text>기타요청 : {props.reservation.reservationEtc}</Card.Text>
        <Button variant="primary">상세 보기</Button>
      </Card.Body>
    </Card>
  );
};

export default ReservationInfocardComponent;
