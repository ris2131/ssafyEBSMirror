import Mypage from '../mypage/Mypage';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import style from './Ebsnav.module.css';
import { NavLink } from 'react-router-dom';

const Ebsnav = () => {
  const User_name = "김싸피"
  return (
    <>
      {[false ].map((expand) => (
        <Navbar key={expand} bg="light" expand={expand} className="mb-3">
          <Container fluid>
            <Navbar.Brand href="#">EBS</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
              className={style.Offcanvas}
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  {User_name}
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <NavLink to="/mypage">마이페이지</NavLink>
                  <NavLink to="/shop-search">헤어숍 검색</NavLink>
                  <NavLink to="/reservation-info">예약 내역</NavLink>
                  <NavLink to="/subscribe-info">구독 정보</NavLink>
                  <span>로그아웃</span> 
                </Nav>      
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default Ebsnav;

