import Mypage from '../../pages/mypage/Mypage';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css'
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { removeRefreshToken } from "../../store/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/slices/userSlice";
import logoImg from "../../assets/ebs_logo_beige.png"
import { GrClose } from "react-icons/gr"
import { getuser } from "../../store/slices/userSlice";
import { mergeBreakpointsInOrder } from '@mui/system';
import HorizonLine from '../HorizonLine';
import "../../fonts/font.css"
import { red } from '@mui/material/colors';
import style from './Ebsnav.module.css';

const StyledImage = styled.img`
  width: 45px;
  height: 45px;
  cursor: pointer;
  margin-bottom: 10px;
`;

const Title = styled.div`
  font-size: 35px;
  font-weight: bold;
  padding-bottom: 5px;
  font-family: GowunBatang-Regular;
`;

const Menuitem = styled.div`
  font-size: 20px;
  text-align: center;
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
          <Navbar key={expand} expand={expand} className={style.Ebsnav}>
            <Container fluid id="Navbar">
              {/* <Navbar.Brand href="#">EBS</Navbar.Brand> */}
              <StyledImage src={logoImg} alt="#" onClick={() => navigate("/")} />
              <Title>EBS</Title>
              <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} className={style.Toggle} />
              <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-${expand}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                placement="end"
                className={style.Offcanvas}
              >
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  {nickName}님
                  </Offcanvas.Title>
                  {/* <GrClose onClick={handleShow} size="30"/> */}
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Nav className="justify-content-end flex-grow-1 pe-3">
                    <Menuitem>
                      <Nav.Link href="mypage"><nobr>마이페이지</nobr></Nav.Link>
                      <HorizonLine/>
                      <Nav.Link href="/search"><nobr>헤어숍 검색</nobr></Nav.Link>
                      <HorizonLine/>
                      <Nav.Link href="/reservation-info"><nobr>예약 내역</nobr></Nav.Link>
                      <HorizonLine/>
                      <Nav.Link href="/subscribe-info"><nobr>구독 내역</nobr></Nav.Link>
                      <HorizonLine/>
                      <Nav.Link onClick={handleLogout}><nobr>로그아웃</nobr></Nav.Link>
                    </Menuitem>
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

