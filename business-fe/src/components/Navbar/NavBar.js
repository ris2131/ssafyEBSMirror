import styled from "styled-components";

import logoImg from "../../assets/logo_beige.png";
import {useNavigate} from "react-router-dom";

const NavHeader = styled.header`
  height: 60px;
  background-color: #2C3639;
  display: flex;
  align-items: center;
  user-select: none;
  padding: 0 50px;
`;

const TitleSpan = styled.span`
  cursor: pointer;
  display: flex;
  flex-direction: row;

  & > * {
    transition-duration: 300ms;
  }

  &:hover > * {
    filter: brightness(0.4) sepia();
    transition-duration: 300ms;
  }
`;

const LogoImg = styled.img`
  width: auto;
  height: 50px;
  margin: 10px;
`;

const TitleH1 = styled.h1`
  color: #DCD7C9;
  margin: 10px 0;
`;

const SpringSpan = styled.span`
  flex: 1;
`;

const MenuNav = styled.nav`
  display: flex;
  flex-direction: row;
  margin: 10px 0;
`;

const MenuButton = styled.button`
  background-color: #455657;
  border: none;
  border-radius: 10px;
  color: #DCD7C9;
  cursor: pointer;
  font-size: 14px;
  margin: 7px;
  font-weight: bold;
  padding: 7px;
  transition-duration: 1000ms;

  &:hover {
    background-color: #DCD7C9;
    color: #455657;
    transition-duration: 1000ms;
  }
`;

const NavBar = () => {
  const navigate = useNavigate();

  const home = () => {
    navigate("/");
  };

  const info = () => {
    navigate("/info");
  };

  const designer = () => {
    navigate("/designer");
  };

  const schedule = () => {
    navigate("/schedule/my-calendar");
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <NavHeader>
        <TitleSpan onClick={home}>
          <LogoImg alt="logo" className="logo" src={logoImg}></LogoImg>
          <TitleH1>EBS</TitleH1>
        </TitleSpan>
        <SpringSpan></SpringSpan>
        <MenuNav>
          <MenuButton onClick={info}>매장</MenuButton>
          <MenuButton onClick={designer}>디자이너</MenuButton>
          <MenuButton onClick={schedule}>예약</MenuButton>
          <MenuButton onClick={logout}>로그아웃</MenuButton>
        </MenuNav>
      </NavHeader>
    </>
  );
}

export default NavBar;