import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Mainpage from '../mainpage/Mainpage';
import Mypage from '../mypage/Mypage';


const Ebsnav = () => {
  return (
    <>
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand to="/mainpage">ebs</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link to="/mypage">마이페이지</Nav.Link>
            <Nav.Link to="#features">헤어숍 검색</Nav.Link>
            <Nav.Link to="#pricing">예약 내역</Nav.Link>
            <Nav.Link to="#pricing">구독 정보</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Ebsnav;