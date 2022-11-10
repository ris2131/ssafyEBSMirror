import Mypage from '../../pages/mypage/Mypage';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import style from './Ebsnav.module.css';
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { removeRefreshToken } from "../../store/slices/userSlice";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/slices/userSlice";
import logoImg from "../../assets/ebs_logo.png"

const StyledImage = styled.img`
  width: 50px;
  height: 50px;
  cursor: pointer;
  margin-bottom: 10px;
`;

const Ebsnav = () => {
  const User_name = "김싸피"
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLogout = () => {
    localStorage.setItem("token", "");
    localStorage.setItem("nickname", "")
    removeRefreshToken();
    dispatch(userActions.logout());
    navigate("/login");
  }; 
  // const handleShow = () => {
  //   setShow(!show);
  // };
  return (
    <>
      {[false ].map((expand) => (
        <Navbar key={expand} bg="light" expand={expand} className="mb-3">
          <Container fluid>
            {/* <Navbar.Brand href="#">EBS</Navbar.Brand> */}
            <StyledImage src={logoImg} alt="#" onClick={() => navigate("/")} />
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              // show={show} 
              // onHide={handleClose}
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
                  <div onClick={() => { handleClose(); navigate("/mypage"); }} >마이페이지</div>
                  <div onClick={() => { navigate("/search")}}>헤어숍 검색</div>
                  <div onClick={() => { navigate("/reservation-info")}}>예약 내역</div>
                  <div onClick={() => { navigate("/subscribe-info")}}>구독 정보</div>
                  <div onClick={handleLogout}>로그아웃</div> 
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

