import { useState, useEffect, useCallback  } from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import TextField from "@mui/material/TextField";
import { putuser } from "../../store/slices/userSlice";
import { useNavigate, useLocation } from "react-router-dom";

const MenuText = styled.p`
  font-size: 22px;
  width: 200px;
`;

const MenuBox = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;
  margin: 20px 0;
`;
const MyButton = styled.button`
  border: none;
  border-radius: 10px;
  color: white;
  background-color: #42a5f5;
  padding: 10px;
  margin-top: 40px;
  width: 60px;
  font-size: 14px;
  cursor: pointer;
`;

const MyInfoEdit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const member = {...location.state}
  
  const [nickname, setNickname] = useState("");
  const [address, setAddress] = useState("");
  console.log(member)

  const fetchState = useCallback(() => {
    setNickname(member.nickname);
    setAddress(member.address);

  }, []);

  const handleNickname = (e) => {
    setNickname(e.target.value);
  };
  const handleAddress = (e) => {
    setAddress(e.target.value);
  };



  const handleSubmit = () => {
    

    const data = {
      member_nickname : nickname,
      member_address : address,
    };
    console.log(data)
    dispatch(putuser(data))
    .unwrap()
    .then((res) => {console.log(res); alert("수정완료되었습니다!."); navigate("/mypage")})
    .catch((err) => console.error(err));

    // const formData = new FormData();
    // const blob = new Blob([JSON.stringify(data)], {
    //   type: "application/json",
    // });

    // formData.append("data", blob);

    
    // }

  };

  useEffect(() => {
    fetchState();
  }, [fetchState]);

  return (
    <>
      
      <MenuBox>
        <MenuText>닉네임</MenuText>
        <TextField
          variant="standard"
          style={{ width: "40%" }}
          value={nickname || ""}
          onChange={handleNickname}
        />
      </MenuBox>
      <MenuBox>
        <MenuText>주소</MenuText>
        <TextField
          variant="standard"
          style={{ width: "40%" }}
          value={address || ""}
          onChange={handleAddress}
        />
      </MenuBox>
      <MyButton onClick={handleSubmit}>수정</MyButton>
    </>
  );
};

export default MyInfoEdit;
