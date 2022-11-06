import styled from "styled-components";
import TextField from "@mui/material/TextField";


import testImage from '../../assets/Logo.png'

import Swal from "sweetalert2";

import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate} from "react-router-dom";
import { addDesigner } from "../../redux/DesignerSlice";


const DesignerAddBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const FlexInputDiv = styled.div`
    @media screen and (max-width: 1000px) {
      width: 45vw;
    }
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 20vw;
    margin-bottom: 10px;
    cursor: pointer;
  `;

  const SButton = styled.button`
  border-radius: 5px;
  color: white;
  border: none;
  background-color: #9D7F5C;
  padding: 5px;
  margin-top: 40px;
  width: 20vw;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
`;
const TestImg = styled.img`
  width: 100px;
  height: 100px;
`;

const DesignerAdd = () =>{
  const[name, setName] = useState(""); 
  const[description, setDescription] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSubmit = () => {
    const data = {
      name,
      description,
    };
    if(name ===""){
      Swal.fire({ icon: "error", title: "디자이너 이름을 확인해주세요." });
      return;
    }
    dispatch(addDesigner(data))
      .unwrap()
      .then(Swal.fire({ icon: "success", title: "디자이너 추가되었습니다." }))
      .then(() => navigate("/designer"))
      .catch(() => {
        Swal.fire({ icon: "error", title: "정보를 확인해주세요" });
      });
  };

  return (
    <DesignerAddBox>
      
      <FlexInputDiv>
        <TestImg src={testImage}/>
        <SButton>
          변경
        </SButton>
        <SButton>
          삭제
        </SButton>
      </FlexInputDiv>
      <FlexInputDiv>
        <TextField
        fullWidth
        label="디자이너 이름"
        type="text"
        variant="standard"
        value={name}
        onChange={(e) => setName(e.target.value)}
        />
      </FlexInputDiv>
      <FlexInputDiv>
        <TextField
        fullWidth
        label="디자이너 소개페이지"
        type="text"
        multiline
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        />
      </FlexInputDiv> 
      <FlexInputDiv>
        <SButton onClick={handleSubmit}>
          디자이너 추가
        </SButton>
      </FlexInputDiv>
    </DesignerAddBox>
  );
};
export default DesignerAdd;