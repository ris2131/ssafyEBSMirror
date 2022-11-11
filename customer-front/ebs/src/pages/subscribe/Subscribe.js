import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { makeSubscribe,getitemseq } from "../../store/slices/subscribeSlice";
import axios from "axios";
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

    const trypurchase=()=>{
        const params = {
            cid : "TCSUBSCRIP",
            partner_order_id : "testorderid1",
            partner_user_id : "testuserid1",
            item_name : item.hairshopName+" 구독권",
            quantity : 1,
            total_amount : item.pricingPrice,
            tax_free_amount : 0,
            approval_url : "http://localhost/pay/approved/",
            cancel_url : "http://localhost/purchasecanceled",
            fail_url : "http://localhost/purchasefailed"
        }
        dispatch(getitemseq(subseq.pricingSeq))
        .then((res)=>{console.log(res)})
        axios({
            url: "https://kapi.kakao.com/v1/payment/ready",
            method : "POST",
            headers : {
                Authorization : "KakaoAK d08fb758ac87e7487a96eb2cf1bd4b5e",
                "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
            },
            params,
        }).then((res)=>{console.log(res);
            //window.location.assign(res.data.next_redirect_pc_url)
        })
        

    }

    const move = () =>{
        navigate('/hairshop-info', {state:{...data}});
    };

    // 구독하기 누르는 순간 postSubscribe안에든 밖에든 카카오 결제가 들어가면 된다.
    return (
        <div>
            <div>상품번호{item.pricingSeq}번을 {item.pricingPrice}원에 구독하시겠습니까?</div>
            <MyButton onClick={trypurchase}>구독하기</MyButton>
            <MyButton onClick={move}>취소</MyButton>
        </div>
    )
}
export default Subscribe;