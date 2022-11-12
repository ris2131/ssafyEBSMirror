import Mypage from '../../pages/mypage/Mypage';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css'
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import style from './Ebsnav.module.css';
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { removeRefreshToken } from "../../store/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/slices/userSlice";
import logoImg from "../../assets/ebs_logo.png"
import { GrClose } from "react-icons/gr"
import { getuser } from "../../store/slices/userSlice";



const StyledImage = styled.img`
  width: 50px;
  height: 50px;
  cursor: pointer;
  margin-bottom: 10px;
`;

const Ebsnav = () => {
  // const nickName = localStorage.getItem("nickname")
  const nickName = useSelector((state) => state.user.member.nickname)
  useEffect(() => {
    dispatch(getuser())
 }, []);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(!show);

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
          <Navbar key={expand} expand={expand} className="bg-secondary">
            <Container fluid id="Navbar">
              {/* <Navbar.Brand href="#">EBS</Navbar.Brand> */}
              <StyledImage src={logoImg} alt="#" onClick={() => navigate("/")} />
              <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} onClick={handleShow} />
              <Navbar.Offcanvas
                show={show} 
                // onHide={handleClose}
                id={`offcanvasNavbar-expand-${expand}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                placement="end"
                className={style.Offcanvas}
              >
                <Offcanvas.Header>
                  <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  {nickName}님
                  </Offcanvas.Title>
                  <GrClose onClick={handleShow} size="30"/>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Nav className="justify-content-end flex-grow-1 pe-3">
                    <div onClick={() => { handleShow(); navigate("/mypage"); }} >마이페이지</div>
                    <div onClick={() => { handleShow(); navigate("/search"); }}>헤어숍 검색</div>
                    <div onClick={() => { handleShow(); navigate("/reservation-info"); }}>예약 내역</div>
                    <div onClick={() => { handleShow(); navigate("/subscribe-info"); }}>구독 정보</div>
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

