import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import { useSelector} from "react-redux";

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

const Designer = () =>{
  
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isVisible = useSelector((state) => state.auth.isVisible);
  const navigate = useNavigate();

  const navigateDesignerAdd = () =>{
    navigate("/designer/add");
  }

  const handleVisible = () => {
      console.log("isvisible 은"+isVisible);
      console.log("isLoggedIn 은"+isLoggedIn);
  };
  return (
    <>
      디자이너페이지
      <SButton  onClick={navigateDesignerAdd} >디자이너 추가 </SButton>
      <SButton  onClick={handleVisible} >visible? </SButton>
      
    </>
  );
};
export default Designer;