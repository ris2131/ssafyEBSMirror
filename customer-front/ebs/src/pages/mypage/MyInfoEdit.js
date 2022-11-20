import { useState, useEffect, useCallback  } from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import TextField from "@mui/material/TextField";
import { putuser } from "../../store/slices/userSlice";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

const Container = styled.div`
  background-color: #FBF8F1;
  font-family: GowunBatang-Regular;
  // height: 85vh;
  flex: 1;
`;

const MenuText = styled.p`
  display: flex;
  justify-content: start;
  font-size: 22px;
  width: 100px;
  margin: 10px 10px 10px 10px;
  
`;

const MenuBox = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;
  margin: 20px 0;
`;

const Buttonstyle = styled.div`
  display: flex;
  justify-content: end;
`;

const MyButton = styled.button`
  border: none;
  box-shadow: 0px 0px 3px #000;
  border-radius: 10px;
  color: white;
  background-color: #8a817c;
  padding: 10px;
  margin: 10px 20px 10px 10px;
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
    dispatch(putuser(data))
    .unwrap()
    .then((res) => {
      Swal.fire({
        icon: "success",
        title: "완료",
        text: "회원 정보를 수정했습니다.",
        showConfirmButton: true,
        timer: 3000,
        confirmButtonColor: '#876445',// confrim 버튼 색깔 지정
        iconColor:'#876445'
      })
      navigate("/mypage")})
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
      <Container>
        <MenuBox>
          <MenuText>닉네임</MenuText>
          <TextField
            variant="standard"
            style={{ width: "60%" }}
            value={nickname || ""}
            onChange={handleNickname}
          />
        </MenuBox>
        <MenuBox>
          <MenuText>주소</MenuText>
          <TextField
            variant="standard"
            style={{ width: "60%" }}
            value={address || ""}
            onChange={handleAddress}
          />
        </MenuBox>
        <Buttonstyle>
          <MyButton onClick={handleSubmit}>수정</MyButton>
        </Buttonstyle>
      </Container>
    </>
  );
};

export default MyInfoEdit;
