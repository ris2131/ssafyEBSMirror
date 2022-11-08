import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import { removeRefreshToken } from "../store/slices/userSlice";
import { useDispatch } from "react-redux";
import { userActions } from "../store/slices/userSlice";
import logoImg  from "../assets/ebs_logo.png"

const NavDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px;
  font-size: 40px;
  background-color: 	#BEB2A7;
`;



const StyledImage = styled.img`
  width: 50px;
  height: 50px;
  cursor: pointer;
  margin-bottom: 10px;
`;
const HamBar = styled.div`
  cursor: pointer;
  padding: 10px;
  
`;

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.setItem("token", "");
    localStorage.setItem("nickname", "")
    removeRefreshToken();
    dispatch(userActions.logout());
    navigate("/login");
  };


  return (
    <NavDiv>
      <div>
        <StyledImage src={logoImg} alt="#" onClick={() => navigate("/")} />
      </div>
      <HamBar>
        <Avatar onClick={handleClick}>H</Avatar>
      </HamBar>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => {setAnchorEl(null); navigate("/mypage"); }}>
          내정보
        </MenuItem>
        <MenuItem onClick={() => {setAnchorEl(null); navigate("/reservation-info")}}>
          예약정보
        </MenuItem>
        <MenuItem onClick={() => {setAnchorEl(null); navigate("/subscribe-info")}}>
          구독정보
        </MenuItem>
        <MenuItem onClick={() => {setAnchorEl(null); navigate("/search")}}>
          검색하기
        </MenuItem>
        <MenuItem onClick={handleLogout}>로그아웃</MenuItem>
      </Menu>
    </NavDiv>
  );
};

export default NavBar;
