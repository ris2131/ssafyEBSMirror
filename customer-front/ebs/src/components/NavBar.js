import { useState } from "react";

import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import { removeRefreshToken } from "../store/slices/userSlice";
import { useDispatch } from "react-redux";
import { userActions } from "../store/slices/userSlice";

const NavDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px;
  font-size: 40px;
`;

// const logoImage = `../assets/Hairshopimage01.png`;

// const StyledImage = styled.img`
//   width: 80px;
//   height: 80px;
//   cursor: pointer;
// `;
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
    removeRefreshToken();
    dispatch(userActions.logout());
  };

  return (
    <NavDiv>
      {/* <div>
        <StyledImage src={logoImage} alt="#" onClick={() => navigate("/")} />
      </div> */}
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
        <MenuItem onClick={() => navigate("/mypage")}>
          내정보
        </MenuItem>
        <MenuItem onClick={() => navigate("/reservation-info")}>
          예약정보
        </MenuItem>
        <MenuItem onClick={() => navigate("/subscribe-info")}>
          구독정보
        </MenuItem>
        <MenuItem onClick={handleLogout}>로그아웃</MenuItem>
      </Menu>
    </NavDiv>
  );
};

export default NavBar;
