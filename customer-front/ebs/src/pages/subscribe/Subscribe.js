import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { makeSubscribe } from "../../store/slices/subscribeSlice";
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
    const dispatch = useDispatch();

    const item = location.state.item;
    const data = {
        businessSeq : item.businessSeq
    }

    const subseq = {
        pricingSeq : item.pricingSeq
    }

    const postSubscribe = () => {
        dispatch(makeSubscribe(subseq.pricingSeq))
        .then((res)=>{
            {
                res.payload.status === "SUCCESS"?
                (alert("구독 결제에 성공했습니다")):
                (alert("구독에 실패했습니다. 관리자에게 문의바랍니다."))
            }
        navigate('/')})
    }

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