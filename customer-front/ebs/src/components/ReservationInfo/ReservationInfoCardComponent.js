import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const ReservationInfocardComponent = () => {
  return (
    <Card>
      <Card.Header>
        <span> 2022.10.22</span>
        <span>방문 완료</span>
      </Card.Header>
      <Card.Body>
        <Card.Title>헤어 토모다찌</Card.Title>
        <Card.Text>
         수석 디자이너 영우
        </Card.Text>
        <Button variant="primary">상세 보기</Button>
      </Card.Body>
    </Card>
  );
}

export default ReservationInfocardComponent;