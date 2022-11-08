import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
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
const Subscribe = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const item = location.state.item;
    const data = {
        businessSeq : item.businessSeq
    }

    const subseq = () => {

    }

    const postSubscribe = () => {

    };

    const move = () =>{
        navigate('/hairshop-info', {state:{...data}});
    };


    return (
        <div>
            <div>상품번호{item.pricingSeq}번을 {item.pricingPrice}원에 구독하시겠습니까?</div>
            <MyButton onClick={postSubscribe}>구독하기</MyButton>
            <MyButton onClick={move}>취소</MyButton>
        </div>
    )
}
export default Subscribe;